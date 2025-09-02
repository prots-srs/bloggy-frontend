// import Image from 'next/image';
import getRequest from '@lib/data';
import { Suspense } from "react";
import Loading from "../loading";
import AboutView from '@components/aboutview';

const pageData = await getRequest("about");

export async function generateMetadata() {
  return {
    title: pageData?.title,
    description: pageData?.description,
  };
}

export default async function About() {
  if (pageData) {
    return (
      <div className="row px-3 pb-5">
        <Suspense fallback={<Loading />}>
          <AboutView item={pageData} />
        </Suspense>
      </div>
    );
  }
}
