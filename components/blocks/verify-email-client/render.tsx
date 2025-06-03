import { Button } from '#/components/ui/button';
import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import { cn } from '#/lib/utilities/cn';
import Image from 'next/image';

export interface VerifyEmailClientProps {
  success: boolean;
  message: string;
}
const VerifyEmailClient = async ({
  success,
  message,
}: VerifyEmailClientProps) => {
  return (
    <div className="flex max-w-192 flex-col items-center justify-center space-y-4">
      <Image
        height={180}
        width={180}
        src={success ? '/images/icons/success.png' : '/images/icons/failed.png'}
        alt="logo"
        className="h-45 w-45"
        sizes="180px"
      />
      <Typography asChild variant="h1" className={cn()}>
        <h1>{success ? 'Verified Email' : 'Something went wrong'}</h1>
      </Typography>
      <Typography asChild variant="h5" className="font-normal">
        <h2>{message}</h2>
      </Typography>
      <div className="w-full">
        <Button variant="default" text="Back to login" asChild>
          <Link href="/login" />
        </Button>
      </div>
    </div>
  );
};

export { VerifyEmailClient };
