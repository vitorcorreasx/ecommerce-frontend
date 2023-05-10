<script setup>
import { ref, watch } from 'vue';

const selected = ref([]);
const emit = defineEmits(['decrement', 'increment', 'selected']);

watch(selected, () => {
  console.log('ad');
  emit('selected', selected.value);
}, {deep: true});

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
  },
  title: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div
    class="q-pa-md"
  >
    <q-table
      v-for="item in data"
      :key="item"
      flat
      bordered
      :title="title"
      :rows="item"
      :columns="columns"
      row-key="title"
      selection="multiple"
      v-model:selected="selected"
      rows-per-page-label="Produtos por página"
    >
      <template #body-cell-amount="props">
        <q-td :props="props">
          <q-btn
            flat
            icon="add"
            @click="$emit('increment', props.row.id)"
          />
          <span>{{ props.value }}</span>
          <q-btn
            flat
            icon="remove"
            @click="$emit('decrement', props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>