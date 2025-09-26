import { useCallback, useMemo, useState } from 'react';

type Props<T> = {
  items: Array<T>;
  defaultItemIdx: number;
};
export default function useToggle<T>(props: Props<T>) {
  const [currentIndex, setCurrentIndex] = useState<number>(
    props.defaultItemIdx
  );
  const currentItem = useMemo(() => {
    return props.items[currentIndex];
  }, [currentIndex, props.items]);

  const toggleItem = useCallback(() => {
    return setCurrentIndex((prev) =>
      prev >= props.items.length - 1 ? 0 : prev + 1
    );
  }, [props.items.length]);

  return {
    currentItem,
    toggleItem,
  };
}
