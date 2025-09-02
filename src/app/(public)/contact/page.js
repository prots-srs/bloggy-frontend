// import Image from 'next/image';
import getRequest from '@lib/data';
import { Suspense } from "react";
import Loading from "../loading";
import ContactsView from '@/app/components/contactsview';

const pageData = await getRequest("contacts");

export async function generateMetadata() {
  return {
    title: pageData?.title,
    description: pageData?.description,
  };
}

export default async function Contact() {
  if (pageData) {
    return (
      <Suspense fallback={<Loading />}>
        <ContactsView data={pageData} />
      </Suspense>
    );
  }
}
