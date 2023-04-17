<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar';
import router from '../routes'
import Header from '../components/Header.vue';

import { useQuery, useMutation } from 'villus';
import { getUserProducts, addProducts, removeProducts } from '../graphql/Products';

import { useUserStore, useCartStore } from '../store';

const $q = useQuasar();
const userCart = useCartStore();
const tokenUser = useUserStore();

const variables = reactive({
  userId: tokenUser.loggedId
})

const columns = ref([
  { name: 'title', required: true, label: 'Produto', align: 'left', field: 'title' },
  { name: 'price', align: 'center', label: 'Preço', field: 'price' },
  { name: 'amount', align: 'center', label: 'Quantidade', field: 'amount' },
  { name: 'total', align: 'center', label: 'Total', field: 'total' },
])

onMounted(() => {
  if (tokenUser.loggedId == null) {
    return router.push({ name: 'Login' })
  }
})

const addCart = async (id) => {
  const { execute } = useMutation(addProducts, {
    refetchTags: ['query'],
  })
  await execute({
    userId: tokenUser.loggedId,
    productId: id
  })

}
const removeCart = async (id) => {
  const { execute } = useMutation(removeProducts, {
    refetchTags: ['query'],
  })
  await execute({
    userId: tokenUser.loggedId,
    productId: id
  })
}
const finishCart = () => {
  if (userCart.getCart != '') {
    router.push({ name: 'Payment', params: { id: tokenUser.loggedId } })
    return
  }
  $q.notify({
    type: 'warning',
    message: 'Selecione algum item!',
    position: 'top-right'
  })
}

const { data } = useQuery({
  query: getUserProducts,
  variables,
  tags: ['query']
})

const getSelected = computed(() => {
  const sumPrice = ref(0)
  const sumAmount = ref(0)
  if (userCart.getCart == '') {
    userCart.cartTotal = 0;
    return
  }
  userCart.getCart.forEach(e => {
    sumPrice.value = sumPrice.value + e.price
    sumAmount.value = sumAmount.value + e.amount
    userCart.cartTotal = (sumPrice.value * sumAmount.value).toFixed(2)
  })
})
</script>

<template>
  <Header />
  <div class="q-pa-md " v-if="data" v-for="item in data.userProducts" :key="item">
    <q-table flat bordered title="Meu Carrinho" :rows="item" :columns="columns" row-key="title"
      :selected-rows-label="getSelected" selection="multiple" v-model:selected="userCart.userCart"
      rows-per-page-label="Produtos por página">
      <template v-slot:body-cell-amount="props">
        <q-td :props="props">
          <q-btn flat icon="add" @click="addCart(props.row.id)" />
          <span>{{ props.value }}</span>
          <q-btn flat icon="remove" @click="removeCart(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </div>
  <div class="column q-pa-md items-end">
    <span class="q-mb-md text-h6">Total R$ {{ userCart.getTotalCart }}</span>
    <q-btn color="positive" label="Finalizar compra" @click="finishCart" />
  </div>
</template>
