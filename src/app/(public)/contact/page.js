// import Image from 'next/image';
import getRequest from '@lib/data';
import { Suspense } from "react";
import Loading from "../loading";
import ContactsView from '@components/contactsview';
import FeedbackForm from '@components/feedbackform';

const pageData = await getRequest("contacts");

export async function generateMetadata() {
  return {
    title: pageData?.title,
    description: pageData?.description,
  };
}

export default async function Contact() {

  const [formConfig, csrf] = await Promise.all([
    getRequest("feedback"),
    getRequest("csrf")
  ]);

  let contactView = null;
  if (pageData) {
    contactView = (
      <Suspense fallback={<Loading />}>
        <ContactsView data={pageData} />
      </Suspense>
    );
  }

  let formView = null;
  if (formConfig && csrf) {
    formView = (
      <Suspense fallback={<Loading />}>
        <FeedbackForm formConfig={formConfig} csrf={csrf} />
      </Suspense>
    );
  }

  return (
    <>
      {contactView}
      {formView}
    </>
  );
}
