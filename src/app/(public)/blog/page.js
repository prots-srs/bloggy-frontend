import StoryAnonceCard from '@components/storyanoncecard';
import Pagination from '@components/pagination';
import getRequest from '@lib/data';
import { Suspense } from 'react';
import Loading from '../loading';

export async function generateMetadata() {
  const data = await getRequest("blog-list", {});

  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function Blog({ searchParams }) {
  const search = await searchParams;
  const data = await getRequest("blog-list", search);

  const pageUrl = "/blog";

  let url = pageUrl;
  if (search && "tag" in search) {
    url += "?tag=" + search.tag;
  }

  if (data) {
    return (
      <Suspense fallback={<Loading />}>
        {data.list?.map((item) => (
          <StoryAnonceCard key={item.id} item={item} urlPage={pageUrl} />
        ))}
        {data.pagination?.show && <Pagination url={url} pagin={data.pagination} />}
      </Suspense>
    );
  }
}
