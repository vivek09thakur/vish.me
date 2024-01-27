import PropTypes from "prop-types";

const BlogCards = ({ Blog }) => {
  return (
    <div className="blogCard">
        <a href={Blog.link} target="_blank" rel="noopener noreferrer">
          <h5 className="blogTitle">{Blog.title}</h5>
        </a>
    </div>
  );
};

BlogCards.propTypes = {
  Blog: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BlogCards;
