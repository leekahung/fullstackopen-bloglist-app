import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StyledTable, { StyledTableContainer } from "../StyledComponents/Table/Table";
import Togglable from "../Togglable";
import UserForm from "./UserForm";

const UsersTable = () => {
  const users = useSelector((state) => state.users);

  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>user</th>
          <th>blogs created</th>
        </tr>
        {users.map((u) => {
          return (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

const Users = () => {
  return (
    <>
      <h2 style={{ marginLeft: "20px", marginRight: "20px" }}>Users</h2>
      <StyledTableContainer>
        <UsersTable />
      </StyledTableContainer>
      <Togglable buttonLabel="create user">
        <UserForm />
      </Togglable>
    </>
  );
};

export default Users;
