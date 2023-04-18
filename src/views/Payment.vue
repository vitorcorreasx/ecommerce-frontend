<script setup>
import { ref, onMounted, } from 'vue'
import router from '../routes';

import verify from '../assets/verify.png'
import Address from '../components/paymentSteps/Address.vue'
import PaymentForm from '../components/paymentSteps/PaymentForm.vue'

import { useQuery } from 'villus';
import { getCardBalance } from '../graphql/CardVerify'

import { useUserStore } from '../store';
const tokenUser = useUserStore()

const step = ref(1)

const { data } = useQuery({
  query: getCardBalance,

})

onMounted(() => {
  if (tokenUser.loggedId == null) {
    return router.push({ name: 'Login' })
  }
})

</script>

<template>
  <q-layout>
    <q-stepper v-model="step" ref="stepper" active-color="brown-10" done-color="brown-10" animated>
      <q-step :name="1" title="Endereço de entrega" icon="map" :done="step > 1">
        <Address />
      </q-step>

      <q-step :name="2" title="Pagamento" icon="add_card" :done="step > 2">
        <PaymentForm />
      </q-step>

      <q-step class="column items-center" :name="3" title="Compra finalizada!" icon="done" :done="step > 3">
        <div class="column">
          <q-img :src="verify" width="200px" />
          <span class="text-h5 q-mt-lg">Compra finalizada!</span>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="row justify-between">
          <q-btn v-if="step > 1" flat @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm text-brown-10" />
          <div>
            <q-btn label="cancelar compra" color="negative" @click="router.back()" />
            <q-btn @click="$refs.stepper.next()" :label="step === 3 ? 'Finalizar' : 'Continuar'"
              class="q-ml-sm bg-brown-10 text-white" />
          </div>
        </q-stepper-navigation>
      </template>

    </q-stepper>
  </q-layout>
</template>

