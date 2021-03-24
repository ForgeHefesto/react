import { Postcard } from "../PostCard";
import './style.css'

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (
      <Postcard
        key={post.id}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
);
