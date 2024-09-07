document.addEventListener('DOMContentLoaded', function () {
    const girls = document.querySelectorAll('.girl');
    const address = window.location.origin
    girls.forEach(girl => {
        girl.addEventListener('click', function (event) {
            event.preventDefault();
            const id = girl.getAttribute('data-id')
            const name = girl.getAttribute('data-name');
            const photo = girl.getAttribute('data-photo');

            Swal.fire({
                title: name,
                imageUrl: photo,
                imageWidth: 400,
                imageHeight: 225,
                html: `<a class="btn btn-warning" href="${address}/character/${id}" target="_blank"><i class="bi bi-person-square"></i> Profile</a> <a class="btn btn-secondary" href="${address}/api/character/${id}" target="_blank"><i class="bi bi-filetype-json"></i> JSON</a>`,
                showConfirmButton: false,
                showCloseButton: true
            });
        });
    });
});