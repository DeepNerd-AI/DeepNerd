"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  texts: string[];
  delay?: number;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
}

export function Typewriter({
  texts,
  delay = 500,
  speed = 50,
  deleteSpeed = 30,
  pauseDuration = 1500,
  className,
  onComplete,
  loop = false,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        if (currentTextIndex === texts.length - 1) {
          if (loop) {
            setCurrentTextIndex(0);
          } else {
            setIsFinished(true);
            if (onComplete) onComplete();
          }
        } else {
          setCurrentTextIndex((prev) => prev + 1);
        }
      }
    } else {
      const targetText = texts[currentTextIndex];
      if (currentText.length < targetText.length) {
        timeout = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, speed);
      } else {
        if (currentTextIndex === texts.length - 1 && !loop) {
          if (onComplete) {
            timeout = setTimeout(() => {
              setIsFinished(true);
              onComplete();
            }, pauseDuration);
          } else {
            setIsFinished(true);
          }
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseDuration, isFinished, loop, onComplete]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{currentText}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="w-[2px] h-[1.2em] bg-white ml-1 inline-block -translate-y-[-2px]"
      />
    </span>
  );
}
