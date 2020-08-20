<template>
  <v-app>
    <v-navigation-drawer v-model="drawerRight" app>
      <fileUploader />

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            class="mb-4"
            :disabled="!isJsonFileExist"
            color="secondary"
            block
          >download json file</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app collapse-on-scroll flat dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Excel To Json</span>
        &nbsp;
        <span class="font-weight-light">Converter</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <div class="result-zone flex-grow-1">
        <result />
      </div>
    </v-content>

    <v-footer padless class="footer">
      <div class="text-left footer_text">
        <strong>volchenok,</strong>
        {{ new Date().getFullYear() }}
      </div>

      <v-spacer></v-spacer>
      <a href="https://volchenok.com/" target="_blank">
        <img class="footer__logo" src="./assets/logo_transparent.png" alt="logo" />
      </a>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import fileUploader from '@/components/fileUploader.vue'
import result from './components/result'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    fileUploader,
    result,
  },
  data: () => ({
    //
  }),

  computed: {
    isJsonFileExist() {
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}

.upload-zone {
  background-color: rgb(226, 226, 226);
  position: relative;
}

.result-zone {
}

.footer {
  color: #9c999c;
  font-size: 12px;
  padding: 10px 17px;
  &__logo {
    height: 40px;
  }
}
</style>
