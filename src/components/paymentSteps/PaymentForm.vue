<script setup>
import { ref } from 'vue';

import { useCartStore } from '../../store';

const userCart = useCartStore();

const tab = ref('card');
const cardNumber = ref('');
const cpf = ref('');
const name = ref('');
const valiteDate = ref('');
const cvv = ref('');

</script>

<template>
  <div class="container row q-pl-xl justify-between">
    <div class="column">
      <span class="text-h5">Valor total do pedido: R$ {{ userCart.getTotalCart }}</span>

      <div class="table q-mt-xl">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="brown-10"
            indicator-color="brown-10"
            align="justify"
            narrow-indicator
          >
            <q-tab
              name="card"
              label="Cartão"
            />
            <q-tab
              name="ticket"
              label="Boleto"
            />
            <q-tab
              name="pix"
              label="Pix"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
          >
            <q-tab-panel
              name="card"
              class="row"
            >
              <q-input
                v-model="cardNumber"
                outlined
                class="col-6 q-mr-md q-mb-md"
                label="Número do Cartão"
                mask="#### #### #### ####"
                :rules="[val => val && val.length > 0 || 'Digite um número de cartão válido']"
              />
              <q-input
                v-model="cvv"
                outlined
                class="col-2 q-mr-md q-mb-md"
                label="CVC"
                mask="###"
                :rules="[val => val && val.length > 0 || 'Digite o CVC conforme cartão']"
              />
              <q-input
                v-model="valiteDate"
                outlined
                class="q-mb-md"
                label="Validade (MM/AAAA)"
                mask="##/####"
                :rules="[val => val && val.length > 0 || 'Digite a validade conforme cartão']"
              />
              <q-input
                v-model="name"
                outlined
                class="col-6 q-mr-md "
                label="Nome Títular"
                :rules="[val => val && val.length > 0 || 'Digite o nome conforme cartão']"
              />
              <q-input
                v-model="cpf"
                outlined
                class="col-5"
                label="CPF"
                mask="###.###.###-##"
                :rules="[val => val && val.length > 0 || 'Digite um CPF válido']"
              />
            </q-tab-panel>

            <q-tab-panel name="ticket">
              <div class="text-h6">
                Opção não está disponível ainda!
              </div>
            </q-tab-panel>

            <q-tab-panel name="pix">
              <div class="text-h6">
                Opção não está disponível ainda!
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  width: 60rem;
}
</style>