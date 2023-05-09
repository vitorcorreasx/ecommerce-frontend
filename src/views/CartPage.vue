<script setup>
import { ref, watch, onMounted } from 'vue';
import router from '../routes';
import { useQuasar } from 'quasar';
import { useQuery, useMutation } from 'villus';
import { useUserStore, useCartStore } from '../store';
import getUserProducts from '../graphql/products/getUserProducts.gql';
import updateUserProducts from '../graphql/products/updateUserProducts.gql';

import Header from '../components/HeaderBar.vue';
import CartTable from '../components/CartTable.vue';

const tokenUser = useUserStore();
const cartStore = useCartStore();
const $q = useQuasar();
const selectedCart = ref([]);
watch(selectedCart, () => cartStore.getTotal(selectedCart.value));

const columns = [
  { name: 'title', required: true, label: 'Produto', align: 'left', field: 'title' },
  { name: 'price', align: 'center', label: 'Preço', field: 'price' },
  { name: 'amount', align: 'center', label: 'Quantidade', field: 'amount' },
  { name: 'total', align: 'center', label: 'Total', field: 'total' },
];

onMounted(() => {
  if (tokenUser.loggedId == null) {
    return router.push({ name: 'Login' });
  }
});
useQuery({
  query: getUserProducts,
  variables: {
    userId: tokenUser.loggedId
  },
  tags: ['query']
}).then(({data}) => {
  cartStore.cart = data.value.userProducts;
});



const saveCart = () => {
  const { execute } = useMutation(updateUserProducts, {
    refetchTags: ['query'],
  }); 
  execute({
    userId: tokenUser.loggedId,
    input: cartStore.cart.products
  });
};

const finishCart = () => {
  if (selectedCart.value.length != 0) {
    router.push({ name: 'Payment', params: { id: tokenUser.loggedId } });
    return;
  }
  $q.notify({
    type: 'warning',
    message: 'Selecione algum item!',
    position: 'top-right'
  });
};

</script>

<template>
  <Header />
  <CartTable
    :columns="columns"
    :data="cartStore.cart"
  />
  <div class="column q-pa-md items-end">
    <span class="q-mb-md text-h6">Total R$ {{ cartStore.getTotalPrice }}</span>
    <div>
      <q-btn
        color="brown-10"
        label="Salvar carrinho"
        @click="saveCart"
      />
      <q-btn
        class="q-ml-md"
        color="positive"
        label="Finalizar compra"
        @click="finishCart"
      />
    </div>
  </div>
</template>
