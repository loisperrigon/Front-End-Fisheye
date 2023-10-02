import LightBox from './LightBox.js';

const lightBox = new LightBox();

class Template {

    constructor() {
        this.mediasRoot = `assets/images/`;
        this.article = document.createElement('article');
        this.videoImage = "";
        this.title = document.createElement('span');
        this.likes = document.createElement('span');
    }

    template() {

    }

    addEventlikesclick(divLikes, textContentLikes, element) {

        divLikes.addEventListener('click', function () {
            element.likes += 1;
            textContentLikes.textContent = element.likes;
        });

    }

    addEventClick(videoImage, element) {
        videoImage.addEventListener('click', function () {
            lightBox.initLightBox(videoImage.cloneNode(true), element.title, element.index)
            lightBox.affichageLightBox();
        });
    }

    render(element) {
        this.template(element);
        this.article.classList.add("videoPhoto");
        this.article.setAttribute("tabindex", element.index);
        this.videoImage.setAttribute("src", this.mediasRoot);
        this.videoImage.setAttribute("alt", element.title);
        const divTitreLikes = document.createElement('div');
        divTitreLikes.classList.add("titreLikes");
        const divLikes = document.createElement('div');
        divLikes.classList.add("likes");

        this.title.textContent = element.title;
        this.likes.textContent = element.likes;
        divTitreLikes.appendChild(this.title);
        divLikes.appendChild(this.likes);
        const coeur = document.createElement('i');
        coeur.classList.add("fa-solid", "fa-heart");
        divLikes.appendChild(coeur);
        this.addEventlikesclick(divLikes, this.likes, element);
        this.addEventClick(this.videoImage, element);
        divTitreLikes.appendChild(divLikes);
        this.article.appendChild(this.videoImage);
        this.article.appendChild(divTitreLikes);


        return this.article;
    }
}

class TemplatePhoto extends Template {
    template(element) {
        this.videoImage = document.createElement('img');
        this.mediasRoot += element.photographerId + "/" + element.image;

    }

}
class TemplateVideo extends Template {

    template(element) {
        this.videoImage = document.createElement('video');
        this.videoImage.type = 'video/mp4'; // Spécifiez le type MIME du fichier vidéo
        this.videoImage.controls = true
        this.videoImage.autoplay = true;
        this.videoImage.loop = true;
        this.article.appendChild(this.videoImage);
        this.mediasRoot += element.photographerId + "/" + element.video;

    }
}

export default class MediaFactory {
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

