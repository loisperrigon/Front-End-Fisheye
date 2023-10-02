
const select = document.querySelector(".filtres");
const imageVideoSection = document.querySelector(".imageVideoSection");
const sectionBaniere = document.querySelector(".photograph-header");
const sectionBaniereDescription = document.querySelector(".photographe");

const template = new TemplateFactory();
var photographerTabImageVideo;


//Obj Photographe
import Photographer from '../classes/Photographer.js';
const objetJSON = sessionStorage.getItem("objetData"); // Pour sessionStorage
var photographerObj = JSON.parse(objetJSON);

//Reinstanciation de l'objet pour recuper les fonction associe
photographerObj = new Photographer(photographerObj.name, photographerObj.id, photographerObj.city, photographerObj.country, photographerObj.tagline, photographerObj.price, photographerObj.portrait, photographerObj.media);



function getImageVideoPhotographer(idPhotographer, imageVideoAllPhotographer) {
  const imageVideoPhotographer = imageVideoAllPhotographer.filter(element => element.photographerId === parseInt(idPhotographer));
  return imageVideoPhotographer;
}

function createTemplate(imageVideoPhotographer) {
  var index = 0;
  imageVideoPhotographer.forEach((imagephoto) => {
    if (imagephoto.image) {
      const templatePhoto = template.createMedia("photo");
      templatePhoto.render(imageVideoSection, imagephoto.photographerId, imagephoto.title, imagephoto.image, imagephoto.likes, index);
    } else if (imagephoto.video) {
      const templateVideo = template.createMedia("video");
      templateVideo.render(imageVideoSection, imagephoto.photographerId, imagephoto.title, imagephoto.video, imagephoto.likes, index);
    }

    index += 1;
  }
  );

}



function createTemplateBaniere(photographer) {
  sectionBaniere.appendChild(photographerObj.templateBaniere());
}


select.addEventListener("change", function () {
  const selectedValue = select.value;

  switch (selectedValue) {
    case "populaire":
      console.log(photographerTabImageVideo);
      photographerTabImageVideo.sort(decroissantLikes);
      imageVideoSection.innerHTML = "";
      createTemplate(photographerTabImageVideo);
      break;
    case "date":
      photographerTabImageVideo.sort(croissantDate);
      imageVideoSection.innerHTML = "";
      createTemplate(photographerTabImageVideo);
      break;
    case "titre":
      photographerTabImageVideo.sort(croissantTitre);
      imageVideoSection.innerHTML = ""; //Renitialise a la fermeture.
      createTemplate(photographerTabImageVideo);
      break;
    default:
      // Code à exécuter lorsque "Choisissez une option" est sélectionné
      break;
  }
});


function init() {
  createTemplateBaniere(photographerObj);
  photographerTabImageVideo = getImageVideoPhotographer(photographerObj.id, photographerObj.media);
  createTemplate(photographerTabImageVideo);
}



init();

