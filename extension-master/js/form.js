if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleForm);
} else {
    handleForm();
}

async function postRequest(url, data) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

function sendMail() {
    const data = {
        reporterMail: document.getElementById('email').value,
        reporterName: document.getElementById('name').value,
        message: document.getElementById('comment').value,
        reporterPhoneNumber: document.getElementById('phone').value
    }
    postRequest(Urls.sendMail, data)
        .then((data) => {
            console.log(data);
        });

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
