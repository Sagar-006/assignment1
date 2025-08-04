import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import CreatePost from "../components/CreatePost";

interface Post {
  _id: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
    bio?: string;
    avatarUrl?: string;
  };
}

interface FeedResponse {
  posts: Post[];
}

const Home = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const { loading, setLoading,login } = useAuth();

  const getAllPosts = async () => {
    try {
        setLoading(true)
      const response = await axios.get<FeedResponse>(
        `${backend_url}/post/feed`
      );
      setPosts(response.data.posts || []);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  

  return (
    <div>
        <div>
            {
                login ? (<CreatePost onPostSuccess={getAllPosts}/>) : (null)
            }
        </div>
      {loading ? (
        <Loading />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            name={post.author.username}
            username={post.author.username}
            avatarUrl={post.author.avatarUrl || "/default-avatar.png"}
            content={post.content}
            date={new Date(post.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          />
        ))
      )}
    </div>
  );
};

export default Home;
