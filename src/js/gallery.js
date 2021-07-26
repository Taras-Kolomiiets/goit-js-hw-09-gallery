import galleryItems from './app';

const modalContainer = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxImg = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay');
const galleryContainer = document.querySelector('.js-gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
};

function onGalleryContainerClick(event) {
  closeModalBtn.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowsKeyPress);

  event.preventDefault();

  const currentImg = event.target.dataset.source;
  const currentDecription = event.target.alt;

  if (event.target.nodeName === 'IMG') {
    modalContainer.classList.add('is-open');
      lightboxImg.setAttribute('src', `${currentImg}`);
      lightboxImg.setAttribute('alt', `${currentDecription}`);
  }
}

function onCloseModal() {
  closeModalBtn.removeEventListener('click', onCloseModal);

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowsKeyPress);

  modalContainer.classList.remove('is-open');
  lightboxImg.setAttribute('src', '');
  lightboxImg.setAttribute('alt', '');
}

function onBackdropClick(event) {
  backdrop.removeEventListener('click', onBackdropClick);

  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onArrowsKeyPress(event) {
  const leftArrow = 'ArrowLeft';
  const rightArrow = 'ArrowRight';

  const currentIndex = galleryItems.findIndex(item => item.original === lightboxImg.src);

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  if (event.code !== leftArrow && event.code !== rightArrow)
    return;

  if (event.code === leftArrow && prevIndex >= 0) {
    lightboxImg.setAttribute('src', `${galleryItems[prevIndex].original}`);
    lightboxImg.setAttribute('alt', `${galleryItems[prevIndex].description}`);
    return lightboxImg;
  }

  if (event.code === rightArrow && nextIndex < galleryItems.length) {
    lightboxImg.setAttribute('src', `${galleryItems[nextIndex].original}`);
    lightboxImg.setAttribute('alt', `${galleryItems[nextIndex].description}`);
    return lightboxImg;
  }
}