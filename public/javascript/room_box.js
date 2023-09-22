// function to add / remove a room to / from user wishlist

const wishlist = document.getElementsByClassName('wishlist');

if (wishlist !== null) {
    for (let i = 0; i < wishlist.length; i ++) {
        wishlist[i].onclick = async () => {
            let result = await fetch(`/api/toggleWishlist`, {
                method: `PATCH`,
                body: JSON.stringify({
                    'roomId': roomId[i].innerText.trim(),
                    'add': !wishlist[i].classList.contains('loved')
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            wishlist[i].classList.toggle('loved');
        };
    }
}

const roomPreview = document.getElementsByClassName('room-preview');

const leftCaret = document.getElementsByClassName('left-caret');
const rightCaret = document.getElementsByClassName('right-caret');

for (let i = 0; i < roomPreview.length; i ++) {
    roomPreview[i].onmouseenter = () => {
        leftCaret[i].style.display = 'flex';
        rightCaret[i].style.display = 'flex';
    };

    roomPreview[i].onmouseleave = () => {
        leftCaret[i].style.display = 'none';
        rightCaret[i].style.display = 'none';
    };
}

window.onresize = () => {
    if (document.body.clientWidth < 1024) {
        for (let i = 0; i < roomPreview.length; i ++) {
            leftCaret[i].style.display = 'flex';
            rightCaret[i].style.display = 'flex';
        }
    } else {
        for (let i = 0; i < roomPreview.length; i ++) {
            leftCaret[i].style.display = 'none';
            rightCaret[i].style.display = 'none';
        }
    }
};

const slider = document.querySelectorAll('.room-preview > a');

for (let i = 0; i < leftCaret.length; i ++) {
    leftCaret[i].onclick = () => {
        slider[i].scrollLeft -= roomPreview[i].scrollWidth;
    };

    rightCaret[i].onclick = () => {
        slider[i].scrollLeft += roomPreview[i].scrollWidth;
    };
}