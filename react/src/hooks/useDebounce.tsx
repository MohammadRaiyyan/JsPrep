import { useCallback, useRef } from 'react';

type DebounceFn = (this: any, args: IArguments) => void;
type Options = {
  leading: boolean;
};

export default function useDebounce(
  fn: DebounceFn,
  delay: number,
  options: Options = { leading: false }
) {
  const timerRef = useRef<number>(undefined);
  const isExecutedLeading = useRef<boolean>(false);
  const debounceFn = useCallback(
    function (this: any, ...args: any[]) {
      const context = this;
      const canExecuteLeading = options.leading && !isExecutedLeading.current;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (canExecuteLeading) {
        fn.apply(context, args as unknown as any);
        isExecutedLeading.current = true;
      }

      timerRef.current = setTimeout(() => {
        if (!options.leading || args) {
          fn.apply(context, args as unknown as any);
        }
        isExecutedLeading.current = false;
      }, delay);
    },
    [delay, fn, options]
  );

  return debounceFn;
}
