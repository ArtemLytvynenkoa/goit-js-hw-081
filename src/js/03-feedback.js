import Throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const feedbackFormData = {};
   

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', Throttle(onFormInput, 500));

repairFormsData();

function onFormInput(evt) {
    feedbackFormData[evt.target.name] = evt.target.value;

    localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormData));
};

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
};

function repairFormsData() {
    const saveFeedbackFormData = localStorage.getItem('feedback-form-state');
    const parsedFeedbackFormData = JSON.parse(saveFeedbackFormData);
    
    if (parsedFeedbackFormData) {
        form.email.value = parsedFeedbackFormData.email;
        form.message.value = parsedFeedbackFormData.message;
    };
    if (parsedFeedbackFormData.email === undefined || parsedFeedbackFormData.message) {
        form.email.value = '';
        form.message.value = parsedFeedbackFormData.message;
    };
    if (parsedFeedbackFormData.email || parsedFeedbackFormData.message === undefined) {
        form.email.value = parsedFeedbackFormData.email;
        form.message.value = '';
    }
}