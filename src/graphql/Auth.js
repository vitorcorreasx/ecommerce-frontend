const login = `
  query
   Query($username: String!, $password: String!){
     loginUser(username: $username, password: $password){
      id
    }
  }
`;

const register = `
  mutation createUser($username: String!, $password: String!){
    createUser(username: $username, password: $password) {
      id
    }
  }
`;

export { login, register };