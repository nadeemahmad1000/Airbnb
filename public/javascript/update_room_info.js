const roomImages = document.querySelectorAll('.image-box > img');

const seperatNameFromExt = (str) => {
    const file = str.split('/').pop();
    return [file.substr(0, file.lastIndexOf('.')), file.substr(file.lastIndexOf('.') + 1, file.length)]
}

const getImageName = (name) => {
    name[0] = name[0].substr(0, name[0].lastIndexOf('_'));

    return (name[0] + '.' + name[1]);
};

const oldImages = [];
const dataTransfer = new DataTransfer();

const getFilesFromStorage = async () => {
    for (const image of roomImages) {
        const src = image.src.split('%2F')[2].split('?')[0];

        oldImages.push(src);

        const fileName = seperatNameFromExt(src);

        const result = await fetch(image.src);
        const blob = await result.blob();

        const file = new File([blob], getImageName(fileName),
        { type: `image/${fileName[1]}` });

        dataTransfer.items.add(file);
    }
};

getFilesFromStorage().then(() => {
    hiddenRoomImageInput.files = dataTransfer.files;
});

const form = document.getElementsByTagName('form')[0];
const submit = document.getElementById('submit');

submit.onclick = async () => {
    if (form.checkValidity() === true) {
        disableButton(submit);

        const roomId = document.getElementById('room-id').value;

        const formData = new FormData(form);

        formData.append('oldFiles', JSON.stringify(oldImages));

        let result = await fetch(`/host/rooms/update/${roomId}`, {
            method: 'PUT',
            body: formData
        });

        if (result.ok) {
            localStorage.setItem('action', 'updated');
            window.location.replace('/host/dashboard');
        }
        else {
            result = await result.json();
            console.error(result);
        }
    }
};