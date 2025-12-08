"use client";

import { useEffect, useState } from "react";

interface UseLineAnimationProps {
  duration?: number; // アニメーション時間（ミリ秒）
  delay?: number; // 開始遅延（ミリ秒）
}

export function useLineAnimation({ duration = 2000, delay = 300 }: UseLineAnimationProps = {}) {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 遅延後にアニメーション開始
    const delayTimer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isAnimating) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);

      setProgress(newProgress);

      if (newProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating, duration]);

  return { progress };
}
