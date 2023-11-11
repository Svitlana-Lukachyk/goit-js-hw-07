import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');
const imagesMarkup = createGalleryMarkup(galleryItems);
galleryList.insertAdjacentHTML('beforeend', imagesMarkup);

function createGalleryMarkup(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </li>`;})
    .join('');
}

galleryList.addEventListener('click', onGalleryListClick);

function onGalleryListClick (evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }

    const originalImgUrl = evt.target.dataset.source;

    const instance = basicLightbox.create(`
        <img src="${originalImgUrl}" width="800" height="600">
    `,
        {
        onShow: (instance) => {
            document.addEventListener('keydown', onEscKeyPress);
        },
        onClose: (instance) => {
            document.removeEventListener('keydown', onEscKeyPress);
        }
    }
    );
    instance.show();

    function onEscKeyPress(evt) {
    if (evt.code !== 'Escape') return;

    instance.close();
    };
}

console.log(galleryItems);