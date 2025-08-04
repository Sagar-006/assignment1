import React from "react";
import { useNavigate } from "react-router-dom";

interface UserProfileCardProps {
  avatarUrl?: string ;
  username: string;
  email: string;
  bio?:string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  avatarUrl,
  username,
  email,
  bio
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/user/${userId}`);
    } else {
      console.log("User ID not found");
    }
  };
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={
          avatarUrl ||
          "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
        }
        alt="Avatar"
      />
      <div>
        <h4 className="text-lg font-semibold text-gray-900">
          <span className="font-semibold text-black">Username: </span>
          {username}
        </h4>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-black">Email: </span>
          {email}
        </p>
        <p>
          <span className="font-semibold">Bio: </span>
          {bio}
        </p>
        <div>
          <div
          onClick={handleClick}
            //   to="/signup"
            className="px-4 w-30 text-center cursor-pointer  py-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            MyPosts
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
