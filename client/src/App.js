import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/User/Login";
import Home from "./components/pages/Home/Home";
import Explore from "./components/pages/Explore/Explore";
import BlogDetails from "./components/pages/Blog/BlogDetails";
import Profile from "./components/pages/User/Profile";
import UserDetails from "./components/pages/User/UserDetails";
import CreateBlog from "./components/pages/Blog/CreateBlog";
import EditProfile from "./components/pages/User/EditProfile";
import Chats from "./components/pages/Chat/Chats";
import ChatRoom from "./components/pages/Chat/ChatRoom";
import { io } from "socket.io-client";
import {
  ProtectedRoute,
  AdminRoute,
} from "./components/routes/ProtectedRoute.js";
import SignUp from "./components/pages/User/SignUp";
import ForgotPassword from "./components/pages/User/ForgotPassword";
import About from "./components/pages/About/About";
import NotFound from "./components/layout/NotFound/NotFound";
import Dashboard from "./components/pages/Dashboard/Dashboard";

function App() {
  const socket = io("https://blog-gram-server.onrender.com");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password/reset" element={<ForgotPassword />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/explore"
          element={<ProtectedRoute element={<Explore />} />}
        />
        <Route
          path="/b/:slug"
          element={<ProtectedRoute element={<BlogDetails />} />}
        />
        <Route
          path="/create-blog"
          element={<ProtectedRoute element={<CreateBlog />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/profile/edit"
          element={<ProtectedRoute element={<EditProfile />} />}
        />
        <Route
          path="/:name"
          element={<ProtectedRoute element={<UserDetails socket={socket} />} />}
        />
        <Route
          path="/direct/inbox/"
          element={<ProtectedRoute element={<Chats socket={socket} />} />}
        />
        <Route
          path="/direct/t/:roomId"
          element={<ProtectedRoute element={<ChatRoom socket={socket} />} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={<AdminRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<ProtectedRoute element={<NotFound />} />} />
      </Routes>
    </Router>
  );
}

export default App;
