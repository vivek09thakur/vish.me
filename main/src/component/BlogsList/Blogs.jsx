import Data from "../Data.json";
import BlogCards from "./BlogCards";
import "./Style/style.css";

const BlogList = () => {
  const BlogKeys = Object.keys(Data.blogs);
  return (
    <div className="blogList">
      <h3>My Recent Blogs</h3>
      {BlogKeys.map((key, item) => (
        <BlogCards key={item} Blog={Data.blogs[key]} />
      ))}
    </div>
  );
};

export default BlogList;