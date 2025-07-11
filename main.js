const worker = new Worker('qna.js');

const askBtn = document.getElementById('ask');
const passageEl = document.getElementById('passage');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');

askBtn.addEventListener('click', () => {
  const passage = passageEl.value.replaceAll('\n', ' '); 
  const question = questionEl.value.replaceAll('\n', ' ');

  answerEl.value = 'Thinking...';

  worker.postMessage({ question, passage });
});

worker.onmessage = (event) => {
  if (event.data.error) {
    answerEl.value = `Error: ${event.data.error}`;
  } else if (event.data.answers) {
    const best = event.data.answers[0];
    if (best) {
      answerEl.value = `${best.text} (confidence: ${best.score.toFixed(2)})`;
    } else {
      answerEl.value = 'No answer found.';
    }
  }
};
