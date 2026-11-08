import PropTypes from "prop-types";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, pop, viewportOnce } from "../../motion";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const CreateBlogPosts = ({ posts }) => {
  const href = `/blog/${posts.id}`;
  const thumb = posts.cover_image || posts.social_image;
  const reactions = posts.public_reactions_count;
  return (
    <m.article
      className="group w-[80%] max-[780px]:w-full"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      whileHover={{ y: -4, transition: pop }}
    >
      <Link
        to={href}
        className="flex gap-5 items-stretch rounded-xl border border-white/10 bg-card/30 p-3 no-underline text-font1 hover:border-white/20 hover:bg-card/50 transition-colors duration-300 max-[500px]:flex-col max-[500px]:gap-3"
      >
        <div className="shrink-0 w-44 rounded-lg overflow-hidden bg-dark1 max-[780px]:w-32 max-[500px]:w-full max-[500px]:aspect-video">
          {thumb && (
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex flex-col min-w-0 py-1 flex-1">
          <p className="text-xs opacity-50 m-0">
            {formatDate(posts.published_at)} · {posts.reading_time_minutes} min read
            {reactions > 0 && ` · ${reactions} ${reactions === 1 ? "reaction" : "reactions"}`}
          </p>

          <h2 className="text-[1.05rem] font-medium leading-snug mt-1.5 m-0 group-hover:text-green1 transition-colors max-[780px]:text-base">
            {posts.title}
          </h2>

          <p className="text-sm opacity-65 mt-1.5 m-0 leading-relaxed line-clamp-2">{posts.description}</p>

          <div className="flex items-center justify-between gap-3 mt-auto pt-3">
            {posts.tag_list.length > 0 && (
              <p className="text-xs text-[#5b8def] m-0 flex flex-wrap gap-x-2.5 truncate">
                {posts.tag_list.slice(0, 4).map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </p>
            )}
            <FiArrowUpRight className="shrink-0 text-lg opacity-50 group-hover:opacity-100 group-hover:text-green1 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-[opacity,color,transform] duration-300 ease-bounce" />
          </div>
        </div>
      </Link>
    </m.article>
  );
};

CreateBlogPosts.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default CreateBlogPosts;
