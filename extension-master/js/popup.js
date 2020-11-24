if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',handleButton);
} else {
    handleButton();
}

function handleButton(){
    var isOn = parseInt(localStorage.getItem('periscope_isOn')) || 0;
    localStorage.setItem('periscope_isOn', isOn);
    const buttonEl =document.getElementById("on_off")
    console.log(isOn)
    if (parseInt(isOn))
          {buttonEl.classList.add("btn-primary")}
     else { 
         buttonEl.classList.remove("btn-primary")
        }
    buttonEl.addEventListener("click", function () {
        if (parseInt(isOn)) {
            isOn = 0;
            localStorage.setItem('periscope_isOn', isOn)
            buttonEl.classList.remove("btn-primary")
        } else {
            isOn = 1;
            localStorage.setItem('periscope_isOn', isOn)
            buttonEl.classList.add("btn-primary")
        }

    })
}
