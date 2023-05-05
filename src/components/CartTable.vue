<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<!-- eslint-disable vue/return-in-computed-property -->
<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import router from '../routes';
import { useQuery, useMutation } from 'villus';
import getUserProducts from '../graphql/products/getUserProducts.gql';
import updateUserProducts from '../graphql/products/updateUserProducts.gql';

import { useUserStore, useCartStore } from '../store';

const $q = useQuasar();
const cartStore = useCartStore();
const tokenUser = useUserStore();

useQuery({
  query: getUserProducts,
  variables: {
    userId: tokenUser.loggedId
  },
  tags: ['query']
}).then(({data}) => {
  cartStore.cart = data.value.userProducts;
});

const columns = ref([
  { name: 'title', required: true, label: 'Produto', align: 'left', field: 'title' },
  { name: 'price', align: 'center', label: 'Preço', field: 'price' },
  { name: 'amount', align: 'center', label: 'Quantidade', field: 'amount' },
  { name: 'total', align: 'center', label: 'Total', field: 'total' },
]);

const saveCart = () => {
  const { execute } = useMutation(updateUserProducts, {
    refetchTags: ['query'],
  }); 
  execute({
    userId: tokenUser.loggedId,
    input: cartStore.cart.products
  });
};

const addCart = async (productId) => {
  const findProduct = cartStore.cart.products.findIndex(e => e.id == productId);
  const item = cartStore.cart.products[findProduct];
  item.amount++;
  item.total = item.amount * item.price;
};

const removeCart = async (productId) => {
  const findProduct = cartStore.cart.products.findIndex(e => e.id == productId);
  const item = cartStore.cart.products[findProduct];
  if(item.amount > 0){
    item.amount--;
  }
  item.total = item.amount * item.price;
};

const finishCart = () => {
  if (cartStore.getSelectedCart.length != 0) {
    router.push({ name: 'Payment', params: { id: tokenUser.loggedId } });
    return;
  }
  $q.notify({
    type: 'warning',
    message: 'Selecione algum item!',
    position: 'top-right'
  });
};
const getSelected = computed(() => {
  const sumPrice = ref(0);
  const sumAmount = ref(0);
  if (cartStore.getSelectedCart.length == 0) {
    cartStore.cartTotal = 0;
    return;
  }
  cartStore.getSelectedCart.forEach(e => {
    sumPrice.value = sumPrice.value + e.price;
    sumAmount.value = sumAmount.value + e.amount;
    cartStore.cartTotal = (sumPrice.value * sumAmount.value).toFixed(2);
  });
});
</script>

<template>
  <div
    class="q-pa-md "
  >
    <q-table
      v-for="item in cartStore.cart"
      :key="item"
      flat
      bordered
      title="Meu Carrinho"
      :rows="item"
      :columns="columns"
      row-key="title"
      :selected-rows-label="getSelected"
      selection="multiple"
      v-model:selected="cartStore.selectedCart"
      rows-per-page-label="Produtos por página"
    >
      <template #body-cell-amount="props">
        <q-td :props="props">
          <q-btn
            flat
            icon="add"
            @click="addCart(props.row.id)"
          />
          <span>{{ props.value }}</span>
          <q-btn
            flat
            icon="remove"
            @click="removeCart(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <div class="column q-pa-md items-end">
    <span class="q-mb-md text-h6">Total R$ {{ cartStore.getTotalCart }}</span>
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