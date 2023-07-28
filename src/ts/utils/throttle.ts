type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

export function throttle<
  T extends (...args: any[]) => void
>(func: T, wait: number, options: ThrottleOptions = {}): T {
  let timeout: ReturnType<typeof setTimeout> | null;
  let previous = 0;

  const { leading = true, trailing = true } = options;

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    if (!previous && !leading) previous = now;
    const remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = leading ? Date.now() : 0;
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  } as T;

  return throttled;
}
