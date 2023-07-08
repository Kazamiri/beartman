let pageNum = 1; // Variabilă care indică pagina pe care suntem.

function updateAlfabet () {
  const menuData = allLetter.map(obj => {
    return {
      id: obj.id,
      mainImage: obj.mainImage
    };
  }); // Am extras din fiecare obiect Id-il si mainImage pentru a face un masiv de obiecte aparte.
  
  let menuHTML = '';
  
  menuData.forEach((letter) => {
  
    const ratingLetter = parseInt(window.localStorage.getItem(`${letter.id}`));

    let starMenuHTML = '';
    const emptyStarHTML = `<img class="star-size" src="icon/40-star-empty.svg" alt="">`;
    const fullStarHTML = `<img class="star-size" src="icon/40-star-full.svg" alt="">`;
    for (let i = 1; i <= 4; i++) {
      if (i <= ratingLetter) {
        starMenuHTML += fullStarHTML;
      } else {
        starMenuHTML += emptyStarHTML;
      }
    }
    menuHTML += `<div class="alfabet-grid-card" data-letter-menu-id="${letter.id}">
    <img class="alfabet-grid-card__imag" src="${letter.mainImage}" alt="">
    <div class="alfabet-star">
      ${starMenuHTML}
    </div>
  </div>`;
  }); // Aceasta functie incarcar alfabetul in pop up
  
  document.querySelector('.alfabet-grid').innerHTML = menuHTML;
  
  document.querySelectorAll('.alfabet-grid-card').forEach((card) => {
    card.addEventListener('click', () => {
      let menuIdCard = parseInt(card.dataset.letterMenuId);
      menuPage(menuIdCard);
    });
  });
};

let counterStar = 0; // Variabilă care salvează numărul de răspunsuri corecte.
let counterWrongAnswers = 0; // Variabilă care salvează numărul de răspunsuri gresite.
let counterAnswers = 0; // Variabilă care salvează numărul de răspunsuri totale.

let allStar = document.querySelector('.star-container'); // Aici este incarcat blocul cu raiting de pe pagina principală.
let allStarModal = document.querySelector('.star-container-modal'); // Aici este incarcat blocul cu raiting de pe pop-up.


function updatePage() {
  updateHeader();
  updateCards();
  lightStar();
} // Funcția dată reînoiește informația de pe pagină.


function updateHeader() {
  const headerLetter = allLetter.find((headInfo) => headInfo.id === pageNum); // Extragere obiectului cu toată informația ce ține e literă. 

  document.querySelector('.js-main-letter').innerHTML = `<img class="letter-main" src="${headerLetter.mainImage}" alt="">`; //Adaugă litera pe pagina principală.

  document.querySelector('.js-letter-modal').innerHTML = `<img class="letter-image-modal" src="${headerLetter.mainImage}" alt="">`; //Adaugă litera în pop up.

  document.getElementById('nextPage').innerHTML = `${headerLetter.nextLetter}<img src="icon/24-right.svg" alt="">`; // Adaugă litera următoare pe pagină.

  document.getElementById('previousPage').innerHTML = `<img src="icon/24-left.svg" alt="">${headerLetter.previousLetter}`; // Adaugă litera precedentă pe pagină.

  document.getElementById('nextPageModal').innerHTML = `${headerLetter.nextLetter}<img src="icon/24-right.svg" alt="">`; // Adaugă litera următoare în pop-up.

  document.getElementById('previousPageModal').innerHTML = `<img src="icon/24-left.svg" alt="">${headerLetter.previousLetter}`; // Adaugă litera precedentă în pop-up.

  const playFirst = document.querySelector('.button-play');

  playFirst.removeEventListener('click', playAudio); // Remove previous click event listener

  playFirst.dataset.audioSrc = headerLetter.audioletter; // Store audio source as a data attribute

  playFirst.addEventListener('click', playAudio); // Add new click event listener

  function playAudio() {
    const audioSrc = this.dataset.audioSrc; // Get the stored audio source
    const audioLetter = new Audio(audioSrc); // Create a new Audio object with the audio source
    audioLetter.play();
  }

  const playQuestion = document.querySelector('.button-question');

  playQuestion.removeEventListener('click', playQuest); // Remove previous click event listener

  playQuestion.dataset.audioSrc = headerLetter.audioQuestion; // Store audio source as a data attribute

  playQuestion.addEventListener('click', playQuest); // Add new click event listener

  function playQuest() {
    const audioSrc = this.dataset.audioSrc; // Get the stored audio source
    const audioLetter = new Audio(audioSrc); // Create a new Audio object with the audio source
    //audioLetter.volume = 0.9;
    audioLetter.play();
  }
}


function updateCards() {
  const cardsArray = allLetter.flatMap((letter) => {
    if (letter.id === pageNum || letter.id === pageNum + 1) {
      return letter.cart.slice(0, 4);
    }
    return [];
  });

  let letterHTML = '';

  cardsArray.forEach((letter) => {
    letterHTML += `<div style="order: ${randNum()};" class="card-grid__card js-card-grid__card" data-card-id="${letter.idImag}" data-card-name="${letter.nameImag}" data-card-audio="${letter.audioOne}">
    <img class="card-grid__imag" src="${letter.image}" alt="">
    <p class="image-name" >${letter.nameImag}</p>
  </div>`;
  });

  document.querySelector('.js-card-grid').innerHTML = letterHTML;

  document.querySelectorAll('.card-grid__card').forEach((card) => {
    const cardEventListener = () => {
      let controlIdCard = parseInt(card.dataset.cardId);
      if (pageNum != controlIdCard) {
      }
      if (controlIdCard === pageNum) {
        card.style.backgroundColor = '#F1FFB7';
        
        let audioCart = new Audio();
        audioCart.src = card.dataset.cardAudio;
        audioCart.play();
  
        const addedMessage = card.querySelector('.image-name');
        addedMessage.style.opacity = 1;
  
        counterStar ++;
        counterAnswers ++;

        openModal ();
        lightStar();

        saveRating (controlIdCard, counterStar);

  
      } else {
        card.style.backgroundColor = '#FFCEE9';
  
        let audioCart = new Audio();
        audioCart.src = card.dataset.cardAudio;
        audioCart.play();

        counterAnswers ++;
        counterWrongAnswers ++;

        saveRatingZero (controlIdCard, counterWrongAnswers, counterAnswers);

        openModal ();

        const addedMessage = card.querySelector('.image-name');
        addedMessage.style.opacity = 1;
        addedMessage.style.background = 'rgba(255, 206, 233, 0.65)';
        addedMessage.style.color = '#56002F';
      }
      card.removeEventListener('click', cardEventListener);
    };
    card.addEventListener('click', cardEventListener);
  });
}

function saveRating (nameLetter, rightAnswers,) {
  //console.log(rightAnswers)
  window.localStorage.setItem(`${nameLetter}`, `${rightAnswers}`);
}

function saveRatingZero (nameLetter, wrongAnswers, totalAnswers) {
  console.log(wrongAnswers);
  console.log(totalAnswers);

  let nameAjust = nameLetter -1;
  //console.log(nameAjust)
  if (wrongAnswers === 4 && totalAnswers === 4 ) {
    window.localStorage.setItem(`${nameAjust}`, `0`);
  }
}

function lightStar() {
  let starHTML = '';
  const emptyStarHTML = `<img class="star-container__star-size" src="icon/40-star-empty.svg" alt="">`;
  const fullStarHTML = `<img class="star-container__star-size" src="icon/40-star-full.svg" alt="">`;
  for (let i = 1; i <= 4; i++) {
    if (i <= counterStar) {
      starHTML += fullStarHTML;
    } else {
      starHTML += emptyStarHTML;
    }
  }
  allStar.innerHTML = starHTML; //Adauga ratingul pe pagina principală.
  allStarModal.innerHTML =starHTML; //Adauga ratingul în pop-up.

  const messages = [
    `Mai încearcă!`,
    `Mai încearcă o dată!`,
    `Jumătate ai găsit!`,
    `Ești aproape, continuă!`,
    `Bravo, continuă!`
  ];
  
  document.getElementById('textPageModal').innerHTML = messages[counterStar];
}


function nextPage() {
  pageNum++;
  counterStar = 0;
  closeModal ();
  updatePage();
}

function previousPage() {
  pageNum--;
  counterStar = 0;
  closeModal ();
  updatePage();
}

function refrechPage() {
  counterStar = 0;
  closeModal ();
  updatePage();
}

function menuPage(value) {
  pageNum = value;
  counterStar = 0;
  closeModalAlfabet ();
  updatePage();
}

function randNum() {
  let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let i = array.length;
  while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1));
    [array[temp], array[i]] = [array[i], array[temp]];
  }
  return array[0];
} // Funția dată reorganizează în altă ordine șirul de numere, este utilizat pentru a reorganiza cardurile pe gaină.

updatePage(); // Funcția dată este chemată cînd se deschide prima dată aplicația.


const buttonPreviousPage = document.getElementById('previousPage');
buttonPreviousPage.addEventListener('click', previousPage);

const buttonMenuPage = document.getElementById('menuPage');
buttonMenuPage.addEventListener('click', openModalAlfabet);

const buttonrefrechPage = document.getElementById('refrechPage');
buttonrefrechPage.addEventListener('click', refrechPage);

const buttonNextPage = document.getElementById('nextPage');
buttonNextPage.addEventListener('click', nextPage);



const buttonPreviousPageModal = document.getElementById('previousPageModal');
buttonPreviousPageModal.addEventListener('click', previousPage);

const buttonMenuModal = document.getElementById('menuPageModal');
buttonMenuModal.addEventListener('click', closeOpenModal);

const buttonrefrechPageModal = document.getElementById('refrechPageModal');
buttonrefrechPageModal.addEventListener('click', refrechPage);

const buttonNextPageModal = document.getElementById('nextPageModal');
buttonNextPageModal.addEventListener('click', nextPage);


const buttonResetAlfabet = document.getElementById('reset-alfabet');
buttonResetAlfabet.addEventListener('click', resetalfabetPage);




function modalVoice() {
  const audioSources = [
    "audio/0-stea.m4a",
    "audio/1-stea.m4a",
    "audio/2-stele.m4a",
    "audio/3-stele.m4a",
    "audio/4-stele.m4a"
  ];

  let voiceChoice = new Audio(audioSources[counterStar]);
  voiceChoice.play();
} //Funcția dată selectează care audio fișier va fi reprodus la deschiderea pop-up-lui

function openModal () {
  if (counterAnswers === 4) {
    modal.showModal();
    setTimeout(() => {
      modalVoice ();
    }, 1000); 
  }
} // Funția dată este utilizată pentru a deschide pop-up-ul.

function closeModal () {
  modal.close();
  counterAnswers = 0;
  counterWrongAnswers = 0;
} // Funția dată este utilizată pentru a închide pop-up-ul și de pune conturul la zero.

const modal = document.querySelector('.js-modal') // Constanta dată adaugă pop-up-ul în JS.

const modalAlfabet = document.querySelector('.js-modal-alfabet') // Constanta dată adaugă pop-up-ul cu alfabet în JS.

function closeModalAlfabet () {
  modalAlfabet.close();
  counterWrongAnswers = 0;
} // Funția dată este utilizată pentru a închide pop-up-ul și de pune conturul la zero.

function openModalAlfabet () {
  modalAlfabet.showModal();
  updateAlfabet ();
}

function closeOpenModal () {
  closeModal ();
  openModalAlfabet ();
}; // Este necesar pentru a inchide pop-up-ul cu rating cind se deschide cel cu alfabet.

/*window.localStorage.setItem('name', 'eugen')
const euname = window.localStorage.getItem('name')
console.log(euname)*/

function resetalfabetPage () {
  window.localStorage.clear();
  closeModalAlfabet ();
  updatePage();
  openModalAlfabet ();
}