<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Excel To Json</span>
        &nbsp;
        <span class="font-weight-light">Converter</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <div class="wrapper d-flex flex-nowrap">
        <div class="upload-zone flex-grow-3">
          <fileUploader />

          <v-btn class="download-button mb-4" block color="secondary" dark>download</v-btn>
        </div>

        <div class="result-zone flex-grow-1">
          <result />
        </div>
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

.download-button {
  position: absolute;
  bottom: 0;
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
