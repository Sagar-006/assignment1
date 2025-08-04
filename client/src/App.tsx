import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import ProtectedRoute from "./components/protectedRoute";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import UserPosts from "./pages/UserPosts";
import ProtectedRoute from "./components/protectedRoute";




function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id/posts" element={<Login />} />
        <Route path="/user/:id" element={<ProtectedRoute><UserPosts/></ProtectedRoute>} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App
