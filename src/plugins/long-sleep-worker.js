/* eslint-disable */
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

addEventListener('message', async (event) => {
  const sleepTime = event.data.message.sleep;
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const { file } = event.data.message.data;
  await sleep(sleepTime);
  postMessage({ message: 'Loading ffmeg-core.js', video: null });
  await ffmpeg.load();
  postMessage({ message: 'Start transcoding', video: null });
  ffmpeg.FS('writeFile', 'test.avi', await fetchFile(file));
  await ffmpeg.run('-i', 'test.avi', 'test.mp4');
  postMessage({ message: 'Complete transcoding', video: null });
  const data = ffmpeg.FS('readFile', 'test.mp4');
  const video = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  postMessage({ message: 'Done', video: video });
  
});