import PropTypes from "prop-types";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, pop, viewportOnce } from "../../motion";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const Arrow = ({ className = "" }) => (
  <FiArrowUpRight
    className={`shrink-0 transition-[opacity,color,transform] duration-500 ease-bounce group-hover:text-green1 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${className}`}
  />
);
Arrow.propTypes = { className: PropTypes.string };

const Featured = ({ post }) => {
  const thumb = post.cover_image || post.social_image;
  const reactions = post.public_reactions_count;
  return (
    <m.article
      className="group"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      whileHover={{ y: -4, transition: pop }}
    >
      <Link
        to={`/blog/${post.id}`}
        className="grid items-center gap-8 no-underline text-font1 md:grid-cols-[1.15fr_1fr] max-[780px]:gap-5"
      >
        <div className="aspect-video overflow-hidden rounded-xl bg-card">
          {thumb && (
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="m-0 text-xs opacity-50">
            Latest &middot; {formatDate(post.published_at)} &middot; {post.reading_time_minutes} min read
            {reactions > 0 && <> &middot; {reactions} {reactions === 1 ? "reaction" : "reactions"}</>}
          </p>
          <h2 className="m-0 mt-3 text-[1.75rem] font-semibold leading-tight transition-colors group-hover:text-green1 max-[780px]:text-xl">
            {post.title}
          </h2>
          <p className="m-0 mt-3 leading-relaxed opacity-65 line-clamp-3 max-[780px]:text-sm">{post.description}</p>
          {post.tag_list.length > 0 && (
            <p className="m-0 mt-4 flex flex-wrap gap-x-3 text-xs text-[#5b8def]">
              {post.tag_list.slice(0, 4).map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </p>
          )}
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-green1 max-[780px]:mt-4">
            Read the post <Arrow className="text-base" />
          </span>
        </div>
      </Link>
    </m.article>
  );
};
Featured.propTypes = { post: PropTypes.object.isRequired };

const Row = ({ post }) => (
  <m.li className="group" variants={fadeUp}>
    <Link
      to={`/blog/${post.id}`}
      className="grid grid-cols-[7.5rem_minmax(0,1fr)_auto] items-baseline gap-6 py-5 no-underline text-font1 max-[680px]:grid-cols-1 max-[680px]:gap-1.5 max-[680px]:py-4"
    >
      <span className="text-xs opacity-50">{formatDate(post.published_at)}</span>
      <span className="min-w-0">
        <h3 className="m-0 text-base font-medium leading-snug transition-colors group-hover:text-green1">{post.title}</h3>
        <p className="m-0 mt-1 text-sm opacity-55 line-clamp-1">{post.description}</p>
      </span>
      <span className="inline-flex items-center gap-2 text-xs opacity-50 max-[680px]:hidden">
        {post.reading_time_minutes} min <Arrow className="text-base" />
      </span>
    </Link>
  </m.li>
);
Row.propTypes = { post: PropTypes.object.isRequired };

const CreateBlogPosts = ({ posts, featured = false }) =>
  featured ? <Featured post={posts} /> : <Row post={posts} />;

CreateBlogPosts.propTypes = {
  posts: PropTypes.object.isRequired,
  featured: PropTypes.bool,
};

export default CreateBlogPosts;