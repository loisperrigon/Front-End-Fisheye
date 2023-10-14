import Photographer from '../classes/Photographer.js';
import DataManager from '../classes/DataManager.js';

var dataManager = new DataManager();

let photographers = [];


function createObjPhotographers(data) {
  const photographers = [];
  var media = [];
  data.photographers.forEach((element) => {  //On prend juste les donnees des photographers
    media = data.media.filter(elementMedia => elementMedia.photographerId === parseInt(element.id)); //On recupere les medias des photographers
    var photographer = new Photographer(element.name, element.id, element.city, element.country, element.tagline, element.price, element.portrait, media)
    photographers.push(photographer);
  });

  return photographers;
}


function displayData(photographers) {

  photographers.forEach((element, index) => {
    element.index = index;
    photographersSection.appendChild(element.templatePhotographes());
  });

}


async function init(photographers) {
  try {
    // Récupère les datas des photographes
    const data = await dataManager.getData();
    photographers = createObjPhotographers(data);
    displayData(photographers);

    return photographers;

  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'initialisation:', error);
  }
}


function lauchPhotographe(photographers) {

  focusPhotographe.appendChild(photographers.templateFocus());
  focusPhotographe.style.opacity = 1;
  photographersSection.style.filter = 'blur(10px)';

}

function closePhotographe() {

  focusPhotographe.innerHTML = "";
  focusPhotographe.style.opacity = 0;
  photographersSection.style.filter = 'none';

}

function updatePhotographe(currentIndex, photographers) {
  closePhotographe();
  lauchPhotographe(photographers[currentIndex]);
}

document.addEventListener('keydown', function (event) {
  var MAXPHOTOGRAPHER = photographers.length;

  var colCount = 3; // nombre de colone

  switch (event.key) {
    case 'Tab':
      event.preventDefault();
      currentIndex = event.shiftKey
        ? (currentIndex - 1 < 0 ? MAXPHOTOGRAPHER - 1 : currentIndex - 1)
        : (currentIndex + 1 >= MAXPHOTOGRAPHER ? 0 : currentIndex + 1);
      break;

    case 'ArrowUp':
      currentIndex = currentIndex - colCount < 0
        ? MAXPHOTOGRAPHER - (colCount - (currentIndex % colCount))
        : currentIndex - colCount;
      break;

    case 'ArrowDown':
      currentIndex = currentIndex + colCount >= MAXPHOTOGRAPHER
        ? currentIndex % colCount
        : currentIndex + colCount;
      break;

    case 'ArrowRight':
      currentIndex = currentIndex + 1 >= MAXPHOTOGRAPHER ? 0 : currentIndex + 1;
      break;

    case 'ArrowLeft':
      currentIndex = currentIndex - 1 < 0 ? MAXPHOTOGRAPHER - 1 : currentIndex - 1;
      break;

    case 'Enter':
      if (currentIndex !== -1) {
        photographers[currentIndex].openWindowPhotographer();
      }
      break;

    case 'Escape':
      closePhotographe();
      break;
  }

  // Appeler updatePhotographe uniquement si la touche n'était pas "Escape"
  if (event.key !== 'Escape') {
    updatePhotographe(currentIndex, photographers);
  }
});



const photographersSection = document.querySelector(".photographerSection");
const focusPhotographe = document.querySelector(".focusPhotographe");
var currentIndex = -1;
photographers = await init(photographers);









