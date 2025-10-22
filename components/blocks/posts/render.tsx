'use client';
import Filters, { OptionType } from '#/components/common/filter/filter-buttons';
import { Container } from '#/components/ui/container';
import { usePathname, useRouter } from '#/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { BlockWrapper } from '../wrapper';
import { PostList, PostListProps } from './list';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Loading from '#/components/common/loading';
import { useTranslate } from '#/i18n/client';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Typography } from '#/components/ui/typography';

interface PostsRenderBlockProps {
  list?: PostListProps['list'];
  categoryList?: OptionType[];
}

// ✅ Hàm chuẩn hóa text: xóa dấu, đưa về lowercase
const normalizeText = (text: string) =>
  text
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();

const PostsRenderBlock = ({
  list = [],
  categoryList = [],
}: PostsRenderBlockProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { translate } = useTranslate();
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Lấy giá trị từ URL
  const initialCategories = useMemo(() => {
    const param = searchParams.get('categories');
    return param ? param.split(',') : ['all'];
  }, [searchParams]);

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);

  // ✅ Pagination
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  // ✅ Search
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(normalizeText(searchTerm)); // normalize luôn tại đây
      setPage(1); // reset về page 1 khi search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ✅ Khi đổi filter category
  const handleFilterChange = useCallback(
    (selectedValues: string[]) => {
      setSelectedCategories(selectedValues);
      setPage(1);

      const params = new URLSearchParams(searchParams);
      if (selectedValues.length > 0 && !selectedValues.includes('all')) {
        params.set('categories', selectedValues.join(','));
      } else {
        params.delete('categories');
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // ✅ Khi URL thay đổi
  useEffect(() => {
    const param = searchParams.get('categories');
    const parsed = param ? param.split(',') : ['all'];
    setSelectedCategories(parsed);
    setPage(1);
  }, [searchParams]);

  // ✅ Lọc theo category
  const filteredByCategory = useMemo(() => {
    if (!(Array.isArray(list) && list.length > 0)) return [];
    if (selectedCategories.includes('all')) return list;

    return list.filter(post => {
      return (
        post.category?.slug && selectedCategories.includes(post.category.slug)
      );
    });
  }, [list, selectedCategories]);

  // ✅ Lọc theo search title (bỏ dấu, lowercase)
  const filteredBySearch = useMemo(() => {
    if (!debouncedSearch) return filteredByCategory;

    return filteredByCategory.filter(post => {
      const title = normalizeText(post.title || '');
      return title.includes(debouncedSearch);
    });
  }, [filteredByCategory, debouncedSearch]);

  // ✅ Phân trang trên client
  const paginatedPosts = useMemo(() => {
    const start = 0;
    const end = page * limit;
    return filteredBySearch.slice(start, end);
  }, [filteredBySearch, page, limit]);

  const hasNextPage = filteredBySearch.length > paginatedPosts.length;

  return (
    <BlockWrapper ref={containerRef}>
      <Container>
        {Array.isArray(categoryList) && categoryList.length > 0 && (
          <div className="mb-8 flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-x-10">
            <div className="w-full md:w-1/2">
              <Input
                id="search-post"
                name="search-post"
                placeholder="Search posts..."
                className="w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex w-full items-center justify-end md:w-[30%]">
              <Filters
                options={categoryList}
                onChange={handleFilterChange}
                isMultiple
                defaultValues={selectedCategories}
                containerRef={containerRef}
              />
            </div>
          </div>
        )}

        {!list?.length ? (
          <Loading
            content={translate({
              vi: 'Đang tải những bài viết...',
              en: 'Loading posts...',
            })}
          />
        ) : (
          <>
            {paginatedPosts.length > 0 ? (
              <PostList list={paginatedPosts} />
            ) : (
              <Typography asChild variant="h6">
                <p className="mt-4 text-center text-gray-500">
                  {translate({
                    vi: 'Không có bài viết nào.',
                    en: 'No posts found.',
                  })}
                </p>
              </Typography>
            )}
          </>
        )}

        {hasNextPage && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setPage(p => p + 1)}
              text={translate({
                vi: 'Xem thêm bài viết',
                en: 'Load more posts',
              })}
            />
          </div>
        )}
      </Container>
    </BlockWrapper>
  );
};

export { PostsRenderBlock };
