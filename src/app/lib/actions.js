'use server'

import { getUrl } from "./data";

export async function putComment(prevState, formData) {

  try {
    const url = await getUrl("comment-put");

    // console.log("url2: ", url);
    const res = await fetch(url.href,
      // `${process.env.API_BASE_URL}comments`,
      {
        method: "POST",
        body: formData
      });
    // console.log("res", res);

    const response = await res.json();

    if (!res.ok) {
      return response;
    }

    // console.log("ok", response);

    return { success: true, errors: {} };
  } catch (err) {
    return {
      errors: {
        general: "Network error"
      },
      values: {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      }
    };
  }
}