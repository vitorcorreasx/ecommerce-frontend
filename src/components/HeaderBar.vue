<script setup>
import router from '../routes';
import {useUserStore} from '../store/';

const userId = useUserStore();

const userProfile = () => {
  if (!userId.loggedId) {
    router.push({ name: 'Login' });
  }
};

const logout = () => {
  userId.$reset();
  router.push({ name: 'Login' });
};
</script>

<template>
  <q-layout
    class="container"
    view="lHh lpr lFf"
    container
  >
    <q-header
      class="bg-brown-10 row justify-between"
      elevated
    >
      <q-btn
        flat
        round
        dense
        label="LOGO"
        class="q-ml-xl"
      />

      <q-toolbar class="navbar text-white row justify-between">
        <div class="row-button">
          <q-btn
            no-caps
            label="Home"
            flat
            @click="router.push({ name: 'Home' })"
          />
          <q-btn
            no-caps
            label="Menu"
            flat
            @click="router.push({ name: 'Menu' })"
          />
        </div>

        <div>
          <q-btn
            no-caps
            icon="shopping_cart"
            @click="router.push({ name: 'CartPage' })"
            flat
          />
          <q-btn-dropdown
            no-caps
            icon="person"
            flat
            @click="userProfile"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="logout"
              >
                <q-item-section>
                  <q-item-label>Sair</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
  </q-layout>
</template>

<style scoped>
.navbar {
  width: 55%;
}
.container {
  height: 3rem
}
</style>