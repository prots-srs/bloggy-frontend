
export default async function getRequest(code, searchParams) {

  const apiUrl = await getUrl(code);
  if (apiUrl == null || !("href" in apiUrl)) {
    return null;
  }

  let url = apiUrl["href"];

  if ("templated" in apiUrl) {
    url = getSearchPartUrl(url, searchParams);
  }

  // console.log("url: ", url);
  try {
    const res = await fetch(url, {
      cache: 'no-store'
      // next: { revalidate: 10 }
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

/**
 * get API url
 * @param {*} code 
 * @returns 
 */
export async function getUrl(code) {
  try {
    const res = await fetch(process.env.API_BASE_URL, {
      cache: 'no-store'
      // credentials: "include"
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return ("_links" in data && code in data["_links"]) ? data["_links"][code] : null;
  } catch (err) {
    return null;
  }
}

/**
 * 
 * @param {*} requestUrl 
 * @param {*} searchParams 
 * @returns 
 */
function getSearchPartUrl(requestUrl, searchParams) {

  let url = requestUrl;

  if (searchParams) {

    // first
    if ('code' in searchParams) {
      url = url.replace("{code}", searchParams.code);
    }

    if ('storyId' in searchParams) {
      url = url.replace("{storyId}", searchParams.storyId);
    }

    // second
    // delete {}
    url = url.replace(/\{.*?\}/g, (_, key) => '');

    if ('page' in searchParams) {

      const page = Number(searchParams.page ?? '1');
      const safePage = isNaN(page) ? 1 : page;

      if (safePage > 1) {
        url += (url.includes("?") ? "&" : "?") + "page=" + safePage;
      }
    }

    if ('tag' in searchParams) {
      const tag = searchParams.tag ?? '';
      if (tag.length > 0) {
        url += (url.includes("?") ? "&" : "?") + "tag=" + tag;
      }
    }

  } else {
    // delete {} in template
    url = url.replace(/\{.*?\}/g, (_, key) => '');
  }

  // delete double slashes
  url = url.replace(/([^:]\/)\/+/g, '$1');

  return url;
}