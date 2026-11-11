import { useEffect, useState } from "react";

const IDLE = { data: null, status: "loading", error: null };

const requestJson = async (url, signal) => {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
};

// Tries each URL in order and resolves with the first successful JSON body.
export const fetchFirst = async (urls, signal) => {
  let lastError;
  for (const url of urls) {
    try {
      return await requestJson(url, signal);
    } catch (err) {
      if (err.name === "AbortError") throw err;
      lastError = err;
    }
  }
  throw lastError ?? new Error("No URL provided");
};

/**
 * Fetches JSON from one URL (or the first working URL of a list), aborting on
 * unmount or when the URL changes. `select` maps the raw body to the data you
 * want to keep; it must be referentially stable (module-level or memoised).
 */
const useFetch = (urlOrUrls, select) => {
  const key = Array.isArray(urlOrUrls) ? urlOrUrls.join("\n") : urlOrUrls;
  const [state, setState] = useState(IDLE);

  useEffect(() => {
    if (!key) return undefined;
    const controller = new AbortController();
    setState(IDLE);
    fetchFirst(key.split("\n"), controller.signal)
      .then((json) => {
        const data = select ? select(json) : json;
        const empty = Array.isArray(data) ? data.length === 0 : data == null;
        setState({ data, status: empty ? "empty" : "ready", error: null });
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState({ data: null, status: "error", error });
      });
    return () => controller.abort();
  }, [key, select]);

  return state;
};

export default useFetch;
