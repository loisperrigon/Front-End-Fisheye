import MediaFactory from '../classes/MediaFactory.js';
import ModalContact from '../classes/ModalContact.js';
import Photographer from '../classes/Photographer.js';
import DataManager from '../classes/DataManager.js';

const select = document.querySelector(".filtres");
const mediasSection = document.querySelector(".imageVideoSection");
const sectionBaniere = document.querySelector(".photograph-header");

//Stats bar
const likesStatBar = document.querySelector(".likes");
const priceStatBar = document.querySelector(".price");

//Modal
const mediaFactory = new MediaFactory();

//Bdd requete etc..
var dataManager = new DataManager();

var photographerObj //Variable Globale Objet photographe

//Reinstanciation de l'objet pour recuper les fonctions associees


async function getPhotographer() {
  const objetJSON = localStorage.getItem("objetData"); // Pour une local session

  //Si les donnees sont deja stocker dans une local session
  if (objetJSON !== null) {
    var element = JSON.parse(objetJSON);

    return new Photographer(element.name, element.id, element.city, element.country, element.tagline, element.price, element.portrait, element.media);
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));


    var data = await dataManager.getData();
    const photographer = data.photographers.find(photographer => photographer.id === id);
    const media = data.media.filter(media => media.photographerId === id);

    return new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.tagline, photographer.price, photographer.portrait, media);
  }

}

function createTemplate(media) {
  media.forEach((media, index) => {
    media.index = index + 2;  //Car l'index commence a 2 pour la galerie media 1 etant la banierre

    if (media.image) {
      const templatePhoto = mediaFactory.createMedia("photo");
      mediasSection.appendChild(templatePhoto.render(media));
    } else if (media.video) {
      const templateVideo = mediaFactory.createMedia("video");
      mediasSection.appendChild(templateVideo.render(media));
    }
  }
  );

}


function createTemplateBaniere(photographer) {
  sectionBaniere.appendChild(photographer.templateBaniere());
}

function createTemplateStatsBar(likesTotal, price) {
  likesStatBar.textContent = `${likesTotal}`;

  priceStatBar.textContent = `${price}€/jour`;
}

function createTemplateContact(name) {
  var modalContact = new ModalContact(name);
}


select.addEventListener("change", function () {
  const selectedValue = select.value;

  switch (selectedValue) {
    case "populaire":
      photographerObj.media.sort(decroissantLikes);
      mediasSection.innerHTML = "";
      createTemplate(photographerObj.media);
      break;
    case "date":
      photographerObj.media.sort(croissantDate);
      mediasSection.innerHTML = "";
      createTemplate(photographerObj.media);
      break;
    case "titre":
      photographerObj.media.sort(croissantTitre);
      mediasSection.innerHTML = ""; //Renitialise a la fermeture.
      createTemplate(photographerObj.media);
      break;
    default:
      // Code à exécuter lorsque "Choisissez une option" est sélectionné
      break;
  }

});


async function init() {
  photographerObj = await getPhotographer();
  createTemplateBaniere(photographerObj);
  createTemplate(photographerObj.media);
  createTemplateStatsBar(photographerObj.likesTotal, photographerObj.price);
  createTemplateContact(photographerObj.name)
}


init();

