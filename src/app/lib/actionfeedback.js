'use server'

import { getUrl } from "@lib/data";

export default async function putFeedback(prevState, formData) {
  try {
    const url = await getUrl("feedback");

    const res = await fetch(url.href,
      {
        method: "POST",
        body: formData
      });

    const response = await res.json();

    if (!res.ok) {
      let resState = response.reduce((acc, f) => {
        acc[f.name] = { value: f.value, error: f.error };
        return acc;
      }, {});
      resState.success = false;
      return resState;
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      general: "Network error",
      name: {
        value: formData.get('name'),
        error: ""
      },
      email: {
        value: formData.get('email'),
        error: ""
      },
      subject: {
        value: formData.get('subject'),
        error: ""
      },
      message: {
        value: formData.get('message'),
        error: ""
      }
    };
  }
}