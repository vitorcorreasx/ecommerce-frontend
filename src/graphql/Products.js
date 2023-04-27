const getProducts = `
  query {
    allProducts{
      id
      title
      price
    }
  }
`;
const getUserProducts = `
  query Query($user: ID!){
    userProducts(user: $user) {
      products {
        id
        title
        price
        amount
        total
      }  
    }
  }
`;
const addProducts = `
  mutation addProduct($user:  ID!, $product: ID!){
    addProduct(user: $user, product: $product) {
      products {
        amount
      }
    }
  }
`;
const removeProducts = `mutation removeProduct($user: ID!, $product: ID!) {
    removeProduct(user: $user, product: $product) {
      products {
        amount
      }
    }
  }
`;

export { getProducts, getUserProducts, addProducts, removeProducts };