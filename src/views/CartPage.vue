<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';

import { useQuery } from 'villus';
import { getUserProducts } from '../graphql/Products';

import { useUserStore } from '../store';
const tokenUser = useUserStore();

const variables = reactive({
  userId: tokenUser.loggedId
})

const {data} = useQuery({
  query: getUserProducts,
  variables,
  tags: ['query']
})

const selected = ref([])
const total = ref(0)

const columns = [
  { name: 'title', required: true, label: 'Produto', align: 'left', field: 'title'},
  { name: 'price', align: 'center', label: 'Preço', field: 'price' },
  { name: 'amount', align: 'center',label: 'Quantidade', field: 'amount' },
  { name: 'total',align: 'center', label: 'Total', field: 'total' },
]



const getSelectedSize = () => {
  const priceSelect = []
    selected.value.map(item => {
      priceSelect.push(item.price)
    })
  total.value = priceSelect.reduce((sum, i) => sum + i)
  if(data){
    return selected.value.length === 0 ? '' : `${selected.value.length} produto${selected.value.length > 1 ? 's' : ''} selecionado de ${data.value.userProducts.products.length}`
  }
}

</script>

<template>
  <Header/>
  <div  v-if="data" v-for="item in data.userProducts" :key="item" class="q-pa-md ">
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
    />
  </div >
  <div class="column q-pa-md items-end">
    <span class="q-mb-md text-h6">Total R$ {{ total }}</span>
    <q-btn color="positive" label="Finalizar compra"/>
  </div>
  
</template>

<style scoped>
</style>