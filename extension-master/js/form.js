import {Urls} from './util/urls.js'
import {Request} from './util/request.js'

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleForm);
} else {
    handleForm();
}

function sendMail() {
    const data = {
        reporterMail: document.getElementById('email').value,
        reporterName: document.getElementById('name').value,
        message: document.getElementById('comment').value,
        reporterPhoneNumber: document.getElementById('phone').value
    }
    const headers =  {
        'Content-Type': 'application/json;charset=utf-8',
        'Referer': "DNT-client"
    };
    Request.post(Urls.sendMail, headers, data)
        .then((data) => {
            console.log(data);
        })
}

function handleForm() {
    const form = document.getElementById('dmtform');
    const screen = document.getElementById('screen');

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        screen.classList.add('visible')
        sendMail();
    });
}
