document.addEventListener("DOMContentLoaded", function() {
  const infoIcon = document.getElementById("info-icon");

  infoIcon.addEventListener("click", function() {
    openModal(prepareQuizInfoHtml());
  });
});

const prepareQuizInfoHtml = () => {
  return `    
  <button id="close-button">&times;</button>
  <h2>Quiz Information</h2>
  <p>The more time passes during the quiz, the fewer points you'll get per question.</p>
  <p>The harder the difficulty settings, the higher the points you can get per question.</p>
  <p>Good luck!</p>`;
};

export function openModal(html) {
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = html;
  const modal = document.getElementById('modal-dialog');
  modal.showModal();

  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener('click', () => modal.close());
}
