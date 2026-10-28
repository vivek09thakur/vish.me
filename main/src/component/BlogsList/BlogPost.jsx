import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import useDocumentMeta from "../../useDocumentMeta";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useDocumentMeta({
    title: post ? `${post.title} | Vivek Thakur` : undefined,
    description: post?.description,
    path: `/blog/${id}`,
    image: post?.cover_image || post?.social_image,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    fetch(`https://dev.to/api/articles/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setPost)
      .catch((err) => {
        if (err.name !== "AbortError") setError("Could not load this article.");
      });
    return () => controller.abort();
  }, [id]);

  const BackLink = () => (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm no-underline opacity-60 hover:opacity-100 transition-opacity"
    >
      <FiArrowLeft /> Back
    </Link>
  );

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <p className="mb-6 opacity-80">{error}</p>
        <BackLink />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center opacity-70">
        Loading article…
      </div>
    );
  }

  const DevToLink = () => (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-btn no-underline hover:underline"
    >
      Read on dev.to <FiExternalLink />
    </a>
  );

  return (
    <div className="max-w-3xl mx-auto px-5 py-14 max-[680px]:py-10">
      <BackLink />

      <h1 className="mt-8 text-4xl font-archivo leading-tight max-[680px]:text-3xl">
        {post.title}
      </h1>

      <p className="mt-4 text-sm opacity-50">
        {post.readable_publish_date} · {post.reading_time_minutes} min read
      </p>

      {post.cover_image && (
        <img
          src={post.cover_image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full rounded-xl mt-8"
        />
      )}

      <article
        className="blog-content mt-10"
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />

      <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
        <BackLink />
        <DevToLink />
      </div>
    </div>
  );
};

export default BlogPost;
