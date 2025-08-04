import { useEffect, useState } from "react";
import UserProfileCard from "../components/UserProfileCard";
import axios from "axios";
import Loading from "../components/Loading";

interface UserProfile {
  avatarUrl?: string;
  username: string;
  email: string;
  bio?: string;
}
function Profile() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [profile,setProfile] = useState<UserProfile| null>(null)
    const token = localStorage.getItem("token");
    if(!token) return ;
    const getData = async () => {
        const res:any = await axios.get(`${backend_url}/profile`, {
          headers: {
            Authorization : `Bearer ${token}`
          },
        });
        setProfile(res.data.user);
        
    }
    

    useEffect(() => {
        getData()
    },[])

    if (!profile) return (
      <div className="flex justify-center items-center mt-6 h-full w-full">
        <Loading/>
      </div>
    );

  return (
    <div className="p-8 flex justify-center">
      <UserProfileCard
        avatarUrl={profile.avatarUrl}
        username={profile.username}
        email={profile.email}
        bio={profile.bio}
      />
    </div>
  );
}

export default Profile;