if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleButton);
} else {
    handleButton();
}

function handleButton() {
    const submarine = document.getElementById('submarine');
    console.log(submarine)
    var isOn = parseInt(localStorage.getItem('periscope_isOn')) || 0;
    localStorage.setItem('periscope_isOn', isOn);
    const buttonEl = document.getElementById("on_off")
    console.log(isOn)
    if (parseInt(isOn)) {
        buttonEl.classList.add("btn-primary");
        submarine.classList.add("floating");
    } else {
        buttonEl.classList.remove("btn-primary")
        submarine.classList.add("hidden")
    }
    buttonEl.addEventListener("click",  () => {
        if (parseInt(isOn)) {
            isOn = 0;
            localStorage.setItem('periscope_isOn', isOn)
            buttonEl.classList.remove("btn-primary")
            submarine.classList.remove("floating")
            submarine.classList.add("hidden")
        } else {
            isOn = 1;
            submarine.classList.remove("hidden")
            submarine.classList.add("falling")
            localStorage.setItem('periscope_isOn', isOn)
            buttonEl.classList.add("btn-primary")
            setTimeout(() => {
                submarine.classList.add("floating")
            }, 6000);
        }

    })
}
