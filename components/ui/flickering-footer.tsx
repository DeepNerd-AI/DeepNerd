"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Terminal } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return Color.formatRGBA(Color.parse(computedColor));
    }

    return Color.formatRGBA(Color.parse(cssColor));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export const focusInput = [
  "focus:ring-2",
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  "focus:border-blue-500 focus:dark:border-blue-700",
];

export const focusRing = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  "outline-blue-500 dark:outline-blue-500",
];

export const hasErrorInput = [
  "ring-2",
  "border-red-500 dark:border-red-700",
  "ring-red-200 dark:ring-red-700/30",
];

export const Icons = {
  logo: ({ className }: { className?: string }) => (
    <Terminal className={cn("size-6 text-white", className)} />
  ),
  soc2: ({ className }: { className?: string }) => null,
  soc2Dark: ({ className }: { className?: string }) => null,
  hipaa: ({ className }: { className?: string }) => null,
  hipaaDark: ({ className }: { className?: string }) => null,
  gdpr: ({ className }: { className?: string }) => null,
  gdprDark: ({ className }: { className?: string }) => null,
};

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    return getRGBA(color);
  }, [color]);

  const textMaskRef = useRef<boolean[]>([]);
  const maskCacheKey = useRef<string>('');

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      const currentCacheKey = `${width}-${height}-${cols}-${rows}-${text}-${fontSize}-${fontWeight}-${dpr}`;
      if (maskCacheKey.current !== currentCacheKey) {
        maskCacheKey.current = currentCacheKey;
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
        if (maskCtx && text) {
          maskCtx.scale(dpr, dpr);
          maskCtx.fillStyle = "white";
          maskCtx.font = `${fontWeight} ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          maskCtx.textAlign = "center";
          maskCtx.textBaseline = "middle";
          maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
          
          textMaskRef.current = new Array(cols * rows).fill(false);
          // Get the whole canvas image data once
          const maskData = maskCtx.getImageData(0, 0, width, height).data;
          
          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const x = Math.floor(i * (squareSize + gridGap) * dpr);
              const y = Math.floor(j * (squareSize + gridGap) * dpr);
              const endX = Math.min(x + Math.floor(squareSize * dpr), width);
              const endY = Math.min(y + Math.floor(squareSize * dpr), height);
              
              let hasText = false;
              for(let py = y; py < endY && !hasText; py++) {
                for(let px = x; px < endX && !hasText; px++) {
                  const idx = (py * width + px) * 4;
                  if (maskData[idx] > 0) hasText = true;
                }
              }
              textMaskRef.current[i * rows + j] = hasText;
            }
          }
        } else {
            textMaskRef.current = new Array(cols * rows).fill(false);
        }
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const squareWidth = squareSize * dpr;
          const squareHeight = squareSize * dpr;

          const hasText = textMaskRef.current[i * rows + j];
          const opacity = squares[i * rows + j];
          const finalOpacity = hasText
            ? Math.min(1, opacity * 3 + 0.4)
            : opacity;

          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(x, y, squareWidth, squareHeight);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      const result = window.matchMedia(query);
      setValue(result.matches);
    }

    checkQuery();

    window.addEventListener("resize", checkQuery);

    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", checkQuery);

    return () => {
      window.removeEventListener("resize", checkQuery);
      mediaQuery.removeEventListener("change", checkQuery);
    };
  }, [query]);

  return value;
}

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  hero: {
    description: "DeepNerd is an enterprise-grade AI orchestrator. Streamline your workflows, deploy intelligent agents effortlessly, and scale seamlessly.",
  },
  footerLinks: [
    {
      title: "Platform",
      links: [
        { id: 1, title: "Vault Vault IDE", url: "/docs" },
        { id: 2, title: "Muac Agent", url: "/docs" },
        { id: 3, title: "API Reference", url: "/docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { id: 5, title: "About Us", url: "/about" },
        { id: 6, title: "Privacy Policy", url: "/privacy" },
        { id: 7, title: "Terms of Service", url: "/terms" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: 9, title: "GitHub", url: "https://github.com/DeepNerd-AI" },
        { id: 10, title: "X / Twitter", url: "https://twitter.com" },
        { id: 11, title: "Blog", url: "/docs" },
      ],
    },
  ],
};

export const DeepNerdFooter = () => {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full pb-0 bg-black pt-12 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between px-6 md:px-12 max-w-[1440px] mx-auto gap-12">
        <div className="flex flex-col items-start justify-start gap-y-5 max-w-sm">
          <Link href="/" className="flex items-center gap-2 group">
            <Icons.logo className="size-6 transition-transform group-hover:scale-110" />
            <p className="text-xl font-bold tracking-widest uppercase text-white font-mono">DeepNerd</p>
          </Link>
          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            {siteConfig.hero.description}
          </p>
        </div>
        <div className="md:w-1/2 flex flex-wrap md:flex-nowrap gap-12 md:gap-24">
          {siteConfig.footerLinks.map((column, columnIndex) => (
            <ul key={columnIndex} className="flex flex-col gap-y-3 min-w-[120px]">
              <li className="mb-1 text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                {column.title}
              </li>
              {column.links.map((link) => (
                <li
                  key={link.id}
                  className="group inline-flex cursor-pointer items-center justify-start gap-1 text-sm font-sans text-zinc-400 hover:text-white transition-colors"
                >
                  <Link href={link.url}>{link.title}</Link>
                  <div className="flex size-4 items-center justify-center opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                    <ChevronRightIcon className="size-3" />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="w-full h-48 md:h-64 relative mt-16 md:mt-24 z-0 border-t border-zinc-900 border-dashed">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 from-20%" />
        <div className="absolute inset-0 cursor-default">
          <FlickeringGrid
            text={tablet ? "DEEPNERD" : "BUILD WITH DEEPNERD"}
            fontSize={tablet ? 50 : 90}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 4}
            color="#3f3f46"
            maxOpacity={0.25}
            flickerChance={0.08}
          />
        </div>
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 max-w-[1440px] mx-auto text-xs font-mono text-zinc-600 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} DEEPNERD INFRASTRUCTURE</p>
            <p className="hidden md:block">ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
};
