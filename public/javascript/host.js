const hostsImage = document.getElementById('hosts-image');
const tableCell = document.querySelectorAll('.description-row > td');

window.onresize = () => {
    if (document.body.clientWidth > 768) {
        hostsImage.src = '../public/images/hosts_small.webp';

        for (const cell of tableCell) cell.colSpan = '1';
    } else {
        hostsImage.src = '../public/images/hosts_large.webp';

        for (const cell of tableCell) cell.colSpan = '3';
    }
};

const snackbar = document.getElementsByClassName('snackbar')[0];

if (localStorage.getItem('login') === true) {
    snackbar.classList.add('display');

    setTimeout(() => {
        snackbar.classList.remove('display');
    }, 7000);

    localStorage.removeItem('user');
}