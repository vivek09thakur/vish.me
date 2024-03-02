import PropTypes from "prop-types";
import { AiOutlineLike } from "react-icons/ai";
import { PiTagSimpleBold } from "react-icons/pi";
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
        <p style={{ opacity: "0.6" }}>
          {posts.description}
          <a
            href={posts.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
            style={{ marginLeft: "2%" }}
          >
            Read More
          </a>
        </p>
      </div>

      <div>
        <p style={{ marginTop: "2%" }}>
          <PiTagSimpleBold
            style={{
              position: "relative",
              bottom: "-2px",
              marginRight: "5px",
            }}
          />
          {posts.tag_list.join(", ")}
        </p>
        <p id="reactions">
          <AiOutlineLike
            style={{
              position: "relative",
              bottom: "-1px",
              marginRight: "5px",
            }}
          />
          {posts.public_reactions_count}
        </p>
      </div>
    </div>
  );
}

CreateBlogPosts.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default CreateBlogPosts;