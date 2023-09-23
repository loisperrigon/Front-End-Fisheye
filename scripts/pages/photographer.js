function getVarURL(){
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idPhotographer = params.get('idPhotographe')
    return idPhotographer
}

async function getAllPhotographer() {
    const jsonPath = 'data/photographers.json';

    try {
        const response = await fetch(jsonPath);
    
        if (!response.ok) {
          throw new Error('La requête a échoué avec un statut ' + response.status);
        }
        else{
            const data = await response.json();
            return data; // Retourne le tableau des photographes
        }
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
        return []; // Retourne un tableau vide en cas d'erreur
      }
    }

    function getImageVideoPhotographer(idPhotographer,imageVideoAllPhotographer){
        const imageVideoPhotographer = imageVideoAllPhotographer.filter(element => element.photographerId === parseInt(idPhotographer));
        return imageVideoPhotographer;
    }

    function createTemplate(imageVideoPhotographer){
        imageVideoPhotographer.forEach((imagephoto) => {
            if (imagephoto.image) {
                const templatePhoto = template.createTemplate("photo");
                templatePhoto.render(imageVideoSection,imagephoto.photographerId,imagephoto.title,imagephoto.image,imagephoto.likes);
              } else if (imagephoto.video) {
                const templateVideo = template.createTemplate("video");
                templateVideo.render(imageVideoSection,imagephoto.photographerId,imagephoto.title,imagephoto.video,imagephoto.likes);
              }
        }
        );

    }

    function getPhotographer(idPhotographer,AllPhotographer){
      const photographer = AllPhotographer.filter(element => element.id === parseInt(idPhotographer));
      return photographer[0]; //Car on recupere un tableau avec un seul element qui est lui meme un tableau
    }

    function createTemplateBaniere(photographer){

        const picture = `assets/photographers/${photographer.portrait}`;

        const h2 = document.createElement( 'h2' );                          
        h2.textContent = photographer.name;
        const h3 = document.createElement('h3');
        h3.textContent = photographer.city + " "+ photographer.country;
        const h4 = document.createElement('h4');
        h4.textContent = photographer.tagline;
        sectionBaniereDescription.appendChild(h2);
        sectionBaniereDescription.appendChild(h3);
        sectionBaniereDescription.appendChild(h4);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", photographer.name);   
        sectionBaniere.appendChild(img);
        
    }
    

    async function init(){
        var idPhotographer = getVarURL();
        var data = await getAllPhotographer(); 
        var photographer = getPhotographer(idPhotographer, data.photographers);
        createTemplateBaniere(photographer);
        var imageVideoPhotographer = getImageVideoPhotographer(idPhotographer,data.media);
        createTemplate(imageVideoPhotographer);


    }

    const imageVideoSection = document.querySelector(".imageVideoSection")
    const sectionBaniere = document.querySelector(".photograph-header")
    const sectionBaniereDescription = document.querySelector(".photographe")
    const template = new TemplateFactory();
    init();
 