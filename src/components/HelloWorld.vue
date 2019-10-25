<template>
  <v-container fluid>
    <v-layout text-lef wrap>
      <v-stepper class="stepper" v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1">Загрузка файла</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2">Выбор категории товара</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Парсинг</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">Скачивание файла</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-btn
              class="mb-2"
              color="primary"
              :disabled="isDisabled"
              outlined
              @click="goToNextStep"
            >далее</v-btn>

            <v-file-input
              accept=".xls, .xlsx, application/msexel"
              placeholder="Выберите файл"
              v-model="uploadedFile"
              show-size
              autofocus
              @change="fileUpload"
            ></v-file-input>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-btn class="mb-2" text @click="goToPrevStep">назад</v-btn>
            <v-btn class="mb-2" text color="primary" @click="goToNextStep">далее</v-btn>

            <v-radio-group v-model="radioGroup">
              <v-radio
                v-for="(category, index) in stuff"
                :key="index"
                :label="category.name"
                :value="category.value"
              ></v-radio>
            </v-radio-group>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-btn class="mb-2" text @click="goToPrevStep">назад</v-btn>
            <v-btn class="mb-2" text color="primary" @click="goToNextStep">далее</v-btn>

            <v-dialog v-model="dialog" persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  загрузка ...
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-btn class="mb-2" text color="primary" @click="repeat">повторить</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    isDisabled: true,
    uploadedFile: [],
    radioGroup: 1,
    stuff: [
      { name: "кабель", value: "кабель" },
      { name: "канат", value: "канат" },
      { name: "колодец", value: "колодец" }
    ],
    dialog: false,

    rules: [
      value => !value || value.size < 2000000 || "Файл должен быть меньше 2 MB!"
    ]
  }),
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 4000);
    }
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {}, 1000);
  },

  methods: {
    goToPrevStep() {
      this.step--;
    },

    goToNextStep() {
      this.step++;
      this.dialog = true;
    },

    repeat() {
      this.step = 1;
    },
    fileUpload() {
      this.isDisabled = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.stepper {
  width: 100%;
}
</style>
