import styled from "styled-components";

export const StyledNavBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(120, 120, 120);
  gap: 20px;
  margin: 10px;
  padding: 10px;
  .nav-links {
    display: flex;
    gap: 20px;
  }
  .login-status {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
