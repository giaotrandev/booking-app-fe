import Image from 'next/image';
import Loading from './loading';

interface LoadingPageProps {}

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[999999] flex h-screen flex-col items-center justify-center bg-white">
      <div className="w-full max-w-100">
        <div className="relative pt-[calc((485/605)*100%)]">
          <Image
            src="/images/loading.gif"
            className="object-cover"
            fill
            alt=""
          />
        </div>
      </div>
      <Loading
        content="Loading Trips..."
        variant="h3"
        textClassName="lg:font-normal"
      />
    </div>
  );
};

export { LoadingPage };
