<template>
  <v-container fluid>
    <v-layout text-lef wrap>
      <component v-bind:is="currentTabComponent" @next="goToNextStep"></component>
    </v-layout>
  </v-container>
</template>

<script>
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import fileUploader from '@/components/fileUploader.vue'
import XLSX from 'xlsx'
import axios from 'axios'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: { fileUploader },

  data: () => ({
    step: 1,
    isDisabled: true,
    isLoading: false,
    uploadedFile: [],
    uploadedFileName: '',
    dropzoneOptions: {
      url: 'https://httpbin.org/post',
      acceptedFiles: '.xls, .xlsx',
      addRemoveLinks: true,
      dictRemoveFile: 'удалить',
      dictCancelUpload: 'отменить',
      dictCancelUploadConfirmation: 'Вы уверены, что хотите отменить загрузку?',
    },
    tickets: [{ name: 'test' }],
    headers: ['Test header'],

    baseUrl: 'http://volchenok.com/assets/',
    currentCategory: '',
    excel: '',
  }),

  beforeDestroy() {
    clearInterval(this.interval)
  },

  mounted() {
    this.interval = setInterval(() => {}, 1000)
  },

  watch: {
    dialog(val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 4000)
    },
  },

  computed: {
    currentTabComponent() {
      if (this.step === 1) {
        return 'fileUploader'
      } else {
        return ''
      }
    },
    categoryList() {
      const g16 = [
        { name: 'кабель', value: 'кабель' },
        { name: 'канат', value: 'канат' },
        { name: 'колодец', value: 'колодец' },
        { name: 'крепление', value: 'крепление' },
        { name: 'металлорукав', value: 'металлорукав' },
        { name: 'настил', value: 'настил' },
        { name: 'ограждение', value: 'ограждение' },
        { name: 'опоры', value: 'опоры' },
        { name: 'пластина', value: 'пластина' },
        { name: 'площадка', value: 'площадка' },
        { name: 'стойка', value: 'стойка' },
        { name: 'стропы', value: 'стропы' },
        { name: 'траверса', value: 'траверса' },
        { name: 'устройство', value: 'устройство' },
      ]
      const g21 = [
        { name: 'кабели', value: 'кабели' },
        { name: 'муфта', value: 'муфта' },
        { name: 'наконечники', value: 'наконечники' },
        { name: 'провод', value: 'провод' },
      ]
      const g31 = [
        { name: 'бобышка', value: 'бобышка' },
        { name: 'днище', value: 'днище' },
        { name: 'заглушки', value: 'заглушки' },
        { name: 'компенсатор', value: 'компенсатор' },
        { name: 'отводы', value: 'отводы' },
        { name: 'переход', value: 'переход' },
        { name: 'тройники', value: 'тройники' },
      ]

      if (this.uploadedFileName === '16 - 25179.XLSX') {
        return g16
      } else if (this.uploadedFileName === 'g21 - 25243.XLSX') {
        return g21
      } else if (this.uploadedFileName === 'g31 - 64977.XLSX') {
        return g31
      } else {
        return [{ name: 'unknown', value: 'unknown' }]
      }
    },
  },

  methods: {
    goToPrevStep() {
      this.step--
    },

    goToNextStep(payload) {
      this.isDisabled = true
      if (this.step === 1) {
        this.currentCategory = ''
        this.isLoading = true
        setTimeout(() => {
          ;(this.isLoading = false)((this.isDisabled = false))
        }, 5000)
      } else if (this.step === 2) {
        this.isLoading = true
        this.fileDownload()
        setTimeout(
          () =>
            (this.isLoading = false)((this.isDisabled = false))(
              this.createTable(this.excel)
            ),
          5000
        )
      }
      this.step++
    },

    handleUpload(file) {
      // this.$refs["excel-upload-input"].click();
      this.isDisabled = false
      this.isLoading = false
      this.uploadedFileName = file.name
    },

    handleRemoveFile() {
      this.isDisabled = true
      this.uploadedFileName = ''
    },

    chooseCategory(value) {},

    fileDownload() {
      const uri =
        this.uploadedFileName.split('.')[0] +
        ' - ' +
        this.currentCategory +
        '.xlsx'
      const encodedURI = encodeURIComponent(uri)
      axios({
        method: 'get',
        url: `${this.baseUrl}${encodedURI}`,
        responseType: 'arraybuffer'
      })
        .then(response => {
          // this.forceFileDownload(response);
          this.excel = response
        })
        .catch()

      // prettier-ignore
      // const response = `${this.baseUrl}${this.uploadedFileName.split(".")[0]} - ${this.currentCategory}.xlsx`;
      // this.forceFileDownload(response);
    },

    createTable() {
      var arraybuffer = this.excel.data
      var data = new Uint8Array(arraybuffer)
      var arr = []
      for (var i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i])
      }
      var bstr = arr.join('')
      var workbook = XLSX.read(bstr, {
        type: 'binary',
      })

      this.workbook_to_json(workbook)

      // var sheet_name = workbook.SheetNames[1];
      // var worksheet = workbook.Sheets[sheet_name];
      // self.parseReceive(worksheet, callback);
      // self.parseReceive(worksheet);
    },

    forceFileDownload() {
      const file = this.excel
      const url = window.URL.createObjectURL(new Blob([file.data]))

      // const url = response;
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.xlsx')
      document.body.appendChild(link)
      link.click()
    },

    /** HELPERS **/
    get_header_row(sheet) {
      var headers = []
      var range = XLSX.utils.decode_range(sheet['!ref'])
      var C
      var R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    fixdata(data) {
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        )
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    workbook_to_json(workbook) {
      var result = {}
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        )
        if (roa.length > 0) {
          result[sheetName] = roa
        }
      })
      this.get_header_row(result)
      return result
    },
  },
}
</script>

<style lang="scss">
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

#customdropzone .dz-preview {
  height: 200px;
  width: 200px;
}

#customdropzone .dz-details {
  background-color: #6f9cd6;
}

.subtitle {
  color: #314b5f;
}

.stepper-content {
  height: 75vh;
}

.excel-preview {
  // height: 75vh;
  &--large {
    height: 66vh;
  }
}
.preview-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.radio-wrapper {
  height: 64vh;
}
</style>
