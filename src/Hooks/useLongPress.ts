import { useCallback, useRef } from "react";

interface UseLongPressOptions {
  onLongPress?: () => void;
  onClick?: () => void;
  threshold?: number; // Time in ms to trigger long press
  repeatInterval?: number; // Interval for repeated calls during long press
}

interface UseLongPressReturn {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useLongPress = ({
  onLongPress,
  onClick,
  threshold = 500,
  repeatInterval = 100,
}: UseLongPressOptions = {}): UseLongPressReturn => {
  const isLongPress = useRef(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef<number>(0);

  const clearTimers = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
      repeatTimer.current = null;
    }
  }, []);

  const startLongPress = useCallback(() => {
    isLongPress.current = false;
    startTime.current = Date.now();

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress?.();

      // Start repeating the long press action
      if (onLongPress) {
        repeatTimer.current = setInterval(() => {
          onLongPress();
        }, repeatInterval);
      }
    }, threshold);
  }, [onLongPress, threshold, repeatInterval]);

  const endLongPress = useCallback(() => {
    clearTimers();

    // If it wasn't a long press and duration was short, treat it as a click
    if (!isLongPress.current && Date.now() - startTime.current < threshold) {
      onClick?.();
    }

    isLongPress.current = false;
  }, [clearTimers, onClick, threshold]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only handle left mouse button
      if (e.button === 0) {
        e.preventDefault();
        startLongPress();
      }
    },
    [startLongPress]
  );

  const handleMouseUp = useCallback(() => {
    endLongPress();
  }, [endLongPress]);

  const handleMouseLeave = useCallback(() => {
    endLongPress();
  }, [endLongPress]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      startLongPress();
    },
    [startLongPress]
  );

  const handleTouchEnd = useCallback(() => {
    endLongPress();
  }, [endLongPress]);

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};
