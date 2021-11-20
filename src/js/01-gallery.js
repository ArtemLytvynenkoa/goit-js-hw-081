import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createImgCardsMarkup(galleryItems);
const optionsLightBox = {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
};

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createImgCardsMarkup(galleryItems) {
   return  galleryItems.map(({ preview, original, description }) => {
       return `
            <a class="gallery__item" href="${original}">
                    <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        `;
    }).join("");
};

const lightbox = new SimpleLightbox(".gallery a", optionsLightBox);
