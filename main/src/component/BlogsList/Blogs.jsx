import { useEffect, useState } from "react";
import { m } from "framer-motion";
import CreateBlogPosts from "./BlogCards";
import { socials } from "../../data";
import { fadeUp, stagger, viewportOnce } from "../../motion";

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
    return (
      <div className="w-[90%] ml-[10%] pb-[4%] max-[780px]:w-[85%] max-[780px]:ml-[15%]">
        <p className="opacity-60">
          Couldn&apos;t load posts right now.{" "}
          <a href={`https://dev.to/${socials.devto}`} target="_blank" rel="noreferrer" className="text-btn">
            Read them on dev.to
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] ml-[10%] pb-[4%] max-[780px]:w-[85%] max-[780px]:pt-[10%] max-[780px]:pb-[15%] max-[780px]:mt-0 max-[780px]:mr-0 max-[780px]:mb-0 max-[780px]:ml-[15%]">
      <m.h3
        className="section-title mb-10 max-[680px]:mb-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        My Recent Blogs
      </m.h3>
      {posts[0] && (
        <div className="w-[86%] max-w-[1100px] max-[780px]:w-full">
          <CreateBlogPosts posts={posts[0]} featured />
          {posts.length > 1 && (
            <m.ul
              className="m-0 mt-12 list-none border-t border-white/10 p-0 divide-y divide-white/10 max-[680px]:mt-8"
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {posts.slice(1, 8).map((post) => (
                <CreateBlogPosts key={post.id} posts={post} />
              ))}
            </m.ul>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
