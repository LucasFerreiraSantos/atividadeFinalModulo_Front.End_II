const characterContainer = document.querySelector(".character_list");
const data_api = document.getElementById("data_api");
const input_search_character = document.getElementById("input_search_character");

let currentPage = 1;

async function getCharacters(page = 1, name = "") {
  try {
    const params = {
      page,
      name
    };

    const response = await api.get("/character", {
      params,
    });
    const result = response.data.results;
    const info = response.data.info;

    createContainersCards(result)
    totalCharacters(info, result)

  } catch (error) {
    console.log("Erro ao chamar API", error);
  }
}

// CREATE CARDS
function createContainersCards(result) {
  const characters = result
  characters.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("character_list")

    card.innerHTML = `
      <div class="card p-3 text-bg-secondary bg-opacity-50 mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img class="img-thumbnail image-card" src="${character.image}" class="img-fluid rounded-start" alt="image characters">
          </div>
          <div class="col-md-8">
            <div class="card-body text-card">
              <h3><strong>${character.name}</strong></h3>
              <p><strong>${character.status} - ${character.species}</strong></p>
              <p>última localização conhecida</p>
              <p><strong>${character.location.name}</strong></p>
            </div>
          </div>
        </div>
      </div>
    `;
    characterContainer.appendChild(card);
  })
}

// GET THE TOTAL CHARACTERS
function totalCharacters(info, result) {
  const totalCharacters = info
  const totalEpisodes = result
  data_api.innerHTML = `
    <p class="p-5"><span class="text-primary">PERSONAGENS:</span> ${totalCharacters.count}</p>
    <p class="p-5"><span class="text-primary">EPISÓDIOS:</span> ${totalEpisodes[0].episode.length}</p>
  `;
}

// GO BACK ONE PAGE
function previousPage() {
  if (currentPage >= 1) {
    characterContainer.innerHTML = "";
    currentPage--;
    getCharacters(currentPage);
  }
}
const btnPaginatePrevious = document.getElementById("btnPaginatePrevious");
btnPaginatePrevious.addEventListener("click", previousPage);

// GO ONE PAGE
function nextPage() {
  if (currentPage < 42) {
    characterContainer.innerHTML = "";
    currentPage++;
    getCharacters(currentPage);
  }
}
const btnPaginateNext = document.getElementById("btnPaginateNext");
btnPaginateNext.addEventListener("click", nextPage);

// SEARCH BY NAME
input_search_character.addEventListener('input', () => {
  characterContainer.innerHTML = "";
  currentPage = 1
  getCharacters(currentPage, input_search_character.value)
})

getCharacters();


// const WrapperCards = document.getElementById("wrapper-cards");
// const currentPageViewEl = document.getElementById("current-page");
// let currentPage = 1;
// let currentPageView = Number(currentPageViewEl.innerText);
// let characters = []; // 20 personagens
// let charactersView = []; // 6 personagens por página

// function resetCards() {
//   WrapperCards.innerHTML = "";
// }

// function setCurrentPageView(newPage) {
//   currentPageView = newPage;
//   currentPageViewEl.innerHTML = newPage;
// }

// function addCard(character) {
//   WrapperCards.innerHTML += `
// <div class="card bg-black bg-opacity-10" style="min-width: 250px; max-width: 350px;">
//   <div class="card-body">
//     <h5 class="card-title">${character.name}</h5>
//     <h6 class="card-subtitle mb-2 text-body-secondary">
//       ${character.species}
//     </h6>
//     <p class="card-text">
//       Origem: ${character.origin.name}
//     </p>
//   </div>
// </div>
// `;
// }

// // (characters.slice((page -1) * 6, page * per_page))

// async function fetchCharacters() {
//   try {
//     const { data } = await api.get("/character?page=" + currentPage);

//     console.log(data);
//     characters = data.results;
//   } catch (error) {
//     console.log(error);
//   }
// }

// function setView() {
//   charactersView = characters.slice(
//     (currentPageView - 1) * 6,
//     currentPageView * 6
//   );
//   resetCards();
//   charactersView.forEach((character) => {
//     addCard(character);
//   });
// }

// function nextPage() {
//   currentPageView++; // incremento a pagina que o usuário ira ver
//   setCurrentPageView(currentPageView);
//   setView();
// }

// function prevPage() {
//   setCurrentPageView(--currentPageView);
//   setView();
// }

// async function start() {
//   await fetchCharacters();
//   setView();
// }

// start();

