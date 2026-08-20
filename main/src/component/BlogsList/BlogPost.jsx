import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { CiTimer } from "react-icons/ci";
import defaultImage from "../../assets/profile.webp";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

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
      className="inline-flex items-center gap-2 text-sm no-underline text-font1 opacity-80 hover:opacity-100 hover:text-btn transition-colors"
    >
      <FiArrowLeft /> Back to portfolio
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

  const DevToButton = () => (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full bg-btn px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-lg shadow-btn/30 ring-1 ring-white/15 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-btn/40 transition-all duration-300"
    >
      Read on dev.to
      <FiExternalLink className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );

  return (
    <div className="max-w-3xl mx-auto px-5 py-14 max-[680px]:py-10">
      <BackLink />

      <h1 className="mt-8 text-4xl font-archivo leading-tight max-[680px]:text-3xl">
        {post.title}
      </h1>

      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <img
          src={post.user?.profile_image || defaultImage}
          alt={post.user?.name || "author"}
          loading="lazy"
          decoding="async"
          className="w-9 h-9 rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <span className="text-sm">{post.user?.name}</span>
        <span className="opacity-40">•</span>
        <span className="text-sm opacity-60">{post.readable_publish_date}</span>
        <span className="opacity-40">•</span>
        <span className="text-sm opacity-60 inline-flex items-center gap-1">
          <CiTimer /> {post.reading_time_minutes} min read
        </span>
      </div>

      <div className="mt-6">
        <DevToButton />
      </div>

      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full rounded-xl mt-8 border border-white/10"
        />
      )}

      <article
        className="blog-content mt-10"
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />

      <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
        <BackLink />
        <DevToButton />
      </div>
    </div>
  );
};

export default BlogPost;
