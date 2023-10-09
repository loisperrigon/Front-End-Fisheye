export default class ModalContact {
    constructor(name) {
        this.modal = document.getElementById("contact_modal");
        this.titleContact = document.querySelector(".titreModal");
        this.name = name;
        this.titleContact.textContent += this.name;
        this.boutonContact = document.querySelector(".contact_button");
        this.boutonSend = document.querySelector(".sendMessage"); // Sélectionnez l'élément approprié
        this.close = document.querySelector(".closeModal");

        // Ajoutez des gestionnaires d'événements
        this.boutonContact.addEventListener('click', this.openModal.bind(this));
        this.boutonSend.addEventListener('click', this.sendMessage.bind(this));
        this.close.addEventListener('click', this.closeModal.bind(this));
    }


    openModal() {
        this.modal.style.display = "flex";
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    sendMessage() {

        console.log("Prenom: ");
        console.log("Nom: ");
        console.log("Email: ");
        console.log("Message:");

    }
}
