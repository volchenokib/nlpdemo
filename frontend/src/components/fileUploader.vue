<template>
  <v-container>
    <vue-dropzone
      id="customdropzone"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      @vdropzone-file-added="fileUploadHandler"
      @vdropzone-success="handlerSuccessfulUpload"
      @vdropzone-removed-file="fileDeleteHandler"
    >
      <div class="dropzone-custom-content">
        <div class="subtitle-1">
          Drop excel file here or
          <br />
          <a class="primary--text">click to upload</a>
        </div>
      </div>
    </vue-dropzone>
  </v-container>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'fileUploader',

  components: {
    vueDropzone: vue2Dropzone,
  },

  data: () => ({
    isDisabled: true,
    isLoading: false,
    uploadedFile: [],
    uploadedFileName: '',
    dropzoneOptions: {
      url: '/api',
      acceptedFiles: '.xls, .xlsx',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles: 1,
    },
    tickets: [{ name: 'test' }],
    headers: ['Test header'],
    baseUrl: '/',
    currentCategory: '',
    excel: '',
  }),

  methods: {
    fileUploadHandler(file) {
      // this.isLoading = true
      // let formData = new FormData()
      // formData.append('file', file)
      // this.$store.dispatch('sendFile', formData)
    },

    handlerSuccessfulUpload(file, response) {
      this.$store.dispatch('renderJson', response)
    },

    handleUpload(file) {
      // this.$refs["excel-upload-input"].click();
      this.isDisabled = false
      this.isLoading = false
      this.uploadedFileName = file.name
    },
    fileDeleteHandler() {
      this.$store.commit('RESET')
    },
  },
}
</script>

<style lang="scss">
.dropzone {
  display: flex;
  justify-content: center;
  min-height: 90vh;
  position: relative;
}

.dz-message {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
