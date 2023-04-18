<script setup>
import { ref, computed } from 'vue';
import { useMutation } from 'villus';
import router from '../routes';
import { register } from '../graphql/Auth';
import { useQuasar } from 'quasar';
import Header from '../components/HeaderBar.vue';

const $q = useQuasar();
const username = ref('');
const password = ref('');
const isPwd = ref(true);
const pwdVisible = computed(() => isPwd.value ? 'visibility_off' : 'visibility');
const pwdType = computed(() => isPwd.value ? 'password' : 'text');

const showPassword = () => {
  isPwd.value = !isPwd.value;
};
const signUp = (username, password) => {
  const newUsername = username.trim();
  const newPassword = password.trim();
  const { execute } = useMutation(register);
  if (newUsername && newPassword !== '') {
    execute({
      username: newUsername,
      password: newPassword
    }).then(({ data }) => {
      if (data.createUser == null) {
        $q.notify({
          type: 'negative',
          message: 'Usuário já existe!',
          position: 'top-right'
        });
        return;
      }
      if (data.createUser) {
        router.push({ name: 'Login' });
        $q.notify({
          type: 'positive',
          message: 'Cadastrado com sucesso',
          position: 'top-right'
        });
      }
    });
  } else {
    $q.notify({
      type: 'negative',
      message: 'Campos vazios!',
      position: 'top-right'
    });
  }
};
</script>

<template>
  <Header />
  <q-layout class="column flex-center">
    <div class="container">
      <q-form
        class="column"
        @submit="signUp(username, password)"
      >
        <q-input
          :rules="[val => val.length >= 5 || 'Por favor, minimo 5 caracteres']"
          v-model="username"
          label="Usuario"
        />
        <q-input
          v-model="password"
          label="Senha"
          :rules="[val => val.length >= 5 || 'Por favor, mínimo 5 caractéres']"
          :type="pwdType"
        >
          <template #append>
            <q-icon
              :name="pwdVisible"
              class="cursor-pointer"
              @click="showPassword"
            />
          </template>
        </q-input>
        <q-btn
          class="q-mt-md q-mb-md"
          type="submit"
          color="brown"
          label="Cadastrar"
        />
      </q-form>
      <span>Ja possui conta?
        <q-btn
          @click="router.push({ name: 'Login' })"
          no-caps
          flat
          class="text-primary"
          label="Entre aqui!" 
        />
      </span>
    </div>
  </q-layout>
</template>

<style scoped></style>