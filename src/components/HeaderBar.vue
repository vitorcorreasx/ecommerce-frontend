<script setup>
import router from '../routes';
import {useUserStore} from '../store/';

const tokenUser = useUserStore();

const userProfile = () => {
  if (!tokenUser.loggedId) {
    router.push({ name: 'Login' });
  }
};
const logout = () => {
  tokenUser.$reset();
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
            class="q-mr-md"
            label="Home"
            flat
            @click="router.push({ name: 'Home' })"
          />
          <q-btn
            no-caps
            class="q-mr-xl"
            label="Menu"
            flat
            @click="router.push({ name: 'Menu' })"
          />
        </div>

        <div class="q-mr-xl">
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
              >
                <q-item-section>
                  <q-item-label>Meu perfil</q-item-label>
                </q-item-section>
              </q-item>
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