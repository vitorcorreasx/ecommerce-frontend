<script setup>
import { onMounted } from 'vue';
import Header from '../components/HeaderBar.vue';
import CartTable from '../components/CartTable.vue';
import { useUserStore } from '../store';
import router from '../routes';

const tokenUser = useUserStore();

onMounted(() => {
  if (tokenUser.loggedId == null) {
    return router.push({ name: 'Login' });
  }
});
</script>

<template>
  <Header />
  <CartTable />
</template>
