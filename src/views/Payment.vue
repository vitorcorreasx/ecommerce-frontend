<script setup>
import {ref, onMounted} from 'vue'
import router from '../routes';

import { useUserStore, useCartStore } from '../store';

const userCart = useCartStore();
const tokenUser = useUserStore();

const cep = ref('')
const neighborhood = ref('')
const street = ref('')
const houseNumber = ref('')
const step = ref(1)

onMounted(() => {
  if(tokenUser.loggedId == null){
   return router.push({name: 'Login'})
  }
})

const searchCep = (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`
  const request = new XMLHttpRequest()
  request.open('GET', url);
  request.onload = () => {
    const res = JSON.parse(request.response)
    street.value = res.logradouro
    neighborhood.value = res.bairro
  }
  request.send()
}
</script>

<template>
  <q-layout>
    <q-stepper
      v-model="step"
      ref="stepper"
      active-color="brown-10"
      done-color="brown-10"
      animated
    >
      <q-step
        :name="1"
        title="Endereço de entrega"
        icon="map"
        :done="step > 1"
      >
        <div class="container column q-pl-xl">
          <div class="column">
            <span class="text-h5 q-mb-md">Contato</span>
            <div class="row q-mb-xl">
              <q-input v-model="name" outlined label="Nome" class="input" />
              <q-input v-model="phone" outlined label="Telefone" class="input" mask="(##) #####-####"/>
            </div>
          </div>
          <div class="column">
            <span class="text-h5 q-mb-md">Meu endereço</span>
            <div class="row row q-mb-xl">
              <q-input v-model="cep" outlined label="CEP" class="input" @change="searchCep(cep)" mask="#####-###"/>
              <q-input v-model="street" outlined label="Rua" class="input" :model-value="street"/>
              <q-input v-model="neighborhood" outlined label="Bairro" class="input" :model-value="neighborhood"/>
              <q-input v-model="houseNumber" outlined label="Número" class="input"/>
            </div>
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Pagamento"
        icon="add_card"
        :done="step > 2"
      >
        <div class="container column q-pl-xl">
          <div class="row q-mb-xl" v-for="item in userCart.getCart">
            <q-img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Love_Coffee.jpg"/>
            <div class="column q-ml-lg justify-between">
              <span class="text-h6">{{ item.title }}</span>
              <span class="text-h6">Valor total ( {{ item.amount }} itens ): R${{ item.total }}</span>
              {{ userCart.getTotalCart }}
             </div>
          </div>
          <div class="column">
            <span class="text-h5">Selecione uma forma de pagamento</span>
          </div>
        </div>
      </q-step>

      <q-step
        :name="3"
        title="Compra finalizada!"
        icon="done"
        :done="step >3"
      />
      <template v-slot:navigation>
        <q-stepper-navigation class="row justify-between" >
          <q-btn v-if="step > 1" flat @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm text-brown-10" />
          <div>
            <q-btn label="cancelar compra" color="negative" @click="router.back()"/>
            <q-btn @click="$refs.stepper.next()" :label="step === 3 ? 'Finish' : 'Continue'" class="q-ml-sm bg-brown-10 text-white"/>
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-layout>
</template>
<style scoped>
.input{
  width: 20%;
  margin-right: 3rem;
}
</style>