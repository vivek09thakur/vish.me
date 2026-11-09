import { useEffect, useState } from "react";
import { m } from "framer-motion";
import CreateBlogPosts from "./BlogCards";
import { socials } from "../../data";
import { fadeUp, viewportOnce } from "../../motion";

const BlogList = () => {
  const apiUrl = `https://dev.to/api/articles?username=${socials.devto}`;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
    <div className="w-[90%] ml-[10%] pb-[4%] max-[780px]:w-[85%] max-[780px]:pt-[10%] max-[780px]:pb-[15%] max-[780px]:mt-0 max-[780px]:mr-0 max-[780px]:mb-0 max-[780px]:ml-[15%]">
      <m.h3
        className="text-[2rem] font-medium mb-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        My Recent Blogs
      </m.h3>
      <div className="flex flex-col gap-4">
        {posts.slice(0, 10).map((post) => (
          <CreateBlogPosts key={post.id} posts={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
