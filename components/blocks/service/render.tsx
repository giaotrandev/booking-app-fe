import Stroke from '#/components/common/stroke';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';

const ServiceRenderBlock = () => {
  return (
    <section>
      <Container>
        <div className="flex items-center space-x-3">
          <h2>
            <Typography asChild variant="title" className="uppercase">
              <span className="text-pj-red">EXCLUSIVE </span>
            </Typography>
            <Typography asChild variant="title" className="uppercase">
              <span>SERVICES</span>
            </Typography>
          </h2>
          <Stroke className="w-51" />
        </div>
      </Container>
    </section>
  );
};

export default ServiceRenderBlock;
