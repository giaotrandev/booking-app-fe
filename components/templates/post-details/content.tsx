import { Typography } from '#/components/ui/typography';
import DOMPurify from 'dompurify';

interface ContentProps {
  content?: string;
}

const Content = ({ content = '' }: ContentProps) => {
  // 🔒 Chỉ sanitize ở client-side (DOMPurify cần DOM API)
  const safeContent =
    typeof window !== 'undefined'
      ? DOMPurify.sanitize(content || '')
      : content || ''; // Server-side: trả về raw content (sẽ được sanitize ở client)

  return (
    <Typography
      dangerouslySetInnerHTML={{
        __html: safeContent,
      }}
    />
  );
};

export { Content };
