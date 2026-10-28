import { useEffect } from "react";

const SITE = "https://vishme.vercel.app";

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) return;
  el.setAttribute(attr, value);
};

// Swap document title/description/canonical for a route and restore the defaults on unmount
const useDocumentMeta = ({ title, description, path, image }) => {
  useEffect(() => {
    if (!title) return;
    const prev = {
      title: document.title,
      desc: document.head.querySelector('meta[name="description"]')?.content,
      canonical: document.head.querySelector('link[rel="canonical"]')?.href,
      ogTitle: document.head.querySelector('meta[property="og:title"]')?.content,
      ogDesc: document.head.querySelector('meta[property="og:description"]')?.content,
      ogUrl: document.head.querySelector('meta[property="og:url"]')?.content,
      ogImage: document.head.querySelector('meta[property="og:image"]')?.content,
    };
    const url = `${SITE}${path || window.location.pathname}`;

    document.title = title;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    if (image) {
      setMeta('meta[property="og:image"]', "content", image);
      setMeta('meta[name="twitter:image"]', "content", image);
    }

    return () => {
      document.title = prev.title;
      if (prev.desc) {
        setMeta('meta[name="description"]', "content", prev.desc);
        setMeta('meta[property="og:description"]', "content", prev.ogDesc);
        setMeta('meta[name="twitter:description"]', "content", prev.ogDesc);
      }
      setMeta('link[rel="canonical"]', "href", prev.canonical);
      setMeta('meta[property="og:url"]', "content", prev.ogUrl);
      setMeta('meta[property="og:title"]', "content", prev.ogTitle);
      setMeta('meta[name="twitter:title"]', "content", prev.ogTitle);
      setMeta('meta[property="og:image"]', "content", prev.ogImage);
      setMeta('meta[name="twitter:image"]', "content", prev.ogImage);
    };
  }, [title, description, path, image]);
};

export default useDocumentMeta;
