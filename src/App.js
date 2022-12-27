import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogServices from "./services/blogs";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [notifications, setNotifications] = useState("");
  const [blogValues, setBlogValues] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    if (user) {
      blogServices.getAll().then((returnedBlogs) => {
        setBlogs(returnedBlogs);
      });
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  console.log(blogs);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login(loginValues);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogServices.setToken(user.token);
      setUser(user);
      setLoginValues({
        username: "",
        password: "",
      });
      setNotifications(`${user.name} logged in`);
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    } catch (exception) {
      setNotifications("Wrong username/password");
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    const name = JSON.parse(window.localStorage.loggedUser).name;
    setNotifications(`${name} logging out...`);
    setTimeout(() => {
      setNotifications(null);
      window.location.reload();
    }, 2000);
    window.localStorage.removeItem("loggedUser");
  };

  const handleLoginValues = (event) => {
    setLoginValues({
      ...loginValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlogValues = (event) => {
    setBlogValues({
      ...blogValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = blogValues;

    const newBlogPost = await blogServices.create(newBlog);
    setBlogs(blogs.concat(newBlogPost));
    setNotifications(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setBlogValues({
      title: "",
      author: "",
      url: "",
    });
    setTimeout(() => {
      setNotifications(null);
    }, 5000);
  };

  const logoutStyles = {
    margin: "10px 0",
  };

  return (
    <div className="App">
      {user === null ? (
        <>
          <h1>log in to application</h1>
          <div>{notifications}</div>
          <Login
            handleLogin={handleLogin}
            loginValues={loginValues}
            handleLoginValues={handleLoginValues}
          />
        </>
      ) : (
        <>
          <h1>blogs</h1>
          <div>{notifications}</div>
          <button style={logoutStyles} onClick={() => handleLogout()}>
            Logout
          </button>
          <BlogForm
            handleAddBlog={handleAddBlog}
            blogValues={blogValues}
            handleBlogValues={handleBlogValues}
          />
          <Blogs setNotifications={setNotifications} blogs={blogs} />
        </>
      )}
    </div>
  );
}

export default App;
