import styled from "styled-components";

export const StyledForm = styled.form`
  position: relative;
  padding: ${(props) => (props.variant === "comments" ? 0 : "10px")};
  width: min(80vw, 250px);
  button {
    margin-top: 5px;
  }
  div {
    position: relative;
    display: flex;
    width: 250px;
    margin: 5px 0;
    @media (max-width: 350px) {
      width: 100%;
    }
    label {
      width: ${(props) => (props.variant === "login" ? "100px" : "80px")};
    }
    input {
      width: ${(props) => (props.variant === "login" ? "150px" : "170px")};
      margin: ${(props) => (props.variant === "comments" ? "10px 0" : 0)};
      @media (max-width: 350px) {
        width: 50%;
      }
    }
  }
`;

export const StyledLogin = styled.div`
  margin: 10px;
`;
