import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const {login,setLogin} = useAuth();

    const logOut = () => {
      setLogin(false);
      localStorage.clear();
      delete axios.defaults.headers.common["token"];
      toast.success("Logout successfully!");
      navigate("/login");
    };
  return (
    <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3 shadow-md bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2" onClick={() => navigate("/")}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn"
          className="w-8 h-8"
        />
      </div>

      <div className="flex items-center gap-8 text-gray-700">
        <Link to="/" className="flex items-center gap-1 hover:text-black">
          <FaHome size={18} />
          <span>Home</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {login ? (
          <div onClick={() => logOut()}>
            <Link
              to="/login"
              className="px-4 py-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="/signup"
              className="px-4 py-1 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Signup
            </Link>
          </div>
        )}
        <div onClick={() => navigate("/profile")}>
          <img
            src="https://i.pinimg.com/1200x/31/48/3a/31483ae532b39d1dfd135a9bcce45616.jpg"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
