
function decroissantLikes(a, b) {
    return b.likes -  a.likes;
  }


function croissantDate(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    return dateA - dateB;

  }

function croissantTitre(a, b) {
    const titreA = a.title.toUpperCase();
    const titreB = b.title.toUpperCase();

    if (titreA < titreB) {
        return -1;
    }
    if (titreA > titreB) {
        return 1;
    }

    return 0;
}


