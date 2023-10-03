const photographersSection = document.querySelector(".photographerSection");
const focusPhotographe = document.querySelector(".focusPhotographe");

function lauchPhotographe(photographers) {

    focusPhotographe.appendChild(photographers.templateFocus());
    focusPhotographe.style.opacity = 1;
    photographersSection.style.filter = 'blur(10px)';

}

function closePhotographe() {

    focusPhotographe.innerHTML = "";
    focusPhotographe.style.opacity = 0;
    photographersSection.style.filter = 'none';

}

export default class Navigation {
    constructor(maxIndex, elementsPerRow) {
        this.maxIndex = maxIndex;
        this.elementsPerRow = elementsPerRow;
        this.currentIndex = 0;
    }

    handleEvent(event) {
        if (event.key === 'Tab' || event.key === 'Shift') {
            this.handleTabKey(event);
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            this.handleArrowKey(event);
        } else if (event.key === 'Enter' && this.currentIndex !== -1) {
            openPageFocusPhotographe(tabPhotographe[this.currentIndex].getAttribute('id'));
        }

        closePhotographe();

        lauchPhotographe(photographers[this.currentIndex]);
    }

    handleTabKey(event) {
        event.preventDefault();
        this.currentIndex = event.shiftKey ? this.currentIndex - 1 : this.currentIndex + 1;
        if (this.currentIndex < 0) {
            this.currentIndex = this.maxIndex;
        } else if (this.currentIndex > this.maxIndex) {
            this.currentIndex = 0;
        }
    }

    handleArrowKey(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.currentIndex = this.currentIndex >= this.elementsPerRow ? this.currentIndex - this.elementsPerRow : (this.maxIndex - this.currentIndex < this.elementsPerRow ? this.maxIndex % this.elementsPerRow : this.maxIndex - this.currentIndex);
                break;
            case 'ArrowDown':
                this.currentIndex = this.currentIndex + this.elementsPerRow <= this.maxIndex ? this.currentIndex + this.elementsPerRow : (this.maxIndex - this.currentIndex < this.elementsPerRow ? this.currentIndex + (this.maxIndex % this.elementsPerRow - (this.maxIndex - this.currentIndex)) : this.currentIndex);
                break;
            case 'ArrowLeft':
                this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.maxIndex;
                break;
            case 'ArrowRight':
                this.currentIndex = this.currentIndex < this.maxIndex ? this.currentIndex + 1 : 0;
                break;
        }
    }
}
