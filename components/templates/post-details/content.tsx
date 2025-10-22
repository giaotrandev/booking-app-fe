import { Typography } from '#/components/ui/typography';
import DOMPurify from 'isomorphic-dompurify';
interface ContentProps {
  content?: string;
}

const Content = ({ content = '' }: ContentProps) => {
  // 👉 Giả lập hacker chèn script
  const testContent =
    content +
    `<script>console.log('test — nếu bạn thấy dòng này trong console, nghĩa là chưa an toàn')</script>`;

  // 🧹 Làm sạch HTML trước khi render
  const safeContent = DOMPurify.sanitize(testContent);

  return (
    <Typography
      dangerouslySetInnerHTML={{
        __html: safeContent,
      }}
    />
  );
};

export { Content };
