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
      return photographer;
    }

    function createTemplateBaniere(photographer){
      
    }
    

    async function init(){
        var idPhotographer = getVarURL();
        var data = await getAllPhotographer(); 
        var photographer = getPhotographer(idPhotographer, data.photographers);
        createTemplateBaniere(photographer);
        var imageVideoPhotographer = getImageVideoPhotographer(idPhotographer,data.media);
        createTemplate(imageVideoPhotographer);


    }

    const imageVideoSection = document.querySelector(".imageVideoSection");
    const template = new TemplateFactory();
    init();
 