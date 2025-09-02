"use client"

import CommentForm from "./commentform";
import CommentItem from "./commentitem";

import { useState } from "react";

export default function CommentList({ storyId, csrf, commentList }) {

  const [activeCommentId, setActiveCommentId] = useState(null);

  let list = commentList.map((element, index) => (
    <div className="media mt-4" key={element.id}>
      <CommentItem comment={element} storyId={storyId} csrf={csrf}
        activeCommentId={activeCommentId} setActiveCommentId={setActiveCommentId} />
    </div>
  ));

  return (
    <>
      <div className="col-12 py-4">
        <h3 className="mb-4 font-weight-bold">{commentList.length} Comments</h3>
      </div>
      <div className="col-12">
        {list}
        <CommentForm storyId={storyId} parentId="0" csrf={csrf} />
      </div>
    </>
  );

}