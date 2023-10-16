import LightBox from './LightBox.js';


class Template {

    constructor() {
        this.pathMedia = `assets/images/`;
        this.article = document.createElement('article');
        this.title = document.createElement('span');
        this.likes = document.createElement('span');
        this.divLikes = document.createElement('div');
        this.divTitreLikes = document.createElement('div');
        this.coeur = document.createElement('i');
        this.lightBox = new LightBox(); //Cree un instance de lightbox 
        this.increment = false;

        this.statsBarLikes = document.querySelector(".likesTotal");
    }

    template() {

    }

    incrementLikesStatsbar(increment) {
        this.statsBarLikes.textContent = parseInt(this.statsBarLikes.textContent) + increment;
    }

    incrementLikesMedia(textContentLikes, element) {
        if (this.increment === false) {
            this.increment = true;
            element.likes += 1;
            this.incrementLikesStatsbar(1);
        }
        else {
            this.increment = false;
            element.likes -= 1;
            this.incrementLikesStatsbar(-1);
        }

        textContentLikes.textContent = element.likes;
    }


    addEventlikesclick(divLikes, textContentLikes, element) {

        divLikes.addEventListener('keydown', (event) => {
            // Vérifie si la touche pressée est différente de la touche "Tab"
            if (event.key === 'Enter') {
                this.incrementLikesMedia(textContentLikes, element);
            }
        });

        divLikes.addEventListener('click', () => {
            this.incrementLikesMedia(textContentLikes, element);
        });
    }

    addEventClick(videoImage, element) {

        videoImage.addEventListener('keydown', (event) => {

            if (event.key === 'Enter') {
                this.lightBox.initialize(videoImage.cloneNode(true), element.title, element.index);
                this.lightBox.affichageLightBox();
            }
        });

        videoImage.addEventListener('click', () => {
            this.lightBox.initialize(videoImage.cloneNode(true), element.title, element.index)
            this.lightBox.affichageLightBox();
        });
    }

    render(element) {
        this.template(element);

        this.divLikes = document.createElement('div');

        this.title.textContent = element.title;
        this.likes.textContent = element.likes;

        this.videoImage.setAttribute("src", this.pathMedia);
        this.videoImage.setAttribute("alt", element.title);

        this.article.classList.add("videoPhoto");
        this.divTitreLikes.classList.add("titreLikes");
        this.divLikes.classList.add("likes");
        this.coeur.classList.add("fa-solid", "fa-heart");

        this.article.setAttribute("tabindex", element.index);
        this.videoImage.setAttribute("tabindex", element.index + 0.1);
        this.title.setAttribute("tabindex", element.index + 0.2);
        this.divLikes.setAttribute("tabindex", element.index + 0.3);

        this.addEventlikesclick(this.divLikes, this.likes, element);
        this.addEventClick(this.videoImage, element);

        this.divTitreLikes.appendChild(this.title);
        this.divLikes.appendChild(this.likes);
        this.divLikes.appendChild(this.coeur);
        this.divTitreLikes.appendChild(this.divLikes);
        this.article.appendChild(this.videoImage);
        this.article.appendChild(this.divTitreLikes);

        return this.article;
    }
}

class TemplatePhoto extends Template {
    template(element) {
        this.videoImage = document.createElement('img');
        this.pathMedia += element.photographerId + "/" + element.image;

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
        this.pathMedia += element.photographerId + "/" + element.video;

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

