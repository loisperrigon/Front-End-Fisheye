
const select = document.querySelector(".filtres");
const imageVideoSection = document.querySelector(".imageVideoSection");
const sectionBaniere = document.querySelector(".photograph-header");
const sectionBaniereDescription = document.querySelector(".photographe");

const mediaFactory = new MediaFactory();
var photographerTabImageVideo;


//Obj Photographe
import Photographer from '../classes/Photographer.js';
const objetJSON = sessionStorage.getItem("objetData"); // Pour sessionStorage
var photographerObj = JSON.parse(objetJSON);

//Reinstanciation de l'objet pour recuper les fonction associe
photographerObj = new Photographer(photographerObj.name, photographerObj.id, photographerObj.city, photographerObj.country, photographerObj.tagline, photographerObj.price, photographerObj.portrait, photographerObj.media);


function createTemplate(media) {
  media.forEach((media, index) => {
    media.index = index;  //Rajout de l'index sur le media

    if (media.image) {
      const templatePhoto = mediaFactory.createMedia("photo");
      imageVideoSection.appendChild(templatePhoto.render(media));
    } else if (media.video) {
      const templateVideo = mediaFactory.createMedia("video");
      imageVideoSection.appendChild(templateVideo.render(media));
    }
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
      photographerObj.media.sort(decroissantLikes);
      imageVideoSection.innerHTML = "";
      createTemplate(photographerObj.media);
      break;
    case "date":
      photographerObj.media.sort(croissantDate);
      imageVideoSection.innerHTML = "";
      createTemplate(photographerObj.media);
      break;
    case "titre":
      photographerObj.media.sort(croissantTitre);
      imageVideoSection.innerHTML = ""; //Renitialise a la fermeture.
      createTemplate(photographerObj.media);
      break;
    default:
      // Code à exécuter lorsque "Choisissez une option" est sélectionné
      break;
  }

  console.log(photographerObj.media)
});


function init() {
  createTemplateBaniere(photographerObj);
  createTemplate(photographerObj.media);
}



init();

