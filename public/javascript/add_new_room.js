const roomIdInput = document.getElementById('room-id');

const generateNewRoomId = async () => {
    let result = await fetch('/api/rooms/roomId');

    result = await result.json();

    const roomIds = [];

    for (const element of result) roomIds.push(element.roomId);

    const generateRoomId = () => {
        const digits = '123456789';

        let num = '';

        for (let i = 0; i < 6; i ++) {
            num += digits.charAt(Math.floor(Math.random() * 9));
        }

        return Number(num);
    };

    let newRoomId;

    do {
        newRoomId = generateRoomId();
    } while (roomIds.includes(newRoomId));

    roomIdInput.value = newRoomId;
};

generateNewRoomId();

const form = document.getElementsByTagName('form')[0];
const submit = document.getElementById('submit');

submit.onclick = async () => {
    if (form.checkValidity() === true) {
        disableButton(submit);

        const formData = new FormData(form);

        let result = await fetch('/host/rooms/add', {
            method: 'POST',
            body: formData
        });

        if (result.ok) {
            localStorage.setItem('action', 'created');
            window.location.replace('/host/dashboard');
        }
        else {
            result = await result.json();
            console.error(result);
            enableButton(submit);
        }
    }
};