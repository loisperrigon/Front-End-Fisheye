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

        this.title = document.createElement('span');
        this.likes = document.createElement('span');
        this.img = document.createElement( 'img' );
    }

    template(){
         
    }

    addEventclick(element,likes){

        element.addEventListener('click', function() {
            likes.textContent = parseInt(likes.textContent)+1;
          });

    }
    

    render(section,idPhotographe,title,imageSrc,likes){
        this.template();
        this.picture += idPhotographe + "/"+imageSrc;
        this.img.setAttribute("src", this.picture);
        this.img.setAttribute("alt", title);
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
        this.addEventclick(divLikes,this.likes)



        divTitreLikes.appendChild(divLikes);
        this.article.appendChild(this.img);
        this.article.appendChild(divTitreLikes);
        section.appendChild(this.article);
        
    }
}

class TemplatePhoto extends Template{
    template(){
        
        this.article.classList.add("photo");                        
       
    }

}
class TemplateVideo extends Template{
    template(){
        this.article.classList.add("video");               
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