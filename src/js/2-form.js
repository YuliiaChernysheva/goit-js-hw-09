const STORAGE_KEY = 'feedback msg';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.message-textarea');
const emailInput = form.elements.email;

const formData = {
  email: '',
  message: '',
};

populateForm();

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted formData:', formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
}

function handleFormInput() {
  formData.email = emailInput.value.trim();
  formData.message = textarea.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedLSData = localStorage.getItem(STORAGE_KEY);
  if (!savedLSData) return;

  try {
    const dataFromLS = JSON.parse(savedLSData);
    formData.email = dataFromLS.email || '';
    formData.message = dataFromLS.message || '';
    emailInput.value = formData.email;
    textarea.value = formData.message;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
}
