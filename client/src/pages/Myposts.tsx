import axios from "axios"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Myposts = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

    const getData = async() => {
        const {id} = useParams();
        console.log(id)
        const res = await axios.get(
          `${backend_url}/post/${id}`
        );
        console.log(res)
    }
    useEffect(() => {
        getData();
    },[])
  return (
    <div>
      hi from posts
    </div>
  )
}

export default Myposts
