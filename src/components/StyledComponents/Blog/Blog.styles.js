import styled from "styled-components";

export const StyledBlog = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(240, 240, 240);
  padding: 10px 20px;
  margin: 10px;
  width: min(80%, 300px);
  border-radius: 5px;
  @media (max-width: 400px) {
    gap: 20px;
  }
`;

export const StyledBlogInfo = styled.div`
  margin: 20px;
  border-top: 1px solid rgb(240, 240, 240);
  .blog-info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 15px 0;
  }
`;

export const StyledBlogs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  @media (max-width: 400px) {
    align-items: center;
  } ;
`;
