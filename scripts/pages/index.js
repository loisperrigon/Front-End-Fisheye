
    async function getPhotographers() {
        const jsonPath = 'data/photographers.json';

        try {
            const response = await fetch(jsonPath);
        
            if (!response.ok) {
              throw new Error('La requête a échoué avec un statut ' + response.status);
            }
            else{
                const data = await response.json();
                return data.photographers; // Retourne le tableau des photographes
            }
          } catch (error) {
            console.error('Une erreur s\'est produite:', error);
            return []; // Retourne un tableau vide en cas d'erreur
          }
        }

    async function displayData(photographers) {
        var index=1;
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer,index);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            index += 1;
        });

        const photographe = document.querySelectorAll(".photographe");
        tabPhotographe = photographe;
        photographe.forEach((people) => {
          people.addEventListener("click", () => openPagePhotographe(people.getAttribute('id')));
         
        });

        /*
        photographe.forEach((people) => {
            people.addEventListener("click", () => lauchPhotographe(people));
           
        });

        photographe.forEach((people) => {
            people.addEventListener("mouseleave", () => closePhotographe(people));
        });
        */
        
    }
    
    function openPagePhotographe(photographe){
      window.location.href="photographer.html?idPhotographe="+photographe;
    }

    async function init() {
        try {
            // Récupère les datas des photographes
            const photographers = await getPhotographers();
            displayData(photographers);
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'initialisation:', error);
          }
    }


    function lauchPhotographe(photographe){
        const div = document.createElement( 'div' );
        div.classList.add("conteneurTextPhotographe");
        const img = document.createElement( 'img' );
        img.setAttribute("src", photographe.querySelector("img").src)
        const h2 = document.createElement('h2');
        h2.textContent = photographe.querySelector('h2').textContent;
        const h3 = document.createElement('h3');
        h3.textContent = photographe.querySelector('h3').textContent;
        const h4 = document.createElement('h4');
        h4.textContent = photographe.querySelector('h4').textContent;
        const h5 = document.createElement('h5');
        h5.textContent = photographe.querySelector('h5').textContent;
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(h5);
        focusPhotographe.appendChild(img);
        focusPhotographe.appendChild(div);
        focusPhotographe.style.opacity = 1;
        photographersSection.style.filter= 'blur(10px)';
        
    }

    function closePhotographe(){
        while (focusPhotographe.firstChild) {
            focusPhotographe.removeChild(focusPhotographe.firstChild);
        }
        focusPhotographe.style.opacity = 0;
        photographersSection.style.filter= 'none';
        
    }

    
    
    document.addEventListener('keydown', function(event) {
        switch (event.key) {

            case 'Tab':
                event.preventDefault();
                if (event.shiftKey) {
                    if (curentIndex > 0) {
                        // Lancez le photographe suivant
                        curentIndex -= 1;                         
                      }
                    else{
                        curentIndex = tabPhotographe.length-1;
                    }
                      break
                }
                if (curentIndex < tabPhotographe.length-1) {
                    // Lancez le photographe suivant
                    curentIndex += 1;                   
                  }
                  else{
                    curentIndex = 0; 
                  }
                break;

            case 'ArrowUp':
                if (curentIndex >= 3) {
                    // Lancez le photographe suivant
                    curentIndex -= 3;
                  } 
                else{
                        i = 0 - curentIndex
                        if (i === 0){
                           curentIndex= tabPhotographe.length -3 ;
                        }
                        else if (i === -1){
                            curentIndex= tabPhotographe.length -2 ;
                        }
                        else{
                            curentIndex= tabPhotographe.length -1 ;
                        }
                }
              break;
            case 'ArrowDown':
                if (curentIndex <= tabPhotographe.length-4) {
                    // Lancez le photographe suivant
                    curentIndex += 3;                 
                  } 
                  else{
                     i = tabPhotographe.length - curentIndex
                     if (i === 3){
                        curentIndex= 0;
                     }
                     else if (i === 2){
                        curentIndex= 1;
                     }
                     else{
                        curentIndex= 2;
                     }
                }
              break;
            

            case 'ArrowRight':
                if (curentIndex <= tabPhotographe.length-2) {
                    // Lancez le photographe suivant
                    curentIndex += 1;                    
                  }
                else{
                    curentIndex = 0 ;
                } 
            break;

            case 'ArrowLeft':
                if (curentIndex >  0) {
                    // Lancez le photographe suivant.
                    curentIndex -= 1;             
                  } 
                else{
                    curentIndex = tabPhotographe.length -1 ;
                }
            break;

            case 'Enter':
              if(curentIndex !== -1 ){
                openPagePhotographe(tabPhotographe[curentIndex].getAttribute('id'));
              }
            
        }

        closePhotographe();
        tabPhotographe[curentIndex].focus(); 
        lauchPhotographe(tabPhotographe[curentIndex]);

      });
  
    const photographersSection = document.querySelector(".photographerSection");
    const focusPhotographe = document.querySelector(".focusPhotographe");
    var curentIndex = -1;
    var tabPhotographe;
    init();



    
    

    
