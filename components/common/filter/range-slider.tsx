'use client';

import { Input } from '#/components/ui/input';
import { Typography } from '#/components/ui/typography';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useDebounce } from '#/lib/hooks/use-debounce';

export interface RangeSliderProps {
  initialMin?: number;
  initialMax?: number;
  titleFrom?: string;
  titleTo?: string;
  min?: number;
  max?: number;
  step?: number;
  priceGap?: number;
  formatValue?: (val: number) => string;
  parseValue?: (val: string) => number;
  rangeSliderOnChange?: (min: number, max: number) => void;
}

const RangeSlider = ({
  initialMin = 0,
  initialMax = 100,
  min = 0,
  max = 100,
  step = 1,
  priceGap = 1,
  titleFrom,
  titleTo,
  formatValue = val => val.toString(),
  parseValue = str => Number(str),
  rangeSliderOnChange,
}: RangeSliderProps) => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);

  const [minInput, setMinInput] = useState<string>(formatValue(initialMin));
  const [maxInput, setMaxInput] = useState<string>(formatValue(initialMax));

  const debouncedMinInput = useDebounce(minInput, 1000);
  const debouncedMaxInput = useDebounce(maxInput, 1000);

  useEffect(() => {
    const raw = parseValue(debouncedMinInput);
    if (!isNaN(raw)) {
      let val = Math.max(raw, min); // không âm
      const maxLimit = priceGap ? maxValue - priceGap : maxValue - 1;
      val = Math.min(val, maxLimit); // không vượt quá max - gap

      // Không cho bằng max
      if (val >= maxValue) val = maxValue - 1;

      setMinValue(val);
      setMinInput(formatValue(val));
    }
  }, [debouncedMinInput]);

  useEffect(() => {
    const raw = parseValue(debouncedMaxInput);
    if (!isNaN(raw)) {
      let val = Math.min(raw, max); // không vượt quá giới hạn
      const minLimit = priceGap ? minValue + priceGap : minValue + 1;
      val = Math.max(val, minLimit); // không nhỏ hơn min + gap

      // Không cho bằng min
      if (val <= minValue) val = minValue + 1;

      setMaxValue(val);
      setMaxInput(formatValue(val));
    }
  }, [debouncedMaxInput]);

  useEffect(() => {
    const range = max - min;
    const minPercent = ((minValue - min) / range) * 100;
    const maxPercent = ((max - maxValue) / range) * 100;

    if (progressRef.current) {
      progressRef.current.style.left = `${minPercent}%`;
      progressRef.current.style.right = `${maxPercent}%`;
    }

    rangeSliderOnChange?.(minValue, maxValue);
  }, [minValue, maxValue, min, max]);

  const handleSliderMin = (e: ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (!isNaN(val)) {
      val = Math.max(val, min);
      val = Math.min(val, maxValue - priceGap);
      setMinValue(val);
      setMinInput(formatValue(val));
    }
  };

  const handleSliderMax = (e: ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (!isNaN(val)) {
      val = Math.max(val, minValue + priceGap);
      val = Math.min(val, max);
      setMaxValue(val);
      setMaxInput(formatValue(val));
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Text Inputs */}
      <div className="flex items-end justify-between gap-x-2">
        <div className="flex flex-col gap-y-1">
          <Typography asChild variant="small-label">
            <label>{titleFrom}</label>
          </Typography>
          <Input
            type="text"
            value={minInput}
            onChange={e => setMinInput(e.target.value)}
            className="h-6 lg:h-6"
          />
        </div>
        <div className="mb-3 h-0.5 w-3 bg-black" />
        <div className="flex flex-col gap-y-1">
          <Typography asChild variant="small-label">
            <label>{titleTo}</label>
          </Typography>
          <Input
            type="text"
            value={maxInput}
            onChange={e => setMaxInput(e.target.value)}
            className="h-6 lg:h-6"
          />
        </div>
      </div>

      {/* Slider UI */}
      <div className="mb-4 w-full">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress bg-pj-red absolute h-1 rounded"
            ref={progressRef}
          ></div>
        </div>
        <div className="range-input relative w-full">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={handleSliderMin}
            className="range-min pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={handleSliderMax}
            className="range-max pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
