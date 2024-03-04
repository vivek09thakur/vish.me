import PropTypes from "prop-types";
import { CiTimer } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import "./Style/style.css";

const CreateBlogPosts = ({ posts }) => {
  return (
    <div className="blogCard">
      <div className="user-info">
        <img
          src={posts.user.profile_image}
          alt={`${posts.user.name} Profile Image`}
          className="profile-image"
        />
        <p>{posts.user.name}</p>
      </div>
      <h2>{posts.title}</h2>
      <div className="description">
        <p>
          <span style={{ opacity: ".8" }}>{posts.description}</span>
          <a
            href={posts.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
            style={{ marginLeft: "1%" }}
          >
            Read More <FiExternalLink style={{ position: "relative", bottom: "-2px" }} />
          </a>
        </p>
      </div>

      <div style={{ marginTop: "1%" }}>
        <p style={{ opacity: ".5" }}>
          <FaHashtag
            style={{
              position: "relative",
              bottom: "-2px",
              marginRight: "5px",
            }}
          />
          {posts.tag_list.join(", ")}
        </p>

        <p id="reactions" style={{ marginTop: "1%" }}>
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
    </div>
  );
};

CreateBlogPosts.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default CreateBlogPosts;