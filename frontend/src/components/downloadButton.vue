<template>
  <v-btn
    class="mb-4"
    color="secondary"
    :disabled="!JsonFile"
    block
    @click="downloadFile"
  >download json file</v-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'downloadButton',
  data: () => ({}),

  computed: {
    ...mapGetters({
      JsonFile: 'fetchResult',
    }),
  },

  methods: {
    downloadFile() {
      const file = this.JsonFile
      const url = window.URL.createObjectURL(new Blob([file.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.xlsx')
      document.body.appendChild(link)
      link.click()
    },
  },
}
</script>