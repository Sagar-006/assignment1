import React from "react";

interface PostCardProps {
  name?: string;
  username: string;
  avatarUrl?: string;
  content: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({
  name,
  username,
  // avatarUrl,
  content,
  date,
}) => {
  return (
    <div className="bg-white dark:bg-[#15202B] border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-full max-w-xl mx-auto shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-3">
        <img
          src="https://i.pinimg.com/1200x/31/48/3a/31483ae532b39d1dfd135a9bcce45616.jpg"
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {name}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{username}
            </span>
            <span className="text-sm text-gray-400">· {date}</span>
          </div>
          <p className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default PostCard;
