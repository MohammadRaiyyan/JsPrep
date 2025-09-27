import { useCallback, useEffect, useState } from 'react';

type CircleCord = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  background: string;
};

function isCircleColliding(c1: CircleCord, c2: CircleCord): boolean {
  return !(
    c1.top > c2.bottom ||
    c1.right < c2.left ||
    c1.bottom < c2.top ||
    c1.left > c2.right
  );
}

function Circle({ top, left, background }: CircleCord) {
  return (
    <div
      style={{
        width: RADIUS * 2,
        height: RADIUS * 2,
        position: 'absolute',
        borderRadius: '50%',
        top,
        left,
        background,
      }}
    ></div>
  );
}

const RADIUS = 50;
export default function DetectOverlappingCircle() {
  const [circleCords, setCircleCords] = useState<Array<CircleCord>>([]);

  const createCircle = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;

    const newCircleCord: CircleCord = {
      top: clientY - RADIUS,
      left: clientX - RADIUS,
      bottom: clientY + RADIUS,
      right: clientX + RADIUS,
      background: 'red',
    };
    setCircleCords((prev) => {
      for (const circle of prev) {
        if (isCircleColliding(newCircleCord, circle)) {
          newCircleCord.background = 'green';
          break;
        }
      }
      return [...prev, newCircleCord];
    });
  }, []);

  useEffect(() => {
    document.addEventListener('click', createCircle);

    return () => {
      document.removeEventListener('click', createCircle);
    };
  }, [createCircle]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {circleCords.map((circle, i) => (
        <Circle
          {...circle}
          key={
            circle.bottom +
            circle.left +
            circle.right +
            circle.top +
            circle.background +
            i
          }
        />
      ))}
    </div>
  );
}
