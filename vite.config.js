import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar } from '@quasar/vite-plugin';
import graphql from '@rollup/plugin-graphql';

export default defineConfig({
  plugins: [vue(), quasar(), graphql()],
});
