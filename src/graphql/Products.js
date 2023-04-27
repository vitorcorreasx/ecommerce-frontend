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
  query Query($userId: ID!){
    userProducts(userId: $userId) {
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
  mutation addProduct($userId:  ID!, $productId: ID!){
    addProduct(userId: $userId, productId: $productId) {
      products {
        amount
      }
    }
  }
`;
const removeProducts = `mutation removeProduct($userId: ID!, $productId: ID!) {
    removeProduct(userId: $userId, productId: $productId) {
      products {
        amount
      }
    }
  }
`;

export { getProducts, getUserProducts, addProducts, removeProducts };