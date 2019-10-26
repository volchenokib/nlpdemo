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
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-btn class="mb-2" color="primary" outlined large @click="goToNextStep">далее</v-btn>

            <vue-dropzone
              id="1"
              :options="dropzoneOptions"
              :useCustomSlot="true"
              @vdropzone-file-added="handleUpload"
            >
              <div class="dropzone-custom-content">
                <div class="subtitle-1">
                  Перетащите файл сюда или
                  <v-btn color="primary" depressed small>выберите</v-btn>
                </div>
              </div>
            </vue-dropzone>

            <div class="excel-preview">
              <v-data-table
                item-key="name"
                :headers="headers"
                :items="tickets"
                hide-default-footer
                dense
              ></v-data-table>
            </div>
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
            <v-btn class="mb-2" text color="primary" @click="fileDownload">скачать</v-btn>

            <v-dialog v-model="dialog" persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  загрузка ...
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import XLSX from "xlsx";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: () => ({
    step: 1,
    isDisabled: true,
    isLoading: false,
    uploadedFile: [],
    radioGroup: 1,
    stuff: [
      { name: "кабель", value: "кабель" },
      { name: "канат", value: "канат" },
      { name: "колодец", value: "колодец" }
    ],
    dialog: false,

    dropzoneOptions: {
      url: "https://httpbin.org/post",
      acceptedFiles: ".xls, .xlsx",
      addRemoveLinks: true
    },
    tickets: [{ name: "test" }],
    headers: ["Test header"]
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

    fileDownload() {
      console.log("");
    },
    handleUpload(file) {
      // this.$refs["excel-upload-input"].click();
      this.uploadedFile.push(file);
      console.log("file", file);
    },

    /** HELPERS **/
    get_header_row(sheet) {
      var headers = [],
        range = XLSX.utils.decode_range(sheet["!ref"]);
      var C,
        R = range.s.r; /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        var cell =
          sheet[
            XLSX.utils.encode_cell({ c: C, r: R })
          ]; /* find the cell in the first row */
        var hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    fixdata(data) {
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    workbook_to_json(workbook) {
      var result = {};
      workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.stepper {
  width: 100%;
}
.vue-dropzone {
  border: 2px dashed #e5e5e5;
  position: relative;
}
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.excel-preview {
  height: 50vh;
}
</style>
