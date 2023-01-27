import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs/Blogs";
import BlogInfo from "./components/Blogs/BlogInfo";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Notifications from "./components/Notifications";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedUser, logout } from "./reducers/loggeduserReducer";
import { Routes, Route, useMatch, Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { theme } from "./components/StyledComponents/Global/Global";
import { StyledNavBar } from "./components/StyledComponents/Navbar/Navbar.styles";
import { StyledButton } from "./components/StyledComponents/Button/Button.styles";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.loggedUser);

  const location = useLocation();

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
    dispatch(initializeLoggedUser());
  }, [dispatch, location.key]);

  const matchUser = useMatch("/users/:id");
  const user = matchUser ? users.find((u) => u.id === matchUser.params.id) : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog ? blogs.find((u) => u.id === matchBlog.params.id) : null;

  const handleLogout = (user) => {
    dispatch(logout(user));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <StyledNavBar>
          <div className="nav-links">
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
          </div>
          {loggedUser.token ? (
            <div className="login-status">
              <div>{loggedUser.name} logged in</div>
              <div>
                <StyledButton onClick={() => handleLogout(loggedUser)}>logout</StyledButton>
              </div>
            </div>
          ) : null}
        </StyledNavBar>
        <Login />
        <Notifications />
        <h1 style={{ marginLeft: "20px", marginRight: "20px" }}>Blogs App</h1>

        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogInfo blog={blog} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User user={user} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
