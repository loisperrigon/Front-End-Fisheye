
class Template {

    constructor() {
        this.picture = `assets/images/`;
        this.article = document.createElement('article');
        this.videoImage = "";

        this.title = document.createElement('span');
        this.likes = document.createElement('span');
    }

    template() {

    }

    addEventlikesclick(element, likes) {

        element.addEventListener('click', function () {
            likes.textContent = parseInt(likes.textContent) + 1;
        });

    }

    addEventClick(element, title, index) {
        element.addEventListener('click', function () {
            console.log(index);
            openVisioPhoto(element.cloneNode(true), title, index); // clone pour eviter les conflit true pour cloner également les enfants
        });
    }




    render(section, idPhotographe, title, imageSrc, likes, index) {
        this.template();
        this.article.classList.add("videoPhoto");
        this.article.setAttribute("tabindex", index);
        this.picture += idPhotographe + "/" + imageSrc;
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
        this.addEventlikesclick(divLikes, this.likes);
        this.addEventClick(this.videoImage, title, index);


        divTitreLikes.appendChild(divLikes);
        this.article.appendChild(this.videoImage);
        this.article.appendChild(divTitreLikes);
        section.appendChild(this.article);


    }
}

class TemplatePhoto extends Template {
    template() {
        this.videoImage = document.createElement('img');

    }

}
class TemplateVideo extends Template {

    template() {
        this.videoImage = document.createElement('video');
        this.videoImage.type = 'video/mp4'; // Spécifiez le type MIME du fichier vidéo
        this.videoImage.controls = true
        this.videoImage.autoplay = true;
        this.videoImage.loop = true;
        this.article.appendChild(this.videoImage);
    }
}

class TemplateFactory {
    createMedia(type) {
        switch (type) {
            case "video":
                return new TemplateVideo();
            case "photo":
                return new TemplatePhoto();
            default:
                throw new Error("Type de modèle inconnu.");
        }
    }
}