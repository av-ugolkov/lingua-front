import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

export default function Transition({
  show,
  duration,
  children,
}: {
  show: boolean;
  duration: number;
  children: React.ReactNode;
}) {
  const [className, setClassName] = useState('hidden');

  useEffect(() => {
    if (show) {
      setClassName('visible opacity-0 scale-0');
      const timeout = setTimeout(() => {
        setClassName(
          `visible transition opacity-100 scale-100 duration-${duration}`
        );
      }, 10);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setClassName(`transition opacity-0 scale-0 duration-${duration}`);
      const timeout = setTimeout(() => {
        setClassName('hidden');
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [show, duration]);

  return <div className={clsx(className)}>{children}</div>;
}
