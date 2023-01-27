import styled from "styled-components";

export const StyledTable = styled.table`
  width: 400px;
  @media (max-width: 440px) {
    width: 100%;
  }

  padding: 10px;
  border: 1px solid white;
  border-collapse: collapse;
  th {
    padding: 10px;
    border-bottom: 2px solid rgb(240, 240, 240);
  }
  td {
    text-align: center;
    padding: 10px;
  }
  margin-bottom: 10px;
`;

export const StyledTableContainer = styled.div`
  margin: 20px;
`;
