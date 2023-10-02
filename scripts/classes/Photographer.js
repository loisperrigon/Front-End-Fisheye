class Photographer {

    constructor(name, id, city, country, tagline, price, portrait, media, index = 0) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.countr = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.path = `assets/photographers/${this.portrait}`;
        this.index = index;
        this.media = media;
    }

    templateBaniere() {
        const tempElement = document.createElement('div');
        tempElement.classList.add("photographe");
        tempElement.innerHTML = `
             <div>
                <h2>${this.name}</h2>
                <h3>${this.city} ${this.country}</h3>
                <h4>${this.tagline}</h4>
             </div>
             <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
             <img src="${this.path}" alt="${this.name}">
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
        const tempElement = document.createElement("article");
        tempElement.setAttribute("id", this.id);
        tempElement.classList.add("photographe");
        tempElement.setAttribute("tabindex", this.index);
        tempElement.innerHTML = `            
                    <img src="${this.path}" alt="${this.name}">
                    <h2>${this.name}</h2>
                    <h3>${this.city} ${this.country}</h3>
                    <h4>${this.tagline}</h4>
                    <h5>${this.price}</h5>          
        `;

        return tempElement;
    }

    openWindowPhotographer(photographer) {
        sessionStorage.setItem("objetData", JSON.stringify(photographer));  //Pour envoyer l'objet sur la nouvelle page
        window.location.href = "focusPhotographer.html?idPhotographe=" + this.id;
    }

}


export default Photographer; 