# TENSORFLOW-QNA-WORKER

## Description

This is a simple browser-based [TENSORFLOW.JS] **Web Worker** playground. 

## Technologies

This project uses the following open source libraries and technologies:

  * [TENSORFLOW.JS] - TensorFlow.js for running ML models in the browser  
  * [QNA-MODEL] - TensorFlow.js pretrained Question-Answering model  
  * [WEB WORKERS] - Browser Web Workers API for multithreading  
  * [JAVASCRIPT] - Vanilla JavaScript for main thread and worker code  

[TENSORFLOW.JS]: <https://www.tensorflow.org/js>  
[QNA-MODEL]: <https://github.com/tensorflow/tfjs-models/tree/master/qna>  
[WEB WORKERS]: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API>  
[JAVASCRIPT]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript>

## Usage

1. Include `webworker.js` in your project and start a Worker from your main thread JavaScript.

2. Send a message to the worker with a JSON object containing `question` and `passage` fields.

3. The worker responds asynchronously with the model's answers.

Example communication in main thread:

```js
const worker = new Worker('webworker.js');

worker.onmessage = (event) => {
  if(event.data.error) {
    console.error('Error:', event.data.error);
  } else {
    console.log('Answers:', event.data.answers);
  }
};

worker.postMessage({
  question: 'What is TensorFlow.js?',
  passage: 'TensorFlow.js is a JavaScript library for machine learning.'
});
