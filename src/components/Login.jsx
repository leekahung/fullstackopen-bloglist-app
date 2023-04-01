import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/loggeduserReducer";
import StyledButton from "./StyledComponents/Button/Button";
import StyledForm, { StyledLogin } from "./StyledComponents/Form/Form";

const Login = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const { clearValue: clearUsername, ...username } = useField("text");
  const { clearValue: clearPassword, ...password } = useField("text");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: username.value,
        password: password.value,
      })
    );
    clearUsername();
    clearPassword();
  };

  return (
    <>
      {!loggedUser.token ? (
        <StyledLogin>
          <h2 style={{ marginLeft: "10px", marginRight: "10px" }}>Login</h2>
          <StyledForm variant="login" onSubmit={handleLogin}>
            <div>
              <label>username: </label>
              <input {...username} />
            </div>
            <div>
              <label>password: </label>
              <input {...password} />
            </div>
            <StyledButton>login</StyledButton>
          </StyledForm>
        </StyledLogin>
      ) : null}
    </>
  );
};

export default Login;
