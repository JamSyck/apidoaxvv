const entry = document.getElementById("alink")
const icon = document.getElementById("icon")
const currentURL = window.location.origin
const address = `${currentURL}/api/characters`
icon.addEventListener('click', () => {
    navigator.clipboard.writeText(address)
    .then(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Copied to clipboard"
        });
    })
    .catch(err => {
        alert('There was an error copying the text', err)
    })
})
window.onload = function () {
    entry.textContent = address
}