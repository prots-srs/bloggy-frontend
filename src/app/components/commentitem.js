"use client"

import Image from "next/image";
import CommentForm from "@components/commentform";

export default function CommentItem({ comment, storyId, csrf, activeCommentId, setActiveCommentId }) {
  let kids = null;
  if (comment.kids.length > 0) {
    kids = comment.kids.map((element, index) => (
      <div key={element.id}>
        <CommentItem comment={element} storyId={storyId} csrf={csrf}
          activeCommentId={activeCommentId} setActiveCommentId={setActiveCommentId} />
      </div>
    ));
  }

  const randomNum = Math.floor(Math.random() * 3) + 1;

  return (
    <>
      {/* <Image
        src={`/images/face_${randomNum}.jpg`}
        width={60}
        height={60}
        className="mr-3 mt-1 rounded-circle"
        style={{ width: "60px" }}
        alt={comment.name}
      /> */}
      <div className="media-body ms-4">
        <h4>{comment.name} <small><i>{comment.date}</i></small></h4>
        <p>{comment.message}</p>
        <button className="btn btn-sm btn-light" onClick={() =>
          setActiveCommentId(
            activeCommentId === comment.id ? null : comment.id
          )
        }>Reply</button>
        {
          activeCommentId === comment.id && (
            <CommentForm storyId={storyId} parentId={comment.id} csrf={csrf} />
          )
        }
        {kids}
      </div>
    </>
  );
}