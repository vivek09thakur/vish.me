import PropTypes from "prop-types";
import { IoIosLink } from "react-icons/io";

const BlogCards = ({ Blog }) => {
  return (
    <div className="blogCard">
      <a href={Blog.link} target="_blank" rel="noopener noreferrer">
        <h5 className="blogTitle">
         <IoIosLink style={{position:"relative",top:"3px",marginRight:"2%"}}/> 
           {Blog.title}
        </h5>
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
