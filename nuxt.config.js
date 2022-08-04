export default {
  env: {
    API_URL: process.env.API_URL,
  },
  layoutTransition: {
    name: 'fade-transform',
  },
  pageTransition: {
    name: 'fade-transform',
  },
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Nuxt Element Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '@/lib/styles/index.scss',
    '~/assets/scss/main.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // Lib plugin
    '@/lib/plugins/router',
    '@/lib/plugins/element-ui',
    '@/lib/plugins/plugins.js',
    '@/lib/plugins/plugins.server.js',
    '@/lib/plugins/plugins.client.js',
    '@/plugins/api',
    '@/plugins/interceptor',
    { src: '@/plugins/jsex', ssr: false },
    { src: '@/plugins/math', ssr: false },
    { src: '@/plugins/reg', ssr: false },
    // Custom plugin
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    {
      path: '~/lib/components/global', // will get any components nested in let's say /components/test too
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
},

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    retry: { retries: 3 },
  },

  proxy: {
      '/api/': {
          target: process.env.API_REST,
          pathRewrite: { '^/api/': '' },
          secure: false,
      }
  },

  svgSprite: {
    input: '~/lib/icons/svg',
    elementClass: 'svg-icon',
  },
  styleResources: {
    scss: ['@/lib/styles/variables.scss', '~/assets/scss/variables.scss'],
  },

  router: {
    // middleware: ['auth'],
  },
  // serverMiddleware: ['~/mock'],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
  },
}
