const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div style={{ margin: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
