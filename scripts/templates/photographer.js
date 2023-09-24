

function photographerTemplate(data,index) {
    const { name,id, portrait,city,country,tagline,price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        var article = document.createElement( 'article' );
        article.setAttribute("id",id);
        article.classList.add("photographe");   
        article.setAttribute("tabindex",index);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement( 'h2' );                          
        h2.textContent = name;

        const h3 = document.createElement('h3');
        h3.textContent = city + " "+ country;

        const h4 = document.createElement('h4');
        h4.textContent = tagline;

        const h5 = document.createElement('h5');
        h5.textContent = price+"€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);

        return (article);
    }
    return { name, picture, getUserCardDOM }

}

class Template{

    constructor() {
        this.picture = `assets/images/`;
        this.article = document.createElement('article');
        this.videoImage = "";

        this.title = document.createElement('span');
        this.likes = document.createElement('span');
    }

    template(){
         
    }

    addEventlikesclick(element,likes){

        element.addEventListener('click', function() {
            likes.textContent = parseInt(likes.textContent)+1;
          });

    }

    addEventClick(element,title){
        element.addEventListener('click', function() {
            element.focus(); 
            var index = document.activeElement.tabIndex; //on recupere l'index pour la navigation 
            openVisioPhoto(element.cloneNode(true),title, index); // clone pour eviter les conflit true pour cloner également les enfants
          });
    }
    

    render(section,idPhotographe,title,imageSrc,likes,index){
        this.template();
        this.article.classList.add("videoPhoto");  
        this.article.setAttribute("tabindex",index);
        
        this.picture += idPhotographe + "/"+imageSrc;
        console.log(this.picture)
        this.videoImage.setAttribute("src", this.picture);
        this.videoImage.setAttribute("alt", title);
        const divTitreLikes = document.createElement('div');
        divTitreLikes.classList.add("titreLikes");   
        const divLikes = document.createElement('div');
        divLikes.classList.add("likes");   
  
        this.title.textContent = title;
        this.likes.textContent = likes;
        divTitreLikes.appendChild(this.title);
        divLikes.appendChild(this.likes);
        const coeur = document.createElement('i');
        coeur.classList.add("fa-solid", "fa-heart");   
        divLikes.appendChild(coeur);
        this.addEventlikesclick(divLikes,this.likes);
        this.addEventClick(this.videoImage,title);


        divTitreLikes.appendChild(divLikes);
        this.article.appendChild(this.videoImage);
        this.article.appendChild(divTitreLikes);
        section.appendChild(this.article);
        
        
    }
}

class TemplatePhoto extends Template{
    template(){
        this.videoImage = document.createElement('img');                   
       
    }

}
class TemplateVideo extends Template{

    template(){
        this.videoImage = document.createElement('video');
        this.videoImage.type = 'video/mp4'; // Spécifiez le type MIME du fichier vidéo
        this.videoImage.controls = true
        this.videoImage.autoplay = true; 
        this.videoImage.loop = true;
        this.article.appendChild(this.videoImage);
    }
}

class TemplateFactory{
    createTemplate(type){
        switch(type){
            case "video":
                return new TemplateVideo();
            case "photo":
                return new TemplatePhoto();
            default:
                throw new Error("Type de modèle inconnu.");
        }
    }
}