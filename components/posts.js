// import { useOptimistic } from "react";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/action/post";

function Post({ post }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <h2>{post.id}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={togglePostLikeStatus.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  // const [optimisticPost, updateOptimisticPost] = useOptimistic(
  //   posts,
  //   (prevPosts, updatePostsId) => {
  //     const updatedPostIndex = prevPosts.findIndex(
  //       (post) => post.id === updatePostsId
  //     );

  //     if (updatedPostIndex === -1) {
  //       return prevPosts;
  //     }
  //   }
  // );
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
