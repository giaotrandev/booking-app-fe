import Image from 'next/image';
import Loading from './loading';

interface LoadingPageProps {}

const LoadingPage = () => {
  return (
    <div>
      <div className="relative pt-[calc((485/605)*100%)]">
        <Image src="/images/loading.gif" className="object-cover" fill alt="" />
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
