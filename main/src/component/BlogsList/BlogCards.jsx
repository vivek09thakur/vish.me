import PropTypes from "prop-types";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp, pop, stagger, viewportOnce } from "../../motion";

const postShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  published_at: PropTypes.string.isRequired,
  reading_time_minutes: PropTypes.number,
  public_reactions_count: PropTypes.number,
  cover_image: PropTypes.string,
  social_image: PropTypes.string,
  tag_list: PropTypes.arrayOf(PropTypes.string),
});

const INKS = ["text-green1", "text-btn", "text-[#5b8def]"];
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short" });
const longDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

const dateParts = (iso) => {
  const d = new Date(iso);
  return { day: d.getDate(), month: monthFormat.format(d), year: d.getFullYear() };
};

const readTime = (mins) => `${mins} min read`;

export const FeaturedPost = ({ post }) => {
  const thumb = post.cover_image || post.social_image;
  const reactions = post.public_reactions_count;
  const tags = post.tag_list ?? [];
  return (
    <m.article
      className="group"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <Link
        to={`/blog/${post.id}`}
        className="grid items-center gap-10 no-underline text-font1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] max-[780px]:gap-8"
      >
        <m.div
          className="relative mx-auto w-full max-w-[520px] rotate-[-2deg] bg-[#eef0f5] p-3 pb-10 max-[780px]:max-w-[400px]"
          whileHover={{ rotate: 0, y: -6, transition: pop }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-green1/80 mix-blend-multiply"
            style={{ clipPath: "polygon(2% 0, 100% 4%, 98% 100%, 0 96%)" }}
          />
          <div className="aspect-[1000/420] overflow-hidden bg-card">
            {thumb && (
              <img
                src={thumb}
                alt=""
                width="1000"
                height="420"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <span className="absolute bottom-2 left-0 right-0 text-center font-hand text-[1.3rem] font-semibold text-dark1/70">
            {longDate.format(new Date(post.published_at))}
          </span>
        </m.div>

        <div className="min-w-0">
          <p className="m-0 font-hand text-[1.35rem] font-semibold text-green1">Latest entry</p>
          <h2 className="m-0 mt-2 font-archivo text-[2rem] font-normal leading-[1.1] transition-colors group-hover:text-green1 max-[780px]:text-[1.5rem]">
            {post.title}
          </h2>
          <p className="m-0 mt-4 leading-relaxed opacity-65 line-clamp-3 max-[780px]:text-sm">{post.description}</p>
          <p className="m-0 mt-5 text-sm opacity-50">
            {readTime(post.reading_time_minutes)}
            {reactions > 0 && <> &middot; {reactions} {reactions === 1 ? "reaction" : "reactions"}</>}
          </p>
          {tags.length > 0 && (
            <p className="m-0 mt-3 flex flex-wrap gap-x-3 text-xs text-[#5b8def]">
              {tags.slice(0, 4).map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </p>
          )}
          <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-green1">
            Read the post
            <FiArrowUpRight className="transition-transform duration-500 ease-bounce group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </m.article>
  );
};
FeaturedPost.propTypes = { post: postShape.isRequired };

const Entry = ({ post, ink }) => {
  const { day, month } = dateParts(post.published_at);
  return (
    <m.li className="group m-0" variants={fadeUp} whileHover={{ y: -4, transition: pop }}>
      <Link
        to={`/blog/${post.id}`}
        className="relative grid h-full box-border grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-4 rounded-md border border-white/10 bg-card/40 px-4 py-3.5 pr-12 no-underline text-font1 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green1/60 max-[680px]:grid-cols-[2.5rem_minmax(0,1fr)] max-[680px]:gap-x-3 max-[680px]:px-3.5 max-[680px]:py-3 max-[680px]:pr-10"
      >
        <FiArrowUpRight
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 text-[1.75rem] text-green1 transition-transform duration-500 ease-bounce group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-110 max-[680px]:text-2xl"
        />
        <span className="flex flex-col items-center leading-none">
          <span className="font-archivo text-[1.6rem] leading-none max-[680px]:text-[1.4rem]">{day}</span>
          <span className={`mt-1 font-hand text-[1.15rem] font-semibold ${ink}`}>{month}</span>
        </span>
        <span className="flex min-w-0 flex-col self-stretch pt-0.5">
          <h3 className="m-0 text-[1.1rem] font-medium leading-snug transition-colors group-hover:text-green1 max-[680px]:text-base">
            {post.title}
          </h3>
          <p className="m-0 mt-1.5 text-sm leading-relaxed opacity-55 line-clamp-2">{post.description}</p>
          <span className="mt-auto pt-3 text-xs opacity-50">{readTime(post.reading_time_minutes)}</span>
        </span>
      </Link>
    </m.li>
  );
};
Entry.propTypes = { post: postShape.isRequired, ink: PropTypes.string.isRequired };

const groupByYear = (posts) =>
  posts.reduce((groups, post) => {
    const { year } = dateParts(post.published_at);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.posts.push(post);
    else groups.push({ year, posts: [post] });
    return groups;
  }, []);

export const PostJournal = ({ posts }) => {
  const groups = groupByYear(posts);
  let i = 0;
  return (
    <div className="mt-20 max-[780px]:mt-14">
      {groups.map(({ year, posts: entries }) => (
        <section key={year} className="relative grid gap-x-6 md:grid-cols-[8.5rem_minmax(0,1fr)] [&+&]:mt-8 max-[780px]:[&+&]:mt-6">
          <m.h3
            className="m-0 select-none font-archivo text-[3rem] font-normal leading-none tracking-tight text-font1/15 md:sticky md:top-8 md:self-start md:text-right max-[780px]:text-[2.25rem]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {year}
          </m.h3>
          <m.ul
            className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 md:[&>li:only-child]:col-span-2 max-[780px]:mt-2"
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {entries.map((post) => (
              <Entry key={post.id} post={post} ink={INKS[i++ % INKS.length]} />
            ))}
          </m.ul>
        </section>
      ))}
    </div>
  );
};
PostJournal.propTypes = { posts: PropTypes.arrayOf(postShape).isRequired };
