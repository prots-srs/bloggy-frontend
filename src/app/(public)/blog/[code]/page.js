import getRequest from '@lib/data';
import messages from '@lib/messages';
import StoryView from '@components/storyview';
import CommentList from '@components/commentslist';
import { Suspense } from 'react';
import Loading from '../../loading';

export async function generateMetadata({ params }) {
  const { code } = await params;
  const data = await getRequest("blog-detail", { "code": code });

  return {
    title: data?.title,
    description: data?.description,
  };
}

export default async function viewStory({ params }) {
  const { code } = await params;
  const data = await getRequest("blog-detail", { "code": code });

  const [answer, csrf] = await Promise.all([
    getRequest("comment-list", { "storyId": data.id }),
    getRequest("csrf")
  ]);

  let commentList = null;
  if (answer && answer != null && "list" in answer) {
    commentList =
      <CommentList storyId={data.id} commentList={answer.list} csrf={csrf} />;
  }

  if (data) {

    return (
      <div className="container py-5 px-2 bg-white">
        <div className="row px-4">
          <Suspense fallback={<Loading />}>
            <StoryView item={data} />
          </Suspense>
        </div>
        <div className="row px-4">
          <Suspense fallback={<Loading />}>
            {commentList}
          </Suspense>
        </div>
      </div>
    );
  }
}