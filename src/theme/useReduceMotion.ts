import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/** true si el usuario pidió reducir el movimiento (iOS, Android y web vía prefers-reduced-motion). */
export function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => alive && setReduce(v));
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce);
    return () => {
      alive = false;
      sub.remove();
    };
  }, []);
  return reduce;
}
