<script setup>
import { reactive, ref } from 'vue';

const adressInfo = reactive({
  cep: ref(''),
  neighborhood: ref(''),
  street: ref(''),
  houseNumber: ref(''),
  name: ref(''),
  phone: ref(''),
});

const searchCep = (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = () => {
    const res = JSON.parse(request.response);
    adressInfo.street = res.logradouro;
    adressInfo.neighborhood = res.bairro;
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
          v-model="adressInfo.name"
          outlined
          label="Nome"
          class="input"
        />
        <q-input
          v-model="adressInfo.phone"
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
          v-model="adressInfo.cep"
          outlined
          label="CEP"
          class="input"
          @change="searchCep(adressInfo.cep)"
          mask="#####-###"
        />
        <q-input
          v-model="adressInfo.street"
          outlined
          label="Rua"
          class="input"
          :model-value="adressInfo.street"
        />
        <q-input
          v-model="adressInfo.neighborhood"
          outlined
          label="Bairro"
          class="input"
          :model-value="adressInfo.neighborhood"
        />
        <q-input
          v-model="adressInfo.houseNumber"
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