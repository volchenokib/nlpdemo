<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>NLP Parser</span>
        &nbsp;
        <span class="font-weight-light">Demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>

    <v-footer padless class="footer">
      <div class="text-left footer_text">
        <strong class="text-capitalize">econpysica,</strong>
        {{ new Date().getFullYear() }}
      </div>

      <v-spacer></v-spacer>
      <a href="https://econophysica.ru/" target="_blank">
        <img class="footer__logo" src="./assets/eco_logo.png" alt="logo" />
      </a>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss" scoped>
.footer {
  color: #9c999c;
  font-size: 12px;
  padding: 10px 17px;
  &__logo {
    height: 40px;
  }
}
</style>
