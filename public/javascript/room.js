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

const dropdownMenu = document.querySelector('.dropdown-menu');

window.onclick = (event) => {
    if (event.target.matches('.show-menu')) {
        dropdownMenu.classList.toggle('hide');
    } else {
        dropdownMenu.classList.add('hide');
    }
};

const checkInDate = document.querySelector('.check-in-date > input');
const checkOutDate = document.querySelector('.check-out-date > input');

const getRequiredDate = (startingDate, days) => {
    const date = new Date(startingDate);

    return new Date(date.setDate(date.getDate() + days)).toISOString().split('T')[0];
};

checkInDate.min = getRequiredDate(checkInDate.min, 0);
checkInDate.max = getRequiredDate(checkInDate.max, -1);
checkInDate.value = getRequiredDate(checkInDate.min, 0);

checkOutDate.min = getRequiredDate(checkInDate.min, 1);
checkOutDate.max = getRequiredDate(checkInDate.max, 0);
checkOutDate.value = getRequiredDate(checkInDate.value, 3);

// ensures that check-in date is always before the check-out date & vice-versa.
// also checks the range between check-in & check-out date is at max 30 days.

checkInDate.onchange = () => {
    if (checkInDate.value >= checkOutDate.value) {
        checkOutDate.value = getRequiredDate(checkInDate.value, 1);
    } else if (calculateDaysBetweenDates(checkInDate.value, checkOutDate.value) > 30) {
        checkOutDate.value = getRequiredDate(checkInDate.value, 30);
    }

    updateTotalStayDays(checkInDate.value, checkOutDate.value);
};

checkOutDate.onchange = () => {
    if (checkInDate.value >= checkOutDate.value) {
        checkInDate.value = getRequiredDate(checkOutDate.value, -1);
    } else if (calculateDaysBetweenDates(checkInDate.value, checkOutDate.value) > 30) {
        checkInDate.value = getRequiredDate(checkOutDate.value, -30);
    }

    updateTotalStayDays(checkInDate.value, checkOutDate.value);
};

// this function converts price into easily readable string with commas

const convertIntoReadablePrice = (cost) => {
    let gap = 3;

    cost = cost.toString();

    for (let i = cost.length - 1; i >= 0; i --, gap --) {
        if (gap === 0) {
            cost = cost.substr(0, i+1) + ',' + cost.substr(i+1);

            gap = 2;
        }
    }

    return cost;
};

// converting room-price set by room-owner into number

let roomPrice = document.getElementsByClassName('service')[0].innerText;

roomPrice = Number.parseInt(roomPrice.replace(/\D/g,''));

const dayCount = document.getElementsByClassName('day-count')[0];

const roomServiceFee = document.getElementById('room-service-fee');

const calculateRoomServiceFee = (roomPrice, stayDays) => {
    roomServiceFee.innerHTML = `&#8377; ${convertIntoReadablePrice(roomPrice * stayDays)}`;
};

// this function calculates number of days between two dates

const calculateDaysBetweenDates = (fromDate, uptoDate) => {
    return ((new Date(uptoDate).getTime() - new Date(fromDate).getTime()) / (1000 * 3600 * 24));
};

// cleaning & maintainance fee = 2% of room-price set by room-owner

const cleaningFee = document.getElementById('cleaning-fee');

cleaningFee.innerHTML = `&#8377; ${convertIntoReadablePrice(Math.round(0.025 * roomPrice))}`;

// airbnb service fee = 10% of room-price set by room-owner;

const airbnbServiceFee = document.getElementById('airbnb-service-fee');

airbnbServiceFee.innerHTML = `&#8377; ${convertIntoReadablePrice(Math.round(0.1 * roomPrice))}`;

const totalRoomCost = document.getElementsByClassName('charge')[0];

const calculateTotalRoomCost = (roomPrice, stayDays) => {
    totalRoomCost.innerHTML = `&#8377 ${convertIntoReadablePrice(Math.round(roomPrice * (0.125 + stayDays)))}`;
};

// this function updates the count of days the guest is going to stay

const updateTotalStayDays = (checkInValue, checkOutValue) => {
    const stayDays = calculateDaysBetweenDates(checkInValue, checkOutValue);

    dayCount.innerText = stayDays;

    calculateRoomServiceFee(roomPrice, stayDays);
    calculateTotalRoomCost(roomPrice, stayDays);
}

updateTotalStayDays(checkInDate.value, checkOutDate.value);

const removeGuestButton = document.getElementsByClassName('less-button')[0];
const addGuestButton = document.getElementsByClassName('more-button')[0];

const guestCount = document.getElementsByClassName('count')[0];
const maxGuestCount = Number.parseInt(document.getElementsByClassName('info')[0].innerText.replace(' guests', ''));

removeGuestButton.onclick = () => {
    const num = Number.parseInt(guestCount.innerText.trim());

    if (num > 1) guestCount.innerText = (num - 1);
};

addGuestButton.onclick = () => {
    const num = Number.parseInt(guestCount.innerText.trim());

    if (num < maxGuestCount) guestCount.innerText = (num + 1);
};

const reserve = document.getElementById('reserve');

const disableReserveButton = () => {
    reserve.disabled = true;
    reserve.style.cursor = 'not-allowed';
    reserve.innerHTML = `<div class="loading-dot"></div>`;
    reserve.style.border = 'none';
    reserve.style.backgroundImage = 'radial-gradient( circle at center, #faf0fa 0%, #e6dceb 27.5%, #e3dcdc 40%, #d7d2e6 57.5%, #bdc8dc 75%, #bdc8c8 100% )';
};

const enableReserveButton = () => {
    reserve.disabled = false;
    reserve.style.cursor = 'pointer';
    reserve.innerHTML = `Reserve`;
    reserve.style.border = '1px solid #ff385c';
    reserve.style.backgroundImage = 'radial-gradient( circle at center, #ff385c 0%, #e61e4d 27.5%, #e31c5f 40%, #d70466 57.5%, #bd1e59 75%, #bd1e59 100% )';
};

reserve.onclick = () => {
    disableReserveButton();
};

const snackbar = document.getElementsByClassName('snackbar')[0];

if (localStorage.getItem('login') === true) {
    snackbar.classList.add('display');

    setTimeout(() => {
        snackbar.classList.remove('display');
    }, 7000);

    localStorage.removeItem('user');
}