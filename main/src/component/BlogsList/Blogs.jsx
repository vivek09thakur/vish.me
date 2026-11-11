import { FeaturedPost, PostJournal } from "./BlogCards";
import { socials, socialLinks } from "../../data";
import useFetch from "../../hooks/useFetch";
import SectionHeading from "../ui/SectionHeading";
import StatusText from "../ui/StatusText";

const POST_LIMIT = 8;
const LIST_URL = `https://dev.to/api/articles?username=${socials.devto}&per_page=${POST_LIMIT}`;

const BlogList = () => {
  const { data: posts, status } = useFetch(LIST_URL);

  if (status === "error") {
    return (
      <div className="with-rail pb-[4%]">
        <StatusText>
          Couldn&apos;t load posts right now.{" "}
          <a href={socialLinks.devto} target="_blank" rel="noreferrer" className="text-btn">
            Read them on dev.to
          </a>
        </StatusText>
      </div>
    );
  }

  const [featured, ...rest] = posts ?? [];

  return (
    <div className="with-rail pb-[4%] max-[780px]:pt-[10%] max-[780px]:pb-[15%]">
      <SectionHeading className="mb-10 max-[680px]:mb-6">My Recent Blogs</SectionHeading>
      {featured && (
        <div className="w-[86%] max-w-[1100px] max-[780px]:w-full">
          <FeaturedPost post={featured} />
          {rest.length > 0 && <PostJournal posts={rest} />}
        </div>
      )}
    </div>
  );
};

export default BlogList;
