import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import convue from '../src';

export default defineConfig({
  plugins: [
    vueJsx(),
    ...convue({}),
  ],
});
