import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        nested: 'comics.html',
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(`${__dirname}/src`, 'partials'),
    }),
  ],
};
