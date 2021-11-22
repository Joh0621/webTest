<template>
  <div>
    <a :href="href">下载模板</a>
    <label class="file-select">
      <div class="select-button">
        <span>Select File</span>
      </div>
      <input type="file" @change="handleFileChange" ref="inputs"/>
    </label>

  </div>
</template>
<script>
import { chengpinDownLoad, chengpinUpload } from '@/api/fill'
import axios from 'axios'
import { downLoad } from '@/utils/upload'

export default {
  name: 'test',
  data() {
    return {
      href: ''
    }
  },
  created() {
    /* console.log(process.env.NODE_ENV)
     console.log(axios.defaults)
     // http://localhost:9528/api/chengpinyoudepot/excel/template
     if (process.env.NODE_ENV === 'development') {
       this.href = window.location.origin + '/api' + '/chengpinyoudepot/excel/template'
     } else {
       this.href = window.location.origin + '/chengpinyoudepot/excel/template'
     }*/

    this.href = downLoad('/chengpinyoudepot/excel/template')
    // this.chengpinDownLoad()
  },
  methods: {
    handleFileChange(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      chengpinUpload(formData).then((res) => {

      })
    },
    chengpinDownLoad() {
      chengpinDownLoad().then((res) => {
        this.href = res
        console.log(this.href)

      })
    }
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>
