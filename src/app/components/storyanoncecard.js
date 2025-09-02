import Link from "next/link";
import messages from '../lib/messages';


export default function StoryAnonceCard({ urlPage, item }) {
  if (item == null) {
    return "";
  }

  let pic = null;
  if (item.picture) {
    pic =
      <img className="img-fluid mb-4 mb-md-0" src={item.picture} alt="Image" />
  }

  let detailLink = null;
  if ("codeUrl" in item) {
    detailLink = <Link className="btn btn-link p-0" href={urlPage + "/" + item.codeUrl}>
      {messages.etc.readmore} <i className="fa fa-angle-right"></i>
    </Link>;
  }
  return (
    <div className="row blog-item px-3 pb-5">
      <div className="col-md-5">
        {pic}
      </div>
      <div className="col-md-7">
        <h3 className="mt-md-4 px-md-3 mb-2 py-2 bg-white font-weight-bold">{item.name}</h3>
        <div className="d-flex mb-3">
          <small className="mr-2 text-muted"><i className="fa fa-calendar-alt"></i> {item.date}</small>
          <small className="mr-2 text-muted"><i className="fa fa-folder"></i>&nbsp;
            {item.tags?.map((i, index) => (
              <span key={i}>
                <Link href={urlPage + "?tag=" + i} className="text-blue-600 hover:underline">
                  {i}
                </Link>
                {index < item.tags.length - 1 && ', '}
              </span>
            )
            )}
          </small>
          <small className="mr-2 text-muted">
            <i className="fa fa-comments"></i> {item.countComments} {messages.comments.count}
          </small>
        </div>
        <p>{item.anonce}</p>
        {detailLink}
      </div>
    </div>
  );
}