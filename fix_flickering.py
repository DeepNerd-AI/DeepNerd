import re

with open("components/ui/flickering-footer.tsx", "r") as f:
    content = f.read()

# We want to replace the drawGrid logic
old_drawGrid = """  const drawGrid = useCallback(
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

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.font = `${fontWeight} ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";
        maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
        maskCtx.restore();
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const squareWidth = squareSize * dpr;
          const squareHeight = squareSize * dpr;

          const maskData = maskCtx.getImageData(
            x,
            y,
            squareWidth,
            squareHeight,
          ).data;
          const hasText = maskData.some(
            (value, index) => index % 4 === 0 && value > 0,
          );

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
  );"""

new_drawGrid = """  const textMaskRef = useRef<boolean[]>([]);
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
  );"""

if old_drawGrid in content:
    content = content.replace(old_drawGrid, new_drawGrid)
    with open("components/ui/flickering-footer.tsx", "w") as f:
        f.write(content)
    print("Fixed flickering grid performance!")
else:
    print("Could not find old draw grid.")
