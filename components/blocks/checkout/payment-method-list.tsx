'use client';

import { useMediaQuery } from 'usehooks-ts';
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group';
import { ImageProps, OptionType } from '#/types/global';
import { useEffect, useState } from 'react';

export interface OptionsPaymentProps extends OptionType {
  image?: ImageProps;
}

export interface PaymentMethodListProps {
  options?: OptionsPaymentProps[];
  onChange?: (selectedValue: string) => void;
}

const PaymentMethodList = ({
  options = [],
  onChange,
}: PaymentMethodListProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [hasAutoSelected, setHasAutoSelected] = useState(false);
  useEffect(() => {
    if (options.length > 0 && !selectedValue && isDesktop && !hasAutoSelected) {
      const defaultValue = options[0].value;
      setSelectedValue(defaultValue);
      setHasAutoSelected(true);
      onChange?.(defaultValue);
    }
  }, [options, isDesktop, selectedValue, hasAutoSelected]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={handleChange}
      className="gap-2 lg:gap-4"
    >
      {options.map((item, index) => (
        <div key={index}>
          <RadioGroupItem
            labelVariant="label"
            image={item.image}
            value={item.value}
            aria-label={item.label}
            label={item.label}
            description="Quick payment via QR code - scan the code using a bank app that supports VietQR to complete your transaction."
          />
        </div>
      ))}
    </RadioGroup>
  );
};

export { PaymentMethodList };
