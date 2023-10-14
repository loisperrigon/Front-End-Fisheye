export default class LightBox {
    constructor() {
        this.element = 0;
        this.titleElement = 0;
        this.index = 0;
        this.title = null;
        this.media = null;
        this.lightBox = null;
        this.close = null;
        this.flecheDroite = null;
        this.flecheGauche = null;
        this.medias = [];
        this.maxMedia = 0;

        // Définissions des fonctions de rappel pour les gestionnaires d'événements
        this.closeClickHandler = () => this.closeLightBox();
        this.flecheDroiteClickHandler = () => this.flecheDroiteLightBox();
        this.flecheGaucheClickHandler = () => this.flecheGaucheLightBox();
        this.keydownHandler = (event) => this.handleKeydown(event);
    }

    initialize(element, titleElement, index) {
        this.element = element;
        this.titleElement = titleElement;
        this.index = index;
        this.medias = document.querySelectorAll(".videoPhoto");
        this.maxMedia = this.medias.length;

        // Initialise ici les propriétés qui nécessitent un élément réel du DOM
        this.title = document.querySelector(".title");
        this.media = document.querySelector(".imageVideoFull");
        this.lightBox = document.querySelector(".imageVideoFullScreen");
        this.close = document.querySelector(".close");
        this.flecheDroite = document.querySelector(".flecheDroite");
        this.flecheGauche = document.querySelector(".flecheGauche");

        // Ajout ici les gestionnaires d'événements en utilisant les fonctions de rappel
        this.close.addEventListener('click', this.closeClickHandler);
        this.flecheDroite.addEventListener('click', this.flecheDroiteClickHandler);
        this.flecheGauche.addEventListener('click', this.flecheGaucheClickHandler);
        document.addEventListener('keydown', this.keydownHandler);
    }

    affichageLightBox() {
        this.element.classList.add("imageVideoFocus");
        this.element.setAttribute("tabindex", this.index);
        this.element.focus();
        this.media.appendChild(this.element);
        this.lightBox.style.display = 'flex';
        this.title.textContent = this.titleElement;
    }

    closeLightBox() {
        this.close.removeEventListener('click', this.closeClickHandler);
        this.media.innerHTML = "";
        this.lightBox.style.display = 'none';
        this.removeEventListeners();
    }

    removeEventListeners() {
        this.close.removeEventListener('click', this.closeClickHandler);
        this.flecheDroite.removeEventListener('click', this.flecheDroiteClickHandler);
        this.flecheGauche.removeEventListener('click', this.flecheGaucheClickHandler);
        document.removeEventListener('keydown', this.keydownHandler);
    }

    handleKeydown(event) {
        if (event.key === 'ArrowRight') {
            this.flecheDroiteLightBox();
        } else if (event.key === 'ArrowLeft') {
            this.flecheGaucheLightBox();
        } else if (event.key === 'Escape') {
            this.closeLightBox();
        }
    }

    flecheDroiteLightBox() {
        if (this.index + 1 < this.maxMedia + 2) {  //car l'index commence a 2 pour les medias
            this.index += 1;
            this.flecheLightbox()
        }
    }

    flecheGaucheLightBox() {

        if (this.index - 1 >= 2) { //car l'index commence a 2 pour les medias
            this.index -= 1;
            this.flecheLightbox()
        }
    }

    flecheLightbox() {
        var element = this.rechercherElementIndex(this.medias, this.index);
        this.modificationMediaLightbox(element);
    }

    rechercherElementIndex(medias, index) {
        for (const element of medias) {
            if (element.tabIndex === index) {

                return element.cloneNode(true);
            }
        }
        return null;
    }

    modificationMediaLightbox(element) {

        this.media.innerHTML = "";
        var imgVideoElement = element.querySelector("img");
        if (imgVideoElement === null) {
            imgVideoElement = element.querySelector("video");
        }
        this.element = imgVideoElement;
        this.element.classList.add("imageVideoFocus");
        this.element.setAttribute("tabindex", this.index);

        this.title.textContent = element.querySelector("span").textContent;
        this.titleElement = this.title.textContent;
        this.media.appendChild(this.element);

    }


}







