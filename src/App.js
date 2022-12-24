import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogServices from "./services/blogs";
import Login from "./components/Login";
import Blogs from "./components/Blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState("");

  useEffect(() => {
    blogServices.getAll().then((returnedBlogs) => {
      setBlogs(returnedBlogs);
    });
  }, []);

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
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
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

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const logoutStyles = {
    margin: "10px 0",
  };

  return (
    <div className="App">
      {user === null ? (
        <>
          <h1>log in to application</h1>
          <Login
            handleLogin={handleLogin}
            username={username}
            handleUsername={handleUsername}
            password={password}
            handlePassword={handlePassword}
          />
        </>
      ) : (
        <>
          <h1>blogs</h1>
          <div>{notifications}</div>
          <button style={logoutStyles} onClick={() => handleLogout()}>
            Logout
          </button>
          <Blogs setNotifications={setNotifications} blogs={blogs} />
        </>
      )}
    </div>
  );
}

export default App;
