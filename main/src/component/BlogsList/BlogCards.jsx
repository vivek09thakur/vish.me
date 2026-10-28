import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const CreateBlogPosts = ({ posts }) => {
  const href = `/blog/${posts.id}`;
  return (
    <motion.article
      className="group w-[80%] py-6 border-b border-white/10 max-[780px]:w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="text-xs opacity-50 mb-2">
        {formatDate(posts.published_at)} · {posts.reading_time_minutes} min read
        {posts.public_reactions_count > 0 &&
          ` · ${posts.public_reactions_count} ${posts.public_reactions_count === 1 ? "reaction" : "reactions"}`}
      </p>

      <h2 className="text-[1.15rem] font-medium leading-snug m-0 max-[780px]:text-base">
        <Link to={href} className="no-underline text-font1 group-hover:text-green1 transition-colors">
          {posts.title}
        </Link>
      </h2>

      <p className="text-sm opacity-70 mt-2 max-w-2xl leading-relaxed">{posts.description}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
        <Link
          to={href}
          className="inline-flex items-center gap-1 text-sm text-btn no-underline hover:text-green1 transition-colors"
        >
          Read more <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        {posts.tag_list.length > 0 && (
          <span className="text-xs opacity-40">{posts.tag_list.map((t) => `#${t}`).join("  ")}</span>
        )}
      </div>
    </motion.article>
  );
};

CreateBlogPosts.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default CreateBlogPosts;
