import {hideFeedback} from "./nav";

export async function setupFeedback() {
  const $feedback = document.getElementById('feedback');

  $feedback.querySelector('.back')
      .addEventListener('click', hideFeedback);

  $feedback.querySelector('form').addEventListener('submit', submitForm);

  function submitForm() {
  }
}
