importScripts(
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/qna@1.0.2/dist/qna.min.js'
);

let modelPromise = null;

async function init() {
  await tf.setBackend('cpu');
  await tf.ready();
  modelPromise = qna.load();
}

init();

self.onmessage = async (event) => {
  const { question, passage } = event.data;

  if (!modelPromise) {
    self.postMessage({ error: 'Model not loaded yet' });
    return;
  }

  try {
    const model = await modelPromise;
    const answers = await model.findAnswers(question, passage);
    self.postMessage({ answers });
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};