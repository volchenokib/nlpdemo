<template>
  <v-container>
    <v-btn
      class="mb-2"
      color="primary"
      :disabled="isDisabled"
      outlined
      @click="setStep"
      >next</v-btn
    >

    <vue-dropzone
      id="customdropzone"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      @vdropzone-file-added="handleFileUpload"
      @vdropzone-complete="handleUpload"
      @vdropzone-removed-file="handleRemoveFile"
    >
      <div class="dropzone-custom-content">
        <div class="subtitle-1">
          Drop files here or
          <a class="primary--text">click to upload</a>
        </div>
      </div>
    </vue-dropzone>
  </v-container>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'

export default {
  name: 'fileUploader',

  components: {
    vueDropzone: vue2Dropzone
  },

  data: () => ({
    // step: 1,
    isDisabled: true,
    isLoading: false,
    uploadedFile: [],
    uploadedFileName: '',
    dropzoneOptions: {
      url: 'https://httpbin.org/post',
      acceptedFiles: '.xls, .xlsx',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles: 1
    },
    tickets: [{ name: 'test' }],
    headers: ['Test header'],

    baseUrl: 'http://volchenok.com/assets/',
    currentCategory: '',
    excel: ''
  }),

  methods: {
    handleFileUpload(file) {
      console.log('file', file)
      this.isLoading = true
      let formData = new FormData()
      formData.append('file', file)

      this.$store.dispatch('sendFile', formData)
    },

    setStep() {
      // this.isDisabled = true
      // if (this.step === 1) {
      //   this.currentCategory = ''
      //   this.isLoading = true
      //   setTimeout(() => {
      //     ;(this.isLoading = false)((this.isDisabled = false)((this.step = 2)))
      //   }, 5000)
      // } else if (this.step === 2) {
      //   this.isLoading = true
      //   // this.fileDownload()
      //   setTimeout(
      //     () =>
      //       (this.isLoading = false)((this.isDisabled = false))(
      //         this.$parent.createTable(this.excel)
      //       ),
      //     5000
      //   )
      // }
      // this.step++

      this.$emit('next', 2)
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
    }
  }
}
</script>
