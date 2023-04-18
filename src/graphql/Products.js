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
  query Query($userId: Int!){
    userProducts(userId: $userId) {
      products {
        id
        title
        amount
        price
        total
      }
    }
  }
`;
const addProducts = `
  mutation addProduct($userId: Int!, $productId: Int!){
    addProduct(userId: $userId, productId: $productId) {
      id
    }
  }
`;
const removeProducts = `mutation removeProduct($userId: Int!, $productId: Int!) {
    removeProduct(userId: $userId, productId: $productId) {
      id
    }
  }
`;

export { getProducts, getUserProducts, addProducts, removeProducts };