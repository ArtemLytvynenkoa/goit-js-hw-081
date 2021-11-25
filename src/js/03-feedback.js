import Throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let feedbackFormData = {};

    
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', Throttle(onFormInput, 500));

repairFormsData();

function onFormInput(evt) {
    feedbackFormData[evt.target.name] = evt.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormData));
};

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
    evt.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    feedbackFormData = {};
};

function repairFormsData() {
    const saveFeedbackFormData = localStorage.getItem('feedback-form-state');
    const parsedFeedbackFormData = JSON.parse(saveFeedbackFormData);
    if (parsedFeedbackFormData) {
        form.email.value = parsedFeedbackFormData.email;
        form.message.value = parsedFeedbackFormData.message;

        if (!parsedFeedbackFormData.email) {
            form.email.value = '';
        };
        if (!parsedFeedbackFormData.message) {
            form.message.value = '';
        }
        
    };
    feedbackFormData = { ...parsedFeedbackFormData };
}