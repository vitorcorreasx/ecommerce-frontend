<script setup>
import { ref, computed, reactive } from 'vue'
import router from '../routes'

import Header from '../components/Header.vue';

import { useQuery, useMutation } from 'villus';
import { getUserProducts, addProducts, removeProducts } from '../graphql/Products';

import { useUserStore } from '../store';

const tokenUser = useUserStore();

const variables = reactive({
  userId: tokenUser.loggedId
})

const selected = ref([])
const total = ref(0)

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

const {data} = useQuery({
  query: getUserProducts,
  variables,
  tags: ['query']
})

const calcTotal = (row) =>{
  return (row.price * row.amount).toFixed(2)
}
const getSelectedSize = computed(() => {
   const priceSelect = []
     selected.value.map(item => {
       priceSelect.push(item.price * item.amount)
     })
     
     if(priceSelect != ''){
       total.value = priceSelect.reduce((sum, i) => sum + i)
       return
     }
     total.value = 0
})

const columns = [
  { name: 'title', required: true, label: 'Produto', align: 'left', field: 'title'},
  { name: 'price', align: 'center', label: 'Preço', field: 'price' },
  { name: 'amount', align: 'center',label: 'Quantidade', field: 'amount' },
  { name: 'total', align: 'center', label: 'Total'},
]

</script>

<template>
  <Header/>
  <div class="q-pa-md " v-if="data" v-for="item in data.userProducts" :key="item">
    <q-table
      flat bordered
      title="Meu Carrinho"
      :rows="item"
      :columns="columns"
      row-key="title"
      :selected-rows-label="getSelectedSize"
      selection="multiple"
      v-model:selected="selected"
      rows-per-page-label="Produtos por página"
      >
      <template v-slot:body-cell-amount="props">
        <q-td :props="props">
          <q-btn flat icon="add" @click="addCart(props.row.id)"/>
          <span>{{ props.value }}</span>
          <q-btn flat icon="remove" @click="removeCart(props.row.id)"/>
        </q-td>
      </template>

      <template v-slot:body-cell-total="props">
        <q-td :props="props">
          <span>R$ {{ calcTotal(props.row) }}</span>
        </q-td>
      </template>
    </q-table>
  </div>
 

  <div class="column q-pa-md items-end">
    <span class="q-mb-md text-h6">Total R$ {{ total }}</span>
    <q-btn color="positive" label="Finalizar compra" @click="router.push({name: 'Payment'})"/>
  </div>
  
</template>

<style scoped>
</style>