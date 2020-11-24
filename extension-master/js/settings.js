if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
} else {
    afterDOMLoaded();
}


function afterDOMLoaded() {
	const btnUp = document.getElementById('btn-up');
	const btnDown = document.getElementById('btn-down');
	console.log(btnDown)

	btnUp.addEventListener('click', e => {
		handleBtnClick('up')
	});

	btnDown.addEventListener('click', e => {
		handleBtnClick('down')
	});

    const securityType = localStorage.getItem('periscope_security_type')
    let currentMenuItem = parseInt(securityType) || 0;

    const menus = document.querySelectorAll('.submarine-selector')
    menus[currentMenuItem].classList.add('selected')

	function handleBtnClick(type) {
		console.log(type)
		if (type === 'down') {
			if (currentMenuItem === menus.length - 1) {
				currentMenuItem = 0
			} else {
				currentMenuItem++
			}
		} else {
			if (currentMenuItem === 0) {
				currentMenuItem = menus.length - 1
			} else {
				currentMenuItem--
			}
        }
		menus.forEach(el => el.classList.remove('selected'))
		console.log(menus, currentMenuItem)
        menus[currentMenuItem].classList.add('selected')
        localStorage.setItem('periscope_security_type', currentMenuItem)
    }
}

