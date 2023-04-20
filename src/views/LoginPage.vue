<script setup>
import { ref, computed } from 'vue';
import { useQuery } from 'villus';
import router from '../routes';
import Header from '../components/HeaderBar.vue';
import { login } from '../graphql/Auth';
import { useUserStore } from '../store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const username = ref(null);
const password = ref(null);
const isPwd = ref(true);
const visible = computed(() => isPwd.value ? 'visibility_off' : 'visibility');
const type = computed(() => isPwd.value ? 'password' : 'text');
const showPassword = () => {
  isPwd.value = !isPwd.value;
};

const signIn = async (username, password) => {
  const store = useUserStore();
  await useQuery({
    query: login,
    variables: {
      username,
      password
    },
  }).then(({ data }) => {
    if (!data.value) {
      $q.notify({
        type: 'negative',
        message: 'Campos vazios!',
        position: 'top-right'
      });
      return;
    }
    if (data.value.loginUser) {
      store.$patch({
        userId: data.value.loginUser.id
      });
      router.back();
    } 
    else {
      $q.notify({
        type: 'negative',
        message: 'Credenciais inválidas!',
        position: 'top-right'
      });
    }
  });
};
</script>

<template>
  <Header />
  <q-layout class="column flex-center">
    <div class="container">
      <q-form
        class="column"
        @submit="signIn(username, password)"
      >
        <q-input
          v-model="username"
          label="Usuario"
        />
        <q-input
          v-model="password"
          label="Senha"
          :type="type"
        >
          <template #append>
            <q-icon
              :name="visible"
              class="cursor-pointer"
              @click="showPassword"
            />
          </template>
        </q-input>
        <q-btn
          class="q-mt-sm q-mb-md text-right"
          type="submit"
          color="brown"
          label="Entrar"
        />
      </q-form>
      <span>
        Novo por aqui?
        <q-btn
          label="Cadastre-se"
          @click="router.push({ name: 'Register' })"
          no-caps
          flat
          class="text-primary"
        />
      </span>
    </div>
  </q-layout>
</template>