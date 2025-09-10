import messages from '@lib/messages';
import Link from 'next/link';

export default function Pagination({ url, pagin }) {

  const { pagination } = messages;

  let nextButton = null;
  if (pagin.hasLinkNext) {
    let nextLink = url + (url.includes("?") ? "&" : "?") + "page=" + pagin.nextLink;
    nextButton = <li className="page-item">
      <Link className="page-link"
        href={nextLink}
        aria-label={pagination.next}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">{pagination.next}</span>
      </Link>
    </li>;
  }

  let prevLink = 'javascript:void(0)';
  if (pagin.hasLinkPrev) {
    if (pagin.prevLink == "#") {
      prevLink = url;
    } else {
      prevLink = url + (url.includes("?") ? "&" : "?") + "page=" + pagin.prevLink;
    }
  }

  return (
    <div className="row px-3 pb-5 pagin">
      <nav aria-label="Page navigation">
        <ul className="pagination m-0 mx-3">
          <li className={`page-item ${pagin.hasLinkPrev ? '' : 'disabled'}`}>
            <Link className="page-link"
              href={prevLink}
              aria-label={pagination.previous}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">{pagination.previous}</span>
            </Link>
          </li>
          {pagin.pages.map((page) => {
            const pageLink = page > 1 ? url + (url.includes("?") ? "&" : "?") + "page=" + page : url;
            return (
              <li className={`page-item ${page == pagin.currentPage ? ' active' : ''}`} key={page}>
                <Link className="page-link"
                  href={pageLink}
                >{page}</Link>
              </li>
            )
          })}
          {nextButton}
        </ul>
      </nav>
      <span>{pagination.total} {pagin.totalElements}</span>
    </div>
  );
}