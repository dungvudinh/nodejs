const imageInput = document.querySelector('input[name="image_url"]');
const image = document.querySelector('.image');
imageInput.addEventListener('change', (e) => {
    image.src = URL.createObjectURL(e.target.files[0]);
});
