import { useEffect, useState } from "react";
import CreateBlogPosts from "./BlogCards";
import Data from "../Data.json";
import "./Style/style.css";

const BlogList = () => {
  const username = Data.socials.dev;
  const apiUrl = `https://dev.to/api/articles?username=${username}`;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error fetching data from dev.to", error);
        setError("Error fetching data from dev.to");
      }
    };

    fetchBlogs();
  }, [apiUrl]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="blogList">
      <h3>My Recent Blogs</h3>
      {posts.slice(0, 10).map((post) => (
        <CreateBlogPosts key={post.id} posts={post} />
      ))}
    </div>
  );
};

export default BlogList;
