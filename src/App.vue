<template>
  <video
    :src="video"
    controls
  />
  <br>
  <button @click="transcode">
    Start
  </button>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import myWorker from './plugins/worker';

export default defineComponent({
  name: 'App',
  setup() {
    // app state
    let message = ref('Click Start to Transcode');
    let video = ref(null);
    const file = process.env.NODE_ENV === 'production' ? '/vue-app/flame.avi' : '/flame.avi';

    onMounted(() => {
      myWorker.worker.onmessage = ({ data }) => {
        message.value = data.message;
        video.value = data.video
      };
    })
    // methods
    async function transcode() {
      myWorker.send({
        sleep: 10,
        data: file
      });
    }
    return {
      video,
      message,
      transcode
    };
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
