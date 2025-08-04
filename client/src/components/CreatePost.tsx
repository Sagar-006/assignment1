import  { useState } from "react";
import axios from "axios";

const CreatePost = ({onPostSuccess}:any) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${backend_url}/post/create`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created:", response.data);
      setContent("");
      onPostSuccess(); 
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  return (
    <div className="mx-auto flex  bg-white my-2 rounded-lg p-4 w-full max-w-xl shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-xl">👤</span>
        </div>

        {/* Input + Post button */}
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Start a post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 w-[360px] py-2 focus:outline-blue-500 bg-gray-100 text-sm"
          />
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
