export default class LightBox {
    constructor(element = 0, titleElement = 0, index = 0, medias = 0, maxMedia = 0) {
        this.element = element;
        this.titleElement = titleElement;
        this.index = index;
        this.title = document.querySelector(".title");
        this.media = document.querySelector(".imageVideoFull");
        this.lightBox = document.querySelector(".imageVideoFullScreen");
        this.close = document.querySelector(".close");
        this.flecheDroite = document.querySelector(".flecheDroite");
        this.flecheGauche = document.querySelector(".flecheGauche");
        this.medias = medias;
        this.maxMedia = maxMedia;
        //Evenement
        this.close.addEventListener('click', () => {
            this.closeLightBox();
        });

        this.flecheDroite.addEventListener('click', () => {
            this.flecheDroiteLightBox();
        });

        this.flecheGauche.addEventListener('click', () => {
            this.flecheGaucheLightBox();
        });

    }

    initLightBox(element, titleElement, index) {
        this.element = element;
        this.titleElement = titleElement;
        this.index = index;
        this.medias = document.querySelectorAll(".videoPhoto")
        this.maxMedia = this.medias.length
    }

    affichageLightBox() {
        this.element.classList.add("imageVideoFocus");
        this.element.setAttribute("tabindex", this.index);
        this.media.appendChild(this.element);
        this.lightBox.style.display = 'flex';
        this.title.textContent = this.titleElement;

    }

    closeLightBox() {
        this.close.removeEventListener('click', () => { //supression de l'evenement
            this.closeLightBox();
        });
        this.media.innerHTML = ""; //Renitialise a la fermeture.
        this.lightBox.style.display = 'none';
    }

    flecheDroiteLightBox() {

        if (this.index + 1 < this.maxMedia) {
            this.index += 1;
            var element = this.rechercherElementIndex(this.medias, this.index);
            this.modificationMediaLightbox(element, this.index);
        }
    }

    flecheGaucheLightBox() {

        if (this.index - 1 >= 0) {
            this.index -= 1;
            var element = this.rechercherElementIndex(this.medias, this.index);
            this.modificationMediaLightbox(element, this.index);
        }
    }

    rechercherElementIndex(medias, index) {
        for (const element of medias) {
            if (element.tabIndex === index) {

                return element.cloneNode(true);
            }
        }
        return null;
    }

    modificationMediaLightbox(element, index) {
        this.media.innerHTML = "";
        console.log(this.element);
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







