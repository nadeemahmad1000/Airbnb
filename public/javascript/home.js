if (window !== null) {
    const logo = document.getElementById('airbnb');

    if (logo !== null) {
        window.onresize = () => {
            if (document.body.clientWidth > 1024) {
                logo.src = '../public/images/airbnb_large.svg';
            } else {
                logo.src = '../public/images/airbnb_small.svg';
            }
        };
    }
}

const dropdownMenu = document.querySelector('.dropdown-menu');

window.addEventListener('click', (event) => {
    if (event.target.matches('.show-menu')) {
        dropdownMenu.classList.toggle('hide');
    } else if (!dropdownMenu.classList.contains('hide')) {
        dropdownMenu.classList.add('hide');
    }
});

const scrollLeftButton = document.getElementsByClassName('caret')[0];
const scrollRightButton = document.getElementsByClassName('caret')[1];

const typeContainer = document.getElementsByClassName('room-types')[0];

const typeScrollWidth = (typeContainer.scrollWidth / 7);

scrollLeftButton.onclick = () => {
    if (typeContainer.scrollLeft <= typeScrollWidth) {
        scrollLeftButton.style.display = 'none';
    }

    typeContainer.scrollLeft -= typeScrollWidth;
};

scrollRightButton.onclick = () => {
    if (typeContainer.scrollLeft < typeScrollWidth) {
        scrollLeftButton.style.display = 'flex';
    }

    typeContainer.scrollLeft += typeScrollWidth;
};

let prev = 0;

const roomTypeButton = document.querySelectorAll('.type-option');
const roomTypeImage = document.querySelectorAll('.type-image');
const roomTypeInput = document.querySelectorAll('.room-types > input');

for (let curr = 0; curr < roomTypeButton.length; curr ++) {
    roomTypeButton[curr].onclick = () => {
        roomTypeInput[curr].click();

        roomTypeButton[prev].classList.remove('active-type');
        roomTypeImage[prev].classList.remove('active-image');

        roomTypeButton[curr].classList.add('active-type');
        roomTypeImage[curr].classList.add('active-image');

        prev = curr;
    }
}

const snackbar = document.getElementsByClassName('snackbar')[0];

if (localStorage.getItem('login') === 'true') {
    snackbar.classList.add('display');

    setTimeout(() => {
        snackbar.classList.remove('display');
    }, 7000);

    localStorage.removeItem('user');
}