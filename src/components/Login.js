const Login = ({
  handleLogin,
  username,
  handleUsername,
  password,
  handlePassword,
}) => {
  const loginStyles = {
    margin: "10px 0",
  };

  return (
    <div style={loginStyles}>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            <label>username </label>
            <input value={username} onChange={handleUsername} />
          </div>
          <div>
            <label>password </label>
            <input type="password" value={password} onChange={handlePassword} />
          </div>
          <button style={loginStyles}>login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
