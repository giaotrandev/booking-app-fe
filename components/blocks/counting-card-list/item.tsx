'use client';

import { Typography } from '#/components/ui/typography';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface CountingCardItemProps {
  title: string;
  description: string;
}

const CountingCardItem = ({ title, description }: CountingCardItemProps) => {
  const [number, setNumber] = useState<number | null>(null);
  const [suffix, setSuffix] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.4 });

  useEffect(() => {
    // Tách phần số và phần ký tự (ví dụ: "500K+" -> number=500, suffix="K+")
    const match = title.match(/^([\d.]+)(.*)$/);
    if (match) {
      setNumber(parseFloat(match[1]));
      setSuffix(match[2]);
    }
  }, [title]);

  useEffect(() => {
    if (!!isIntersecting === true) {
      setIsVisible(true);
    }
  }, [isIntersecting]);
  return (
    <div ref={ref} className="flex flex-col gap-y-1 text-center">
      <div className="is-countup-number">
        <Typography asChild variant="h1" className="font-bold">
          {isVisible ? (
            number !== null ? (
              <h2>
                <CountUp
                  end={number}
                  duration={2.5}
                  separator=","
                  decimals={number % 1 !== 0 ? 1 : 0}
                />
                {suffix}
              </h2>
            ) : (
              <h2>{title}</h2>
            )
          ) : (
            <span className="invisible">0</span>
          )}
        </Typography>
        <Typography asChild className="text-pj-gray-light">
          <p>{description}</p>
        </Typography>
      </div>
    </div>
  );
};

export { CountingCardItem };
