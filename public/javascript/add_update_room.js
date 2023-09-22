let newRoom = document.querySelector('.room-info > h2');

if (newRoom.innerText === 'Add new room') newRoom = true; else newRoom = false;

const roomType = document.querySelectorAll('.room-type > button');
const roomTypeInput = document.querySelectorAll('.room-type > input');

let prevRoomType = null;

for (let i = 0; i < roomTypeInput.length; i ++) {
    if (roomTypeInput[i].checked) prevRoomType = roomType[i];
}

for (let i = 0; i < roomType.length; i ++) {
    roomType[i].onclick = () => {
        prevRoomType.classList.remove('active');

        roomTypeInput[i].click();
        roomType[i].classList.add('active');
        prevRoomType = roomType[i];
    };
}

const placeType = document.querySelectorAll('.place-type > button');
const placeTypeInput = document.querySelectorAll('.place-type > input');

let prevPlaceType = null;

for (let i = 0; i < placeTypeInput.length; i ++) {
    if (placeTypeInput[i].checked) prevPlaceType = placeType[i];
}

for (let i = 0; i < placeType.length; i ++) {
    placeType[i].onclick = () => {
        prevPlaceType.classList.remove('active');

        placeTypeInput[i].click();
        placeType[i].classList.add('active');
        prevPlaceType = placeType[i];
    };
}

const countInput = document.querySelectorAll('.room-basic-info > div > div > input');

const guestCount = document.getElementById('guest-count');
const removeGuest = document.getElementById('remove-guest');
const addGuest = document.getElementById('add-guest');

removeGuest.onclick = () => {
    if (countInput[0].value > 1) {
        guestCount.innerText = (-- countInput[0].value);
    }
};

addGuest.onclick = () => {
    if (countInput[0].value < 16) {
        guestCount.innerText = (++ countInput[0].value);
    }
};

const bedroomCount = document.getElementById('bedroom-count');
const removeBedroom = document.getElementById('remove-bedroom');
const addBedroom = document.getElementById('add-bedroom');

removeBedroom.onclick = () => {
    if (countInput[1].value > 1) {
        bedroomCount.innerText = (-- countInput[1].value);
    }
};

addBedroom.onclick = () => {
    if (countInput[1].value < 12) {
        bedroomCount.innerText = (++ countInput[1].value);
    }
};

const bedCount = document.getElementById('bed-count');
const removeBed = document.getElementById('remove-bed');
const addBed = document.getElementById('add-bed');

removeBed.onclick = () => {
    if (countInput[2].value > 1) {
        bedCount.innerText = (-- countInput[2].value);
    }
};

addBed.onclick = () => {
    if (countInput[2].value < 12) {
        bedCount.innerText = (++ countInput[2].value);
    }
};

const bathroomCount = document.getElementById('bathroom-count');
const removeBathroom = document.getElementById('remove-bathroom');
const addBathroom = document.getElementById('add-bathroom');

removeBathroom.onclick = () => {
    if (countInput[3].value > 1) {
        bathroomCount.innerText = (-- countInput[3].value);
    }
};

addBathroom.onclick = () => {
    if (countInput[3].value < 12) {
        bathroomCount.innerText = (++ countInput[3].value);
    }
};

const roomFacility = document.querySelectorAll('.room-facility > button');
const roomFacilityInput = document.querySelectorAll('.room-facility > input');

for (let i = 0; i < roomFacility.length; i ++) {
    roomFacility[i].onclick = () => {
        roomFacilityInput[i].click();
        roomFacility[i].classList.toggle('active');
    };
}

const roomDescription = document.querySelectorAll('.room-description > button');
const roomDescriptionInput = document.querySelectorAll('.room-description > input');

for (let i = 0; i < roomDescription.length; i ++) {
    roomDescription[i].onclick = () => {
        roomDescriptionInput[i].click();
        roomDescription[i].classList.toggle('active');
    };
}

const textarea = document.getElementsByTagName('textarea');

for (const area of textarea) {
    area.oninput = () => {
        area.value = area.value.replace(/  +/g, ' ');
    };
}

const address = document.getElementsByClassName('address');

for (const _address of address) {
    _address.oninput = () => {
        _address.value = _address.value.replace(/\s\s+/g, ' ');
    };
}

const pincode = document.getElementById('pincode');

pincode.oninput = () => {
    pincode.value = pincode.value.replace(/[^0-9]/g, '').trim();
};

const price = document.querySelector('.room-price > input');
const pricePen = document.querySelector('.room-price > i');

pricePen.onclick = () => {
    price.focus();
    price.selectionStart = price.selectionEnd = price.value.length;
};

price.oninput = () => {
    let pass = 3, string = price.value.replace(/[^0-9]/g, '').trim();

    if (string[0] === '0') string = string.substr(1);

    if (string.length === 0) string = '0';
    else {
        for (let i = string.length - 1; i >= 0; i --, pass --) {
            if (pass === 0) {
                string = string.substr(0, i+1) + ',' + string.substr(i+1);
                pass = 2;
            }
        }
    }

    price.value = string;
};

const discount = document.querySelector('.room-discount > input');
const discountPen = document.querySelector('.room-discount > i');

discountPen.onclick = () => {
    discount.focus();
    discount.selectionStart = discount.selectionEnd = discount.value.length;
};

discount.oninput = () => {
    let off = discount.value.replace(/[^0-9]/g, '').trim();

    if (off[0] === '0') off = off.substr(1);

    if (off.length === 0) off = '0';
    else if (Number(off) > 50) off = 50;

    discount.value = off;
};

const availableFrom = document.getElementById('available-from');
const availableUpto = document.getElementById('available-upto');

let d = new Date();

d.setDate(d.getDate() + 1);

availableFrom.min = d.toISOString().split('T')[0];

d.setDate(d.getDate() + 1);

availableUpto.min = d.toISOString().split('T')[0];

d.setDate(d.getDate() - 1);
d.setFullYear(d.getFullYear() + 1);

availableFrom.max = d.toISOString().split('T')[0];

d.setDate(d.getDate() + 1);

availableUpto.max = d.toISOString().split('T')[0];

availableFrom.onchange = () => {
    if (availableFrom.value >= availableUpto.value) {
        d = new Date(availableFrom.value);

        availableUpto.value = new Date(d.setDate(d.getDate() + 1)).toISOString().split('T')[0];
    }
};

availableUpto.onchange = () => {
    if (availableFrom.value >= availableUpto.value) {
        d = new Date(availableUpto.value);

        availableFrom.value = new Date(d.setDate(d.getDate() - 1)).toISOString().split('T')[0];
    }
};

const roomImageButton = document.getElementById('room-image-button');
const roomImageInput = document.querySelector('#room-image-button > input');
const roomImagePreview = document.getElementById('room-image-preview');

roomImageButton.onclick = () => {
    roomImageInput.click();
};

const hiddenRoomImageInput = document.querySelector('.room-image-box > div > div > input');

const updateHiddenRoomImageInput = () => {
    const dataTransfer = new DataTransfer();

    for (const file of hiddenRoomImageInput.files) {
        dataTransfer.items.add(file);
    }

    for (const file of roomImageInput.files) {
        if (dataTransfer.items.length < 8) {
            dataTransfer.items.add(file);
        } else {
            roomImageInput.disabled = true;
        }
    }

    hiddenRoomImageInput.files = dataTransfer.files;
};

const deleteImageFile = (index) => {
    const dataTransfer = new DataTransfer();

    for (let i = 0; i < hiddenRoomImageInput.files.length; i ++) {
        if (i != index) {
            dataTransfer.items.add(hiddenRoomImageInput.files[i]);
        }
    }

    hiddenRoomImageInput.files = dataTransfer.files;
    roomImageInput.disabled = false;
};

const getImage = (files) => {
    let limit = (8 - roomImagePreview.childElementCount);

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.avif|\.apng|\.jfif|\.pjpeg|\.pjp|\.svg|\.tif|\.tiff|\.bmp)$/i;

    for (let i = 0; i < Math.min(files.length, limit); i ++) {
        if (allowedExtensions.test(files[i].name)) {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(files[i]);

            fileReader.onloadend = () => {
                const imageBox = document.createElement('div');
                const image = document.createElement('img');
                const removeImageButton = document.createElement('button');

                imageBox.classList.add('image-box');

                image.src = fileReader.result;

                removeImageButton.type = 'button';
                removeImageButton.title = 'delete';

                removeImageButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

                imageBox.append(image);
                imageBox.append(removeImageButton);

                roomImagePreview.append(imageBox);

                removeImageButton.onclick = () => {
                    const parent = removeImageButton.parentNode.parentNode;

                    const index = Array.prototype.indexOf.call(parent.children, removeImageButton.parentNode);

                    deleteImageFile(index);

                    removeImageButton.parentNode.remove();
                };
            };
        }
    }

    updateHiddenRoomImageInput();
    roomImageInput.value = '';
};

const removeImageButton = document.querySelectorAll('.image-box > button');

for (let i = 0; i < removeImageButton.length; i ++) {
    removeImageButton[i].onclick = () => {
        const parent = removeImageButton[i].parentNode.parentNode;

        const index = Array.prototype.indexOf.call(parent.children, removeImageButton[i].parentNode);

        deleteImageFile(index);

        removeImageButton[i].parentNode.remove();
    };
}

roomImageInput.onchange = () => {
    getImage(roomImageInput.files);
};

const disableButton = (button) => {
    button.disabled = true;
    button.innerHTML = `<div class="loading-dot"></div>`;
    button.classList.toggle('deactivate');
};

const enableButton = (button) => {
    button.disabled = false;
    button.innerHTML = `Continue`;
    button.classList.toggle('deactivate');
};

const keywords = document.getElementById('keywords');

keywords.oninput = () => {
    keywords.value = keywords.value.replace(/\s\s+/g, ' ');
};