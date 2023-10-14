export default class DataManager {
    constructor() {
        this.jsonPath = 'data/photographers.json';

    }

    async getData() {
        try {
            const response = await fetch(this.jsonPath);

            if (!response.ok) {
                throw new Error('La requête a échoué avec un statut ' + response.status);
            }
            else {
                const data = await response.json();

                return data; // Retourne les donnees
            }
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
            return []; // Retourne un tableau vide en cas d'erreur
        }
    }
}
