"use client"

import messages from '@lib/messages';
import Form from 'next/form'
import putFeedback from '@lib/actionfeedback'
import { useActionState } from "react";

export default function FeedbackForm({ formConfig, csrf }) {

  const initialState = {
    success: false,
    name: {
      value: "",
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
    subject: {
      value: "",
      error: ""
    },
    message: {
      value: "",
      error: ""
    }
  };

  const [state, formAction, isPending] = useActionState(putFeedback, initialState);

  if (!formConfig && !csrf) {
    return (<></>);
  }

  // if ("_embedded" in formConfig && "formTemplateForResponse" in formConfig._embedded) {
  // console.log("a", formConfig._embedded.formTemplateForResponse.properties);
  // }

  let generalError = null;
  if ("general" in state) {
    generalError = <div className="alert alert-danger">
      {state.general}
    </div>;
  }

  let successState = null;
  if ("success" in state && state.success == true) {
    successState = <div className="alert alert-success">
      Thank you for leaving your feedback.
    </div>;
  }

  return (
    <div className="col-md-12 pb-5">
      <div className="contact-form">
        <Form action={formAction} id="feedback">
          <input type="hidden" name={csrf.parameterName} defaultValue={csrf.token} />
          {generalError}
          {successState}
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${state?.name?.error ? "is-invalid" : ""}`}
              defaultValue={state?.name?.value}
              placeholder="Your Name"
              required
            />
            <div className="invalid-feedback">
              {state?.name?.error}
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${state?.email?.error ? "is-invalid" : ""}`}
              defaultValue={state?.email?.value}
              placeholder="Your Email"
            />
            <div className="invalid-feedback">
              {state?.email?.error}
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="subject"
              name="subject"
              className={`form-control ${state?.subject?.error ? "is-invalid" : ""}`}
              defaultValue={state?.subject?.value}
              placeholder="Subject"
              required
            />
            <div className="invalid-feedback">
              {state?.subject?.error}
            </div>
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              className={`form-control ${state?.message?.error ? "is-invalid" : ""}`}
              defaultValue={state?.message?.value}
              placeholder="Message"
              rows={8}
              required
            />
            <div className="invalid-feedback">
              {state?.message?.error}
            </div>
          </div>

          <div className="form-group mt-3">
            <button
              disabled={isPending}
              className="btn btn-primary"
            >
              {isPending ? "Submitting..." : "Send Message"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
