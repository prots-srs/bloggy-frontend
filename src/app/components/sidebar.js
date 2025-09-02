import getRequest from '../lib/data';
import Image from 'next/image';
import messages from '../lib/messages';


// function sleep(ms) {
// return new Promise(resolve => setTimeout(resolve, ms));
// }

export default async function Sidebar() {
  const data = await getRequest("informer-hello", null);

  if (data == null) {
    return "";
  }

  // await sleep(10000);

  let pic = null;
  if (data?.picture) {
    pic =
      <Image className="mx-auto d-block w-75 bg-primary img-fluid rounded-circle mb-4 p-3"
        src={data.picture}
        width={100}
        height={100}
        alt={data.name} />
  }

  return (
    <>
      <div className="sidebar-text d-flex flex-column h-100 justify-content-center text-center">
        {pic}
        <h1 className="font-weight-bold">{data.name}</h1>
        <p className="mb-4">{data.description}</p>
        <div className="d-flex justify-content-center mb-5">
          {Object.entries(data.socials).map(([key, url]) => (
            <a key={key} href={url} className="btn btn-outline-primary mr-2">
              <i className={'fab fa-' + key}></i>
            </a>
          ))}
        </div>
        <a href="" className="btn btn-lg btn-block btn-primary mt-auto">{messages.sidebar.button}</a>
      </div>
      <div className="sidebar-icon d-flex flex-column h-100 justify-content-center text-right">
        <i className="fas fa-2x fa-angle-double-right text-primary"></i>
      </div>
    </>
  );
}