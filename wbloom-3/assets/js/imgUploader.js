import { user } from './firebase.js';
document.querySelectorAll('form').forEach(function (element) {
    element.parentNode.removeChild(element);
});
