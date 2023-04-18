<script setup>
import Header from '../components/HeaderBar.vue';
import preview from '../assets/preview.jpg';

</script>

<template>
  <Header />
  <q-layout>
    <q-img :src="preview" />
  </q-layout>
</template>
