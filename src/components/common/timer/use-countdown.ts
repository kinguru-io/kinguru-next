import { useEffect, useRef, useState } from "react";

export function useCountdown({
  delay,
  callback,
}: {
  delay: number;
  callback: () => void;
}) {
  const [stamp, setStamp] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setStamp((prevStamp) => prevStamp + 1000);
    }, 1000);

    interval.current = id;

    return () => {
      clearInterval(id);
      interval.current = null;
    };
  }, []);

  useEffect(() => {
    if (stamp < delay || !interval.current) return;

    clearInterval(interval.current);
    callback();
  }, [stamp]);

  return stamp;
}
