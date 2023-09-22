const modalOverlay = document.getElementsByClassName('modal-overlay')[0];

const room = document.getElementsByClassName('room');
const roomId = document.getElementsByClassName('room-id');
const roomType = document.getElementsByClassName('room-type');
const roomTitle = document.getElementsByClassName('room-title');

const modalAdvice = document.getElementById('modal-advice');
const modalRoomType = document.getElementById('modal-room-type');
const modalRoomTitle = document.getElementById('modal-room-title');
const modalRoomId = document.getElementById('modal-room-id');

let currIndex = 0;

const displayModal = (index, advice) => {
    currIndex = index;

    modalAdvice.innerText = advice;
    modalRoomType.innerText = roomType[index].innerText;
    modalRoomTitle.innerText = roomTitle[index].innerText;
    modalRoomId.innerText = roomId[index].innerText;

    modalOverlay.classList.remove('hide');
    document.getElementsByTagName('header')[0].style.pointerEvents = 'none';
    document.getElementsByTagName('main')[0].style.pointerEvents = 'none';
    document.getElementsByTagName('footer')[0].style.pointerEvents = 'none';
};

const closeModal = () => {
    modalOverlay.classList.add('hide');
    document.getElementsByTagName('header')[0].style.pointerEvents = 'all';
    document.getElementsByTagName('main')[0].style.pointerEvents = 'all';
    document.getElementsByTagName('footer')[0].style.pointerEvents = 'all';
};

const disableButton = (button, className) => {
    button.disabled = true;
    button.innerHTML = `<div class="loading-dot"></div>`;
    button.classList.remove(className);
    button.classList.add('deactivate');
};

const enableButton = (button, buttonIcon, buttonText, className) => {
    button.disabled = false;
    button.innerHTML = (buttonIcon + ` ` + buttonText);
    button.classList.remove('deactivate');
    button.classList.add(className);
};

const roomInformation = document.getElementsByClassName('room-information');
const roomVisibility = document.getElementsByClassName('room-visibility');

for (let i = 0; i < roomVisibility.length; i ++) {
    roomVisibility[i].onclick = async () => {
        const hidden = (roomInformation[i].classList.contains('blur'));

        let result = await fetch('/host/rooms/visibility', {
            method: 'PATCH',
            body: JSON.stringify({
                'roomId': Number(roomId[i].innerText.trim()),
                'hidden': !hidden
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (result.ok) {
            roomInformation[i].classList.toggle('blur');
        } else {
            result = await result.json();
            console.error(result);
        }

        if (hidden) {
            enableButton(roomVisibility[i], `<i class="fa-solid fa-eye-slash"></i>`, `Hide`, `visible-room`);
        } else {
            enableButton(roomVisibility[i], `<i class="fa-solid fa-eye"></i>`, `Show`, `visible-room`);
        }
    };
}

// functions to delete room from Airbnb

const getButtonMessage = (index) => {
    if (roomVisibility[index].innerText.trim() === `Hide`) {
        return `You can choose to hide it instead. Your hidden rooms won't be visible to other Airbnb users until you choose to show.`;
    } else {
        return `Your room is already hidden from Airbnb users. You can choose to update it or let it be hidden as long as you want without deleting.`;
    }
};

const deleteRoomButton = document.getElementsByClassName('delete-room');

for (let i = 0; i < deleteRoomButton.length; i ++) {
    deleteRoomButton[i].onclick = () => {
        displayModal(i, getButtonMessage(i));
    };
}

const confirmDeleteRoom = document.getElementById('confirm-delete-room');

confirmDeleteRoom.onclick = async () => {
    disableButton(confirmDeleteRoom, `delete-room`);

    const currRoomId = Number(roomId[currIndex].innerText.trim());

    const roomImages = room[currIndex].getElementsByClassName('room-image');

    let oldImages = [];

    for (const image of roomImages) {
        oldImages.push(image.src.split('%2F')[2].split('?')[0]);
    }

    oldImages = JSON.stringify(oldImages);

    let result = await fetch(`/host/rooms/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
            'roomId': currRoomId,
            'oldFiles': oldImages
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    enableButton(confirmDeleteRoom, `<i class="fa-solid fa-trash-can"></i>`, `Delete`, `delete-room`);

    closeModal();

    if (result.ok) {
        localStorage.setItem('action', 'deleted');
        location.reload();
    } else {
        result = await result.json();
        console.error(result)
    }
};

// function to close modal

const closeModalButton = document.getElementById('close');

closeModalButton.onclick = () => {
    closeModal();
};

const snackbar = document.getElementsByClassName('snackbar')[0];
const snackbarMessage = document.querySelector('.snackbar > span');

const action = localStorage.getItem('action');

if (action !== null) {
    if (action === 'created') {
        snackbarMessage.innerText = `Added new room successfully!`;
    } else if (action === 'updated') {
        snackbarMessage.innerText = `Room info updated successfully!`;
    } else {
        snackbarMessage.innerText = `Deleted a room successfully!`;
    }

    snackbar.classList.add('display');

    setTimeout(() => {
        snackbar.classList.remove('display');
    }, 7000);

    localStorage.removeItem('action');
}