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

        document.querySelector("form").addEventListener("submit", this.preventDefault.bind(this));
    }

    preventDefault(event) {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut
    }



    openModal() {
        this.modal.style.display = "flex";
        document.getElementById("prenom").focus();
    }

    closeModal() {
        this.modal.style.display = "none";
        document.querySelector(".contact_button").focus();
    }

    sendMessage() {

        var prenom = document.getElementById("prenom").value;
        var nom = document.getElementById("nom").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;

        if (prenom === "" || nom === "" || email === "" || message === "") {
            alert("Veuillez remplir tous les champs obligatoires.");
            return; // Ne soumettez pas le formulaire si des champs sont vides
        }

        if (this.validateForm() === false) {
            return;
        }

        console.log("Prénom : " + prenom);
        console.log("Nom : " + nom);
        console.log("Email : " + email);
        console.log("Message : " + message);
        this.closeModal();

    }

    validateForm() {
        var email = document.getElementById("email").value;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {

            alert("Veuillez entrer une adresse e-mail valide.");
            return false;
        }
        return true;
    }
}
