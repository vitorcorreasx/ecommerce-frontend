<script setup>
import { onMounted } from 'vue';
import router from '../routes';
import { useUserStore } from '../store';
import PaymentStepper from '../components/paymentSteps/PaymentStepper.vue';

const userId = useUserStore();

onMounted(() => {
  if (!userId.loggedId) {
    return router.push({ name: 'Login' });
  }
});
</script>

<template>
  <PaymentStepper />
</template>


