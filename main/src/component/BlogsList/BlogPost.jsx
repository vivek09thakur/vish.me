import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { m } from "framer-motion";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import useFetch from "../../hooks/useFetch";
import StatusText from "../ui/StatusText";
import { fadeUp, stagger } from "../../motion";

const BackLink = () => (
  <Link
    to="/"
    className="inline-flex items-center gap-2 text-sm no-underline opacity-60 hover:opacity-100 transition-opacity"
  >
    <FiArrowLeft /> Back
  </Link>
);

const Centered = ({ children }) => <div className="max-w-3xl mx-auto px-5 py-24 text-center">{children}</div>;
Centered.propTypes = { children: PropTypes.node.isRequired };

const BlogPost = () => {
  const { id } = useParams();
  const { data: post, status } = useFetch(`https://dev.to/api/articles/${id}`);

  useDocumentMeta({
    title: post ? `${post.title} | Vivek Thakur` : undefined,
    description: post?.description,
    path: `/blog/${id}`,
    image: post?.cover_image || post?.social_image,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (status === "error") {
    return (
      <Centered>
        <StatusText className="mb-6 opacity-80">Could not load this article.</StatusText>
        <BackLink />
      </Centered>
    );
  }

  if (!post) {
    return (
      <Centered>
        <StatusText className="opacity-70">Loading article…</StatusText>
      </Centered>
    );
  }

  return (
    <m.div
      className="max-w-3xl mx-auto px-5 py-14 max-[680px]:py-10"
      variants={stagger(0.08)}
      initial="hidden"
      animate="show"
    >
      <m.div variants={fadeUp}>
        <BackLink />
      </m.div>

      <m.h1 className="mt-8 text-4xl font-archivo leading-tight max-[680px]:text-3xl" variants={fadeUp}>
        {post.title}
      </m.h1>

      <m.p className="mt-4 text-sm opacity-50" variants={fadeUp}>
        {post.readable_publish_date} · {post.reading_time_minutes} min read
      </m.p>

      {post.cover_image && (
        <m.img
          src={post.cover_image}
          alt=""
          width="1000"
          height="420"
          decoding="async"
          fetchpriority="high"
          className="w-full h-auto rounded-xl mt-8"
          variants={fadeUp}
        />
      )}

      <m.article
        className="blog-content mt-10"
        variants={fadeUp}
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />

      <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
        <BackLink />
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-btn no-underline hover:underline"
        >
          Read on dev.to <FiExternalLink />
        </a>
      </div>
    </m.div>
  );
};

export default BlogPost;
