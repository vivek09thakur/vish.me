import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import defaultImage from "../../assets/profile.webp";

const CreateBlogPosts = ({ posts }) => {
  return (
    <motion.div
      className="w-[70%] mt-[2.7%] p-2 rounded-[.2rem] bg-dark1 border border-white/10 transition-[background-color,box-shadow] duration-300 ease-in-out hover:shadow-card hover:bg-card max-[780px]:w-[90%] max-[780px]:mt-[5%]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className="w-full flex justify-self-start items-center">
        <img
          src={posts.user.profile_image || defaultImage}
          alt={`${posts.user.name}`}
          loading="lazy"
          decoding="async"
          className="w-[35px] rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <p className="text-[.7rem] ml-[5px]">{posts.user.name}</p>
      </div>
      <h2 className="text-font1 text-[1rem] font-normal mt-[3px] max-[780px]:text-[80%] max-[780px]:font-medium max-[780px]:mt-[2%]">
        {posts.title}
      </h2>
      <div>
        <p className="text-font1 font-normal text-[small] max-[780px]:text-[65%] max-[780px]:my-[2%]">
          <span style={{ opacity: ".8" }}>{posts.description}</span>
          <Link
            to={`/blog/${posts.id}`}
            className="text-btn no-underline text-[.8rem] font-medium hover:underline"
            style={{ marginLeft: "1%" }}
          >
            Read More{" "}
            <FiArrowRight style={{ position: "relative", bottom: "-2px" }} />
          </Link>
        </p>
      </div>

      <div style={{ marginTop: "1%" }}>
        <p className="text-font1 font-normal text-[small]" style={{ opacity: ".5" }}>
          <FaHashtag
            style={{
              position: "relative",
              bottom: "-2px",
              marginRight: "5px",
            }}
          />
          {posts.tag_list.join(", ")}
        </p>

        <p
          id="reactions"
          className="text-font1 font-normal text-[small]"
          style={{ marginTop: "1%" }}
        >
          <IoMdHeartEmpty
            style={{
              position: "relative",
              bottom: "-1px",
              marginRight: "5px",
            }}
          />
          {posts.public_reactions_count}
          <FaRegComments
            style={{
              position: "relative",
              bottom: "-2px",
              marginLeft: "7px",
              marginRight: "5px",
            }}
          />
          {posts.comments_count}
          <CiTimer
            style={{
              position: "relative",
              bottom: "-2px",
              marginLeft: "7px",
              marginRight: "3px",
            }}
          />
          {posts.reading_time_minutes}{" "}
          <span style={{ fontSize: "80%" }}>mins read</span>
        </p>
      </div>
    </motion.div>
  );
};

CreateBlogPosts.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default CreateBlogPosts;
