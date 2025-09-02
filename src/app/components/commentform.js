"use client"

import messages from '@lib/messages';
import Form from 'next/form'
import { putComment } from '../lib/actions'
import { useActionState } from "react";

export default function CommentForm({ storyId, parentId, csrf }) {

  const initialState = {
    errors: {
      name: "",
      email: "",
      message: ""
    },
    values: {
      name: "",
      email: "",
      message: ""
    }
  }
  const [state, formAction, isPending] = useActionState(putComment, initialState);

  if (!("errors" in state)) {
    return (
      <></>
    );
  }

  let generalError = null;
  if ("general" in state.errors) {
    generalError = <div className="alert alert-danger">
      {state.errors.general}
    </div>;
  }

  let successState = null;
  if ("success" in state && state.success == true) {
    successState = <div className="alert alert-success">
      Thank you for leaving your comment. It will be published after moderation.
    </div>;
  }

  return (
    <>
      <h3 className="mt-4 mb-4 font-weight-bold">Leave a comment</h3>
      <Form action={formAction}>

        <input type="hidden" name={csrf.parameterName} defaultValue={csrf.token} />
        <input type="hidden" name="storyId" defaultValue={storyId} />
        <input type="hidden" name="parentId" defaultValue={parentId} />

        {generalError}
        {successState}

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${state?.errors?.name ? "is-invalid" : ""}`}
            defaultValue={state?.values?.name}
            required
          />
          <div className="invalid-feedback">
            {state?.errors?.name}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className={`form-control ${state?.errors?.email ? "is-invalid" : ""}`}
            defaultValue={state?.values?.email}

          />
          <div className="invalid-feedback">
            {state?.errors?.email}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            className={`form-control ${state?.errors?.message ? "is-invalid" : ""}`}
            defaultValue={state?.values?.message}

            rows={5}
          />
          <div className="invalid-feedback">
            {state?.errors?.message}
          </div>
        </div>

        <div className="form-group mt-3">
          <button
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? "Submitting..." : "Leave Comment"}
          </button>
        </div>
      </Form>
    </>
  );
}
