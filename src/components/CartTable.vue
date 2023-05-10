<script setup>
import { ref, watch } from 'vue';
import { useCartStore } from '../store';

const cartStore = useCartStore();
const selectedCart = ref();
watch(selectedCart, () => cartStore.getTotal(selectedCart.value));

defineProps({
  columns: {
    type: Object,
    default(){
      return {};
    }
  },
  data: {
    type: Object,
    default(){
      return {};
    }
  }
});


</script>

<template>
  <div
    class="q-pa-md "
  >
    <q-table
      v-for="item in data"
      :key="item"
      flat
      bordered
      title="Meu Carrinho"
      :rows="item"
      :columns="columns"
      row-key="title"
      selection="multiple"
      v-model:selected="selectedCart"
      rows-per-page-label="Produtos por página"
    >
      <template #body-cell-amount="props">
        <q-td :props="props">
          <q-btn
            flat
            icon="add"
            @click="cartStore.incrementProduct(props.row.id)"
          />
          <span>{{ props.value }}</span>
          <q-btn
            flat
            icon="remove"
            @click="cartStore.decrementProduct(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>