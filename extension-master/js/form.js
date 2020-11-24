if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',handleForm);
} else {
    handleForm();
}

function handleForm() {
    const form = document.getElementById('dmtform');
    const screen = document.getElementById('screen');

    form.addEventListener('submit', (e) => {
        screen.classList.add('visible')
    });
}