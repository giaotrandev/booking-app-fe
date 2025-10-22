'use client';
import { useTranslate } from '#/i18n/client';
import Image from 'next/image';
import { MilestoneItem } from './item';
import { blurDataUrl } from '#/lib/constant';
import { useState, useEffect, useRef } from 'react';
import { cn } from '#/lib/utilities/cn';

interface MilestoneListProps {}

const MilestoneList = ({}: MilestoneListProps) => {
  const { translate } = useTranslate();
  const [activeItem, setActiveItem] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const milstones = [
    {
      year: '2009',
      title: translate({ vi: 'Khởi Đầu', en: 'The Beginning' }),
      description: translate({
        vi: 'Thành lập với 5 xe đầu tiên',
        en: 'Founded with the first 5 vehicles',
      }),
      image: '/images/hero.webp',
    },
    {
      year: '2014',
      title: translate({ vi: 'Mở Rộng', en: 'Expansion' }),
      description: translate({
        vi: 'Phủ sóng 20 tỉnh thành',
        en: 'Expanded operations to 20 provinces',
      }),
      image: '/images/placeholder.jpg',
    },
    {
      year: '2018',
      title: translate({ vi: 'Đột Phá', en: 'Breakthrough' }),
      description: translate({
        vi: 'Ra mắt ứng dụng đặt vé online',
        en: 'Launched the online ticket booking app',
      }),
      image: '/images/hero.webp',
    },
    {
      year: '2024',
      title: translate({ vi: 'Hiện Tại', en: 'Present' }),
      description: translate({
        vi: 'Dẫn đầu thị trường vận tải hành khách',
        en: 'Leading the passenger transport market',
      }),
      image: '/images/hero.webp',
    },
  ];

  // ✅ Auto-run logic
  useEffect(() => {
    startAutoPlay();

    // cleanup
    return () => stopAutoPlay();
  }, []);

  // Hàm bắt đầu chạy tự động
  const startAutoPlay = () => {
    stopAutoPlay(); // đảm bảo không có interval cũ
    intervalRef.current = setInterval(() => {
      setActiveItem(prev => (prev + 1) % milstones.length);
    }, 4000);
  };

  // Hàm dừng
  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Khi user click item
  const handleItemClick = (index: number) => {
    setActiveItem(index);
    startAutoPlay();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-12">
      <div className="flex flex-col gap-y-12">
        {milstones.map((item, index) => (
          <MilestoneItem
            key={index}
            {...item}
            isActive={index <= activeItem}
            onClick={() => handleItemClick(index)}
            isLast={index === milstones.length - 1}
          />
        ))}
      </div>

      <div className="relative w-full flex-1">
        {milstones.map((item, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              index === activeItem ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Image
              src={item.image}
              alt={translate({
                vi: `Hình ảnh cột mốc năm ${item.year} - ${item.title}`,
                en: `Milestone image ${item.year} - ${item.title}`,
              })}
              fill
              className="rounded-2xl object-cover"
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { MilestoneList };
