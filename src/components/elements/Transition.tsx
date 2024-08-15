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
  const [visible, setVisible] = useState('hidden');

  useEffect(() => {
    if (show) {
      setVisible('visible opacity-0 scale-0');
      const timeout = setTimeout(() => {
        setVisible(
          `visible transition opacity-100 scale-100 duration-${duration}`
        );
      }, 10);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setVisible(`transition opacity-0 scale-0 duration-${duration}`);
      const timeout = setTimeout(() => {
        setVisible('hidden');
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [show, duration]);

  return <div className={clsx('relative z-10', visible)}>{children}</div>;
}
