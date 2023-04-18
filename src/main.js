import { createApp } from 'vue';
import router from './routes';
import { pinia, client } from './modules';

import { Quasar, Notify } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

import App from './App.vue';

const app = createApp(App)
  .use(client)
  .use(Quasar, { plugins: { Notify }, })
  .use(router)
  .use(pinia);

app.mount('#app');
