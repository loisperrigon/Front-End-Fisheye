import Photographer from '../classes/Photographer.js';
let photographers = [];

async function getPhotographers() {
  const jsonPath = 'data/photographers.json';

  try {
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error('La requête a échoué avec un statut ' + response.status);
    }
    else {
      const data = await response.json();
      return data; // Retourne les donnees
    }
  } catch (error) {
    console.error('Une erreur s\'est produite:', error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}


function createObjPhotographers(data) {
  const photographers = [];
  var media = [];
  data.photographers.forEach((element) => {  //On prend juste les donnees des photographers
    media = data.media.filter(elementMedia => elementMedia.photographerId === parseInt(element.id)); //On recupere les medias des photographers
    photographers.push(new Photographer(element.name, element.id, element.city, element.country, element.tagline, element.price, element.portrait, media));
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
    const data = await getPhotographers();
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

function updatePhotographe(curentIndex, photographers) {
  closePhotographe();
  lauchPhotographe(photographers[curentIndex]);
}

document.addEventListener('keydown', function (event) {

  MAXPHOTOGRAPHER = photographers.length;

  switch (event.key) {
    case 'Tab':
      event.preventDefault();
      curentIndex = event.shiftKey
        ? (curentIndex > 0 ? curentIndex - 1 : MAXPHOTOGRAPHER - 1)
        : (curentIndex < MAXPHOTOGRAPHER - 1 ? curentIndex + 1 : 0);
      break;

    case 'ArrowUp':
      curentIndex = curentIndex >= 3
        ? curentIndex - 3
        : (curentIndex === 0 ? MAXPHOTOGRAPHER - 3 : MAXPHOTOGRAPHER - 1);
      break;

    case 'ArrowDown':
      curentIndex = curentIndex <= MAXPHOTOGRAPHER - 4
        ? curentIndex + 3
        : (curentIndex === MAXPHOTOGRAPHER - 1 ? 0 : curentIndex + 1);
      break;

    case 'ArrowRight':
      curentIndex = curentIndex < MAXPHOTOGRAPHER - 1 ? curentIndex + 1 : 0;
      break;

    case 'ArrowLeft':
      curentIndex = curentIndex > 0 ? curentIndex - 1 : MAXPHOTOGRAPHER - 1;
      break;

    case 'Enter':
      if (curentIndex !== -1) {
        photographers[curentIndex].openWindowPhotographer();
      }
      break;

    case 'Escape':
      closePhotographe();
      break;
  }

  // Appeler updatePhotographe uniquement si la touche n'était pas "Escape"
  if (event.key !== 'Escape') {
    updatePhotographe(curentIndex, photographers);
  }
});


const photographersSection = document.querySelector(".photographerSection");
const focusPhotographe = document.querySelector(".focusPhotographe");
var curentIndex = -1;
photographers = await init(photographers);









