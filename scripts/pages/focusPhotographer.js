import MediaFactory from '../classes/MediaFactory.js';
import ModalContact from '../classes/ModalContact.js';

const select = document.querySelector(".filtres");
const mediasSection = document.querySelector(".imageVideoSection");
const sectionBaniere = document.querySelector(".photograph-header");
const titleContact = document.querySelector(".titreModal");
//Stats bar
const likesStatBar = document.querySelector(".likes");
const priceStatBar = document.querySelector(".price");

//Modal
const mediaFactory = new MediaFactory();




//Obj Photographe
import Photographer from '../classes/Photographer.js';
const objetJSON = sessionStorage.getItem("objetData"); // Pour sessionStorage
var photographerObj = JSON.parse(objetJSON);

//Reinstanciation de l'objet pour recuper les fonctions associees
photographerObj = new Photographer(photographerObj.name, photographerObj.id, photographerObj.city, photographerObj.country, photographerObj.tagline, photographerObj.price, photographerObj.portrait, photographerObj.media);

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


function init() {
  createTemplateBaniere(photographerObj);
  createTemplate(photographerObj.media);
  createTemplateStatsBar(photographerObj.likesTotal, photographerObj.price);
  createTemplateContact(photographerObj.name)
}


init();

