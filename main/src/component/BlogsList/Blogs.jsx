import Data from "../Data.json";
import BlogCards from "./BlogCards";

const BlogList = () => {
    const BlogKeys = Object.keys(Data.blogs);
    return(
      <div className="blogList">
          <h3>My Recent Blogs</h3>
          {BlogKeys.map((keys,item)=>{
              <BlogCards item={item} Blog={Data[keys]}/>
          })}
      </div>
    );
  };

export default BlogList;