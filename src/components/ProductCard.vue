<script setup>
import { useMutation, useQuery } from 'villus';
import getProducts from '../graphql/products/getProducts.gql';
import addUserProduct from '../graphql/products/addUserProduct.gql';
import router from '../routes';
import { useUserStore, useCartStore} from '../store';

const userId = useUserStore();
const cartStore = useCartStore();

const addProduct = (product) => {
  const { execute } = useMutation(addUserProduct, {
    refetchTags: ['query'],
  }); 
  execute({
    userId: userId.loggedId,
    input: {
      id: product.id,
      amount: 1,
      title: product.title,
      price: product.price,
      total: product.price
    }
  }).then(({ data }) => {
    console.log(data);
    cartStore.cart = data.addUserProduct;
  });
  router.push({ name: 'CartPage'});
};

const { data } = useQuery({
  query: getProducts,
  tags: ['query']
});
</script>

<template>
  <div
    v-if="data"
    class="q-pa-md row items-start q-gutter-md"
  >
    <q-card
      v-for="item in data.allProducts"
      :key="item"
      class="my-card"
      flat
      bordered
    >
      <q-img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Love_Coffee.jpg" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ item.title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          R$ {{ item.price }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          flat
          round
          icon="add_shopping_cart"
          @click="addProduct(item)"
        />
        <q-btn
          flat
          color="primary"
          @click="router.push({ 
            name: 'Payment',
            params: {
              id: item.id 
            } 
          })"
          label="Comprar agora"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<style scoped>
.my-card {
  width: 20rem;
}
</style>