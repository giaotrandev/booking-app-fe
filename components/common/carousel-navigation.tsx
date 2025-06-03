import { ButtonIcon } from '#/components/ui/button-icon';
import { useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';

export interface CarouselNavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  className?: string;
}

const CarouselNavigation = ({
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled,
  className,
}: CarouselNavigationProps) => {
  const { translate } = useTranslate();

  return (
    <div
      className={cn(
        'flex flex-nowrap items-center justify-end space-x-2',
        className,
      )}
    >
      <div className="inline-flex">
        <ButtonIcon
          icon={{ name: 'arrow-left' }}
          onClick={onPrevClick}
          disabled={prevDisabled}
          aria-label={'previous slide'}
        />
      </div>
      <div className="inline-flex">
        <ButtonIcon
          icon={{ name: 'arrow-right' }}
          onClick={onNextClick}
          disabled={nextDisabled}
          aria-label={'next slide'}
        />
      </div>
    </div>
  );
};

export default CarouselNavigation;
