const logOut = document.getElementById('log-out');

if (logOut !== null) {
    logOut.onclick = async () => {
        let result = await fetch(`/logout`, {
            method: 'post'
        });

        if (result.ok) {
            location.reload();
        } else {
            result = await result.json();
            console.error(result);
        }
    };
}