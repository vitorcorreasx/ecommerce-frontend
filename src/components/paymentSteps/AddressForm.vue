<script setup>
import { ref } from 'vue';

const cep = ref('');
const neighborhood = ref('');
const street = ref('');
const houseNumber = ref('');
const name = ref('');
const phone = ref('');

const searchCep = (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = () => {
    const res = JSON.parse(request.response);
    street.value = res.logradouro;
    neighborhood.value = res.bairro;
  };
  request.send();
};

</script>

<template>
  <div class="container column q-pl-xl">
    <div class="column">
      <span class="text-h5 q-mb-md">Contato</span>
      <div class="row q-mb-xl">
        <q-input
          v-model="name"
          outlined
          label="Nome"
          class="input"
        />
        <q-input
          v-model="phone"
          outlined
          label="Telefone"
          class="input"
          mask="(##) #####-####"
        />
      </div>
    </div>
    <div class="column">
      <span class="text-h5 q-mb-md">Meu endereço</span>
      <div class="row row q-mb-xl">
        <q-input
          v-model="cep"
          outlined
          label="CEP"
          class="input"
          @change="searchCep(cep)"
          mask="#####-###"
        />
        <q-input
          v-model="street"
          outlined
          label="Rua"
          class="input"
          :model-value="street"
        />
        <q-input
          v-model="neighborhood"
          outlined
          label="Bairro"
          class="input"
          :model-value="neighborhood"
        />
        <q-input
          v-model="houseNumber"
          outlined
          label="Número"
          class="input"
        />
      </div>
    </div>
  </div>
</template>

<style>
.input {
  width: 20%;
  margin-right: 3rem;
}
</style>