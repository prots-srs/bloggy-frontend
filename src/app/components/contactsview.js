export default function ContactsView({ data }) {

  if (data == null) {
    return (
      <div className="row px-3 pb-2">
      </div>
    );
  }

  return (
    <div className="row px-3 pb-2">
      <div className="col-sm-4 text-center mb-3">
        <i className="fa fa-2x fa-map-marker-alt mb-3 text-primary"></i>
        <h4 className="font-weight-bold">Address</h4>
        <p>{data.ADDRESS}</p>
      </div>
      <div className="col-sm-4 text-center mb-3">
        <i className="fa fa-2x fa-phone-alt mb-3 text-primary"></i>
        <h4 className="font-weight-bold">Phone</h4>
        <p>{data.PHONE}</p>
      </div>
      <div className="col-sm-4 text-center mb-3">
        <i className="far fa-2x fa-envelope mb-3 text-primary"></i>
        <h4 className="font-weight-bold">Email</h4>
        <p>{data.EMAIL}</p>
      </div>
    </div>
  );
}