import StoryAnonceCard from '@components/storyanoncecard';
import getRequest from '@lib/data';
import { Suspense } from "react";
import Loading from "./loading";

const pageData = await getRequest("blog-home");

export async function generateMetadata() {
  return {
    title: pageData?.title,
    description: pageData?.description,
  };
}

export default async function Home() {
  if (pageData) {
    return (
      <Suspense fallback={<Loading />}>
        {pageData.list?.map((item) => (
          <StoryAnonceCard key={item.id} item={item} urlPage="/blog" />
        ))}
      </Suspense>
    );
  }
}