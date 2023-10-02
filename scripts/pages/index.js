import Photographer from '../classes/Photographer.js';



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

  //Ajout evenement au clic d'un photographe.

  const photographeDom = document.querySelectorAll(".photographe");
  tabPhotographe = photographeDom;
  photographeDom.forEach((people, index) => {
    people.addEventListener("click", () => photographers[index].openWindowPhotographer(photographers[index]));
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



document.addEventListener('keydown', function (event) {
  switch (event.key) {

    case 'Tab':
      event.preventDefault();
      if (event.shiftKey) {
        if (curentIndex > 0) {
          // Lancez le photographe suivant
          curentIndex -= 1;
        }
        else {
          curentIndex = tabPhotographe.length - 1;
        }
        break
      }
      if (curentIndex < tabPhotographe.length - 1) {
        // Lancez le photographe suivant
        curentIndex += 1;
      }
      else {
        curentIndex = 0;
      }
      break;

    case 'ArrowUp':
      if (curentIndex >= 3) {
        // Lancez le photographe suivant
        curentIndex -= 3;
      }
      else {
        i = 0 - curentIndex
        if (i === 0) {
          curentIndex = tabPhotographe.length - 3;
        }
        else if (i === -1) {
          curentIndex = tabPhotographe.length - 2;
        }
        else {
          curentIndex = tabPhotographe.length - 1;
        }
      }
      break;
    case 'ArrowDown':
      if (curentIndex <= tabPhotographe.length - 4) {
        // Lancez le photographe suivant
        curentIndex += 3;
      }
      else {
        i = tabPhotographe.length - curentIndex
        if (i === 3) {
          curentIndex = 0;
        }
        else if (i === 2) {
          curentIndex = 1;
        }
        else {
          curentIndex = 2;
        }
      }
      break;


    case 'ArrowRight':
      if (curentIndex <= tabPhotographe.length - 2) {
        // Lancez le photographe suivant
        curentIndex += 1;
      }
      else {
        curentIndex = 0;
      }
      break;

    case 'ArrowLeft':
      if (curentIndex > 0) {
        // Lancez le photographe suivant.
        curentIndex -= 1;
      }
      else {
        curentIndex = tabPhotographe.length - 1;
      }
      break;

    case 'Enter':
      if (curentIndex !== -1) {
        openPageFocusPhotographe(tabPhotographe[curentIndex].getAttribute('id'));
      }

  }

  closePhotographe();
  tabPhotographe[curentIndex].focus();
  lauchPhotographe(photographers[curentIndex]);

});

const photographersSection = document.querySelector(".photographerSection");
const focusPhotographe = document.querySelector(".focusPhotographe");
var curentIndex = -1;
var tabPhotographe;
var photographers = [];
photographers = await init(photographers);









