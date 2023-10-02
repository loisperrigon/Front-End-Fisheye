const imageVideoFullScreen = document.querySelector(".imageVideoFullScreen");
const close = document.querySelector(".close");
const image = document.querySelector(".imageVideoFull");
const title = document.querySelector(".title");
const flecheDroite = document.querySelector(".flecheDroite");
const flecheGauche = document.querySelector(".flecheGauche");




function openVisioPhoto(element, titleElement, index) {
    element.classList.add("imageVideoFocus");
    element.setAttribute("tabindex", index);
    image.appendChild(element);

    imageVideoFullScreen.style.display = 'flex';
    title.textContent = titleElement;

}

function closeVisioPhoto() {
    image.innerHTML = ""; //Renitialise a la fermeture.
    imageVideoFullScreen.style.display = 'none';
}

function rechercherElementIndex(videoPhoto, index) {
    for (const element of videoPhoto) {
        if (element.tabIndex === index) {

            return element.cloneNode(true);
        }
    }
    return null;
}

function modificationVisio(element, index) {
    image.innerHTML = "";
    var imgVideoElement = element.querySelector("img");

    if (imgVideoElement === null) {
        imgVideoElement = element.querySelector("video");
    }

    imgVideoElement.classList.add("imageVideoFocus");
    imgVideoElement.tabIndex = index;
    title.textContent = element.querySelector("span").textContent;
    image.appendChild(imgVideoElement);

}


flecheDroite.addEventListener('click', function () {
    var index = document.querySelector(".imageVideoFocus").tabIndex + 1;
    console.log(index);
    const videoPhoto = document.querySelectorAll(".videoPhoto");
    var element = rechercherElementIndex(videoPhoto, index);
    console.log(element);
    if (element !== null) {
        modificationVisio(element, index);
    }


});


flecheGauche.addEventListener('click', function () {
    var index = document.querySelector(".imageVideoFocus").tabIndex - 1;
    const videoPhoto = document.querySelectorAll(".videoPhoto");

    var element = rechercherElementIndex(videoPhoto, index);
    console.log(element);
    if (element !== null) {
        modificationVisio(element, index);
    }


});



close.addEventListener('click', function () {
    closeVisioPhoto();
});


