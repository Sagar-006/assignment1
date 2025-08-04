import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

interface Post {
  _id: string;
  content: string;
  createdAt: string;
  author: string; 
}

interface User {
  username: string;
  bio?: string;
}

interface UserPostResponse {
  user: User;
  posts: Post[];
}

const UserPosts = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const {loading,setLoading} = useAuth();

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get<UserPostResponse>(
        `${backend_url}/post/${id}`
      );
      console.log(response)
      setUser(response.data.user);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [id]);

  if (loading) return <Loading />;
  if (!user) return <p><Loading/></p>;

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="ml-20">
        <h1 className="text-2xl font-bold mb-2">Posts By: {user?.username}</h1>
        {user?.bio && (
          <p className="text-black mb-4">
            <span className="font-semibold text-black">Bio: </span>
            {user.bio}
          </p>
        )}
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            name={user.username}
            username={user.username}
            avatarUrl="/default-avatar.png"
            content={post.content}
            date={new Date(post.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          />
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default UserPosts;
