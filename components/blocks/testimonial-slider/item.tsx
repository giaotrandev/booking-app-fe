import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { ImageProps } from '#/types/global';
import Image from 'next/image';

interface TestimonialSliderItemProps {
  image?: ImageProps;
  name?: string;
  position?: string;
  description?: string;
}

const TestimonialSliderItem = ({
  image,
  name,
  position,
  description,
}: TestimonialSliderItemProps) => {
  return (
    <div className="flex w-full justify-between">
      <div className="hidden lg:block lg:w-[32%]">
        {image && image.src && (
          <div className="relative pt-[calc((474/384)*100%)]">
            <Image
              src={image.src}
              fill
              alt={image.alt ?? ''}
              sizes="26.667vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {(description || name || position) && (
        <div className="flex w-full flex-col gap-y-12 lg:w-[55.833%] lg:gap-y-13.75">
          <div className="flex flex-col gap-y-6">
            <Image
              src="/images/icons/icon-quote.svg"
              alt="quote-icon"
              width={55}
              height={48}
              className="h-12 w-13.75 lg:h-20 lg:w-23"
            />
            {description && (
              <Typography
                asChild
                className="text-pj-grey-light w-full font-normal italic lg:max-w-147"
                variant="label"
              >
                <p>{description}</p>
              </Typography>
            )}
            {(image || name || position) && (
              <div className="flex items-center gap-x-4 lg:gap-x-0">
                {image && image.src && (
                  <div className="w-full max-w-16 lg:hidden">
                    <div className="relative overflow-hidden pt-[100%]">
                      <Image
                        src={image.src}
                        fill
                        alt={image.alt ?? ''}
                        sizes="26.667vw"
                        className="rounded-[50%] object-cover"
                      />
                    </div>
                  </div>
                )}
                {(name || position) && (
                  <div className="flex flex-col">
                    {name && (
                      <Typography asChild variant="h3">
                        <p>{name}</p>
                      </Typography>
                    )}
                    {position && (
                      <Typography asChild>
                        <p className="text-pj-orange-medium font-medium uppercase">
                          {position}
                        </p>
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="bg-pj-grey-lightest h-[1.5px] w-full" />
        </div>
      )}
    </div>
  );
};

export { TestimonialSliderItem };
