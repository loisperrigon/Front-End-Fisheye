export default class Photographer {

    constructor(name, id, city, country, tagline, price, portrait, media, index = 0) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.path = `assets/photographers/${this.portrait}`;
        this.index = index;
        this.media = media;

        this.template = "";
        this.evenement = [];
    }

    templateBaniere() {
        const tempElement = document.createElement('div');
        tempElement.classList.add("photographe");
        tempElement.innerHTML = `   
             <div tabindex=1.1>
                <h2>${this.name}</h2>
                <h3>${this.city} ${this.country}</h3>
                <h4>${this.tagline}</h4>
             </div>
             <button tabindex=1.2 class="contact_button" onclick="displayModal()">Contactez-moi</button>
             <img tabindex=1.3 src="${this.path}" alt="${this.name}">
            `;
        return tempElement;
    }

    templateFocus() {

        const tempElement = document.createElement('div');
        tempElement.innerHTML = `
                    <img src="${this.path}" alt="${this.name}">
                    <div class="conteneurTextPhotographe">
                        <h2>${this.name}</h2>
                        <h3>${this.city} ${this.country}</h3>
                        <h4>${this.tagline}</h4>
                        <h5>${this.price}</h5>
                    </div>
        `;
        return tempElement;

    }

    templatePhotographes() {
        this.template = document.createElement("article");
        this.template.setAttribute("id", this.id);
        this.template.classList.add("photographe");
        this.template.setAttribute("tabindex", this.index);
        this.template.innerHTML = `            
                    <img src="${this.path}" alt="${this.name}">
                    <h2>${this.name}</h2>
                    <h3>${this.city} ${this.country}</h3>
                    <h4>${this.tagline}</h4>
                    <h5>${this.price}</h5>          
        `;
        this.template.addEventListener('click', () => {//supression de l'evenement
            this.openWindowPhotographer()
        });
        return this.template;
    }

    openWindowPhotographer() {
        sessionStorage.setItem("objetData", JSON.stringify(this));  //Pour envoyer l'objet sur la nouvelle page
        window.location.href = "focusPhotographer.html";
    }

}


