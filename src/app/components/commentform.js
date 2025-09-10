"use client"

import messages from '@lib/messages';
import Form from 'next/form'
import putComment from '@lib/actioncomment'
import { useActionState } from "react";

export default function CommentForm({ storyId, parentId, csrf }) {

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
    message: {
      value: "",
      error: ""
    }
  };
  const [state, formAction, isPending] = useActionState(putComment, initialState);

  let generalError = null;
  if ("general" in state) {
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
            className={`form-control ${state?.name?.error ? "is-invalid" : ""}`}
            defaultValue={state?.name?.value}
            required
          />
          <div className="invalid-feedback">
            {state?.name?.error}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${state?.email?.error ? "is-invalid" : ""}`}
            defaultValue={state?.email?.value}

          />
          <div className="invalid-feedback">
            {state?.email?.error}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            className={`form-control ${state?.message?.error ? "is-invalid" : ""}`}
            defaultValue={state?.message?.value}

            rows={5}
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
            {isPending ? "Submitting..." : "Leave Comment"}
          </button>
        </div>
      </Form>
    </>
  );
}
