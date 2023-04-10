<script setup> 
  import router from '../routes';

</script>

<template>
  <q-layout class="container" view="lHh lpr lFf" container>
    <q-header class="bg-brown-10 row justify-between" elevated>
      <q-btn flat round dense label="LOGO" class="q-ml-xl" />

      <q-toolbar class="navbar text-white row justify-between">
            <div class="row-button">
              <q-btn no-caps class="q-mr-md" label="Home" flat @click="router.push({name: 'Home'})"/>
              <q-btn no-caps class="q-mr-xl" label="Menu" flat @click="router.push({name: 'Menu'})"/>
            </div>

            <div class="q-mr-xl">
              <q-btn no-caps icon="shopping_cart" @click="router.push({name: 'CartPage'})" flat/>
              <q-btn no-caps icon="person" flat @click="router.push({name: 'Login'})" />
            </div>
      </q-toolbar>
    </q-header>
  </q-layout>
</template>
<style scoped>
.navbar{
  width: 55%;
}
.container{
  height: 3rem
}

</style>