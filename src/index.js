const characterContainer = document.querySelector(".character_list");
const data_api = document.getElementById("data_api");
const input_search_character = document.getElementById("input_search_character");

const modal = document.getElementById('myModal');
const myModalAtive = new bootstrap.Modal(modal)
let modalContainer = document.getElementById('data-api-modal');

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
    console.log(result)
    const info = response.data.info;

    createContainersCards(result)
    containerModal(result)
    totalCharacters(info, result)

  } catch (error) {
    console.log("Erro ao chamar API", error);
  }
}

// OPEN MODAL
function openDetails(){
  myModalAtive.show()
  modalContainer.innerHTML = ""
}

// CONTAINER MODAL
function containerModal(result){
  const selectCharacters = result
  const cards = document.querySelectorAll('.btnCards');
  const arrayCards = [...cards]

  // BUTTON SELECT
  cards.forEach(function(card) {
      card.addEventListener('click', function(e) {
          const cardClicado = e.target;
          const index = arrayCards.findIndex(card => card === cardClicado)
  
          const detailsCharacter = document.createElement("div");
          detailsCharacter.classList.add("character_details")

          detailsCharacter.innerHTML = `
              <img class="img-thumbnail image-card" src="${selectCharacters[index].image}" class="img-fluid rounded-start" alt="image characters">
              <h3><strong>${selectCharacters[index].name}</strong></h3>
              <p><strong>${selectCharacters[index].status} - ${selectCharacters[index].species}</strong></p>
              <p>última localização conhecida</p>
              <p><strong>${selectCharacters[index].location.name}</strong></p>
            `;
          modalContainer.appendChild(detailsCharacter);
      });
  });
}

// CREATE CARDS
function createContainersCards(result) {
  const characters = result
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("character_list")

    card.innerHTML = `
      <div class="card p-3 text-bg-secondary bg-opacity-75 mb-3">
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
              <button class="btnCards btn btn-success" onclick="openDetails()" type="button">Ver mais...</button>
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

