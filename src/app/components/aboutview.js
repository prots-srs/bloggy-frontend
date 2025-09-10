import sanitizeHtml from 'sanitize-html';

export default function AboutView({ item }) {
  let pic;
  if (item.picture) {
    // pic = <Image
    //   className="img-fluid float-left w-50 mr-4 mb-3"
    //   src={data.picture}
    //   width={500}
    //   height={500}
    //   alt={data.h1}
    // />
    pic =
      <img className="img-fluid float-left w-50 mr-4 mb-3" src={item.picture} alt={item.name} />

  }

  const safeDetail = sanitizeHtml(item.detail);
  return (
    <>
      <div className="col-md-12">
        <h2 className="mb-4 font-weight-bold">{item.name}</h2>
        {pic}
        <div className="m-0" dangerouslySetInnerHTML={{ __html: safeDetail }}></div>
      </div>
      <div className="col-md-12 pt-4">
        {/* <div className="d-flex flex-column skills">
          <div className="progress w-100 mb-4">
            <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">Adaptability</div>
          </div>
          <div className="progress w-100 mb-4">
            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">Research</div>
          </div>
          <div className="progress w-100">
            <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Editing</div>
          </div>
        </div> */}
      </div>
    </>
  );
}