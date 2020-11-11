const worker = new Worker('./long-sleep-worker.js', { type: 'module' });

const send = (message) => worker.postMessage({
  message,
});

export default {
  worker,
  send,
};
