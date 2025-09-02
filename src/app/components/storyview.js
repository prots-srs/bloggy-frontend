import Link from "next/link";
import sanitizeHtml from 'sanitize-html';

export default function StoryView({ item }) {
  let picture = null;
  if (item.picture) {
    picture = <img className="img-fluid mb-4" src={item.picture} alt={item.name} />;
  }

  const pageUrl = "/blog";

  // console.log(item);

  let prevStory = null;
  if (item.prevStory.length > 0) {
    prevStory =
      <Link href={pageUrl + "/" + item.prevStory} className="btn btn-outline-primary"><i className="fa fa-angle-left mr-2"></i> Previous
      </Link>;
  }
  let nextStory = null;
  if (item.nextStory.length > 0) {
    nextStory =
      <Link href={pageUrl + "/" + item.nextStory} className="btn btn-outline-primary">
        Next<i className="fa fa-angle-right ml-2"></i>
      </Link>;
  }

  const safeDetail = sanitizeHtml(item.detail);

  return (
    <>
      <div className="col-12">
        {picture}
        <h2 className="mb-3 font-weight-bold">{item.name}</h2>
        <div className="d-flex">
          <p className="mr-3 text-muted"><i className="fa fa-calendar-alt"></i> {item.date}</p>
          <p className="mr-3 text-muted"><i className="fa fa-folder"></i>&nbsp;
            {item.tags?.map((i, index) => (
              <span key={i}>
                <Link href={pageUrl + "?tag=" + i} className="text-blue-600 hover:underline">
                  {i}
                </Link>
                {index < item.tags.length - 1 && ', '}
              </span>
            )
            )}
          </p>
          <p className="mr-3 text-muted"><i className="fa fa-comments"></i> {item.countComments} Comments</p>
        </div>
        <div className="m-0" dangerouslySetInnerHTML={{ __html: safeDetail }}></div>
      </div>
      <div className="col-12 py-4">
        <div className="btn-group btn-group-lg w-100">
          {prevStory}
          {nextStory}
        </div>
      </div>
    </>
  );
}