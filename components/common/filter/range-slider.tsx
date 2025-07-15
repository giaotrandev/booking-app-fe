'use client';
import { Input } from '#/components/ui/input';
import { Typography } from '#/components/ui/typography';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
export interface RangeSliderProps {
  initialMin?: number;
  initialMax?: number;
  min?: number;
  max?: number;
  step?: number;
  priceGap?: number;
}
const RangeSlider = ({
  initialMin = 0,
  initialMax = 200000,
  min = 0,
  max = 200000,
  step = 500,
  priceGap = 500,
}: RangeSliderProps) => {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);
  const isInteger = (value: string) => {
    return /^\d*$/.test(value);
  };
  const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value + priceGap <= maxValue) {
      setMinValue(value);
    }
  };
  const handleMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minValue + priceGap) {
      setMaxValue(value);
    }
  };
  useEffect(() => {
    if (progressRef.current) {
      const range = max - min;
      const minPercent = ((minValue - min) / range) * 100;
      const maxPercent = ((max - maxValue) / range) * 100;

      progressRef.current.style.left = `${minPercent}%`;
      progressRef.current.style.right = `${maxPercent}%`;
    }
  }, [minValue, maxValue, min, max]);
  return (
    <div className="flex flex-col gap-y-8 lg:gap-y-4">
      <div className="flex items-end justify-between gap-x-2">
        <div className="rounded-xl">
          <Typography asChild variant="small-label">
            <p>Min</p>
          </Typography>
          <Input
            type="text"
            value={minValue.toString()}
            onChange={e => {
              const val = e.target.value;
              if (isInteger(val)) {
                const num = Number(val);
                if (num + priceGap <= maxValue) {
                  setMinValue(num);
                }
              }
            }}
            className="h-6 lg:h-6"
          />
        </div>
        <div className="mb-3 h-0.5 w-3 bg-black" />
        <div className=" ">
          <Typography asChild variant="small-label">
            <p>Max</p>
          </Typography>
          <Input
            type="text"
            value={maxValue.toString()}
            onChange={e => {
              const val = e.target.value;
              if (isInteger(val)) {
                const num = Number(val);
                if (num >= minValue + priceGap) {
                  setMaxValue(num);
                }
              }
            }}
            className="h-6 lg:h-6"
          />
        </div>
      </div>

      <div className="mb-4 w-full">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress bg-pj-red absolute h-1 rounded"
            ref={progressRef}
          ></div>
        </div>

        <div className="range-input relative w-full">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            className="range-min pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            className="range-max pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
