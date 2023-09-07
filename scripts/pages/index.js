
    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Madatatest",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "MimiKeel.png"
            },
            {
                "name": "Autredatatest",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "MarcelNikolic.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });

        const photographe = document.querySelectorAll(".photographe");
        photographe.forEach((people) => {
            people.addEventListener("mouseenter", () => lauchPhotographe(people));
        });

        photographe.forEach((people) => {
            people.addEventListener("mouseleave", () => closePhotographe(people));
        });

    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }


    function lauchPhotographe(photographe){
        const img = document.createElement( 'img' );
        img.setAttribute("src", photographe.querySelector("img").src)
        const text = document.createTextNode(photographe.textContent);
        focusPhotographe.appendChild(img);
        focusPhotographe.appendChild(text);
        focusPhotographe.style.opacity = 1;

        document.body.classList.add("blur-background");
    }

    function closePhotographe(photographe){
        while (focusPhotographe.firstChild) {
            focusPhotographe.removeChild(focusPhotographe.firstChild);
        }
        focusPhotographe.style.opacity = 0;
        
    }
    
    init();
    const focusPhotographe = document.querySelector(".focusPhotographe");



    


    
