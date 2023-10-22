const characterContainer = document.querySelector(".character_list");
const data_api = document.getElementById("data_api");
const input_search_character = document.getElementById("input_search_character");

const modal = document.getElementById('myModal');
const myModalAtive = new bootstrap.Modal(modal)
let modalContainer = document.getElementById('data-api-modal');

let currentPage = 1;

let totalCharactersPersona = 0
let totalLocations = 0
let totalEpisodes = 0

// GET TOTAL LOCATION
async function getLocations(){
  try{
    const response = await api.get("/location")
    totalLocations = response.data.info.count
  }catch(err){
    console.log("Erro ao buscar as localizações: ", err)
  }
}

// GET TOTAL EPISODE
async function getEpisodes(){
  try{
    const response = await api.get("/episode")
    totalEpisodes = response.data.info.count
  }catch(err){
    console.log("Erro ao buscar todos os episódios: ", err)
  }
}

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
    const infoTotal = response.data.info
    console.log(infoTotal)

    createContainersCards(result)
    containerModal(result)
    totalCharacters(infoTotal)
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
              <div>
                <img class="image-details" src="${selectCharacters[index].image}" class="img-fluid rounded-start" alt="image characters">
              </div>
              
              <div class="text-light text-modal">
                <h3 class="tittle-modal"><strong>${selectCharacters[index].name}</strong></h3>
                <h6>Gênero: ${selectCharacters[index].gender};</h6>
                <p><strong>${selectCharacters[index].status} - ${selectCharacters[index].species};</strong></p>
                <h6>Origem: ${selectCharacters[index].origin.name};</h6>
                <p>última localização conhecida:</p>
                <p><strong>${selectCharacters[index].location.name}.</strong></p>
              </div>
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
      <div class="card text-bg-danger bg-opacity-75 mb-3">
        <div class="row g-0">
          <div class="col-md-5">
            <img class=" image-card" src="${character.image}" class="img-fluid rounded-start" alt="image characters">
          </div>
          <div class="col-md-7">
            <div class="card-body text-card">
              <h3><strong>${character.name}</strong></h3>
              <p><strong>${character.status} - ${character.species};</strong></p>
              <p>última localização conhecida:</p>
              <p><strong>${character.location.name};</strong></p>
              <button class="btnCards" onclick="openDetails()" type="button">Ver mais...</button>
            </div>
          </div>
        </div>
      </div>
    `;
    characterContainer.appendChild(card);
  })
}

// GET THE TOTAL CHARACTERS
function totalCharacters(info) {
  totalCharactersPersona = info
  data_api.innerHTML = `
    <p class="p-5"><span class="text-primary">PERSONAGENS:</span> ${totalCharactersPersona.count}</p>
    <p class="p-5"><span class="text-primary">LOCALIZAÇÕES:</span> ${totalLocations}</p>
    <p class="p-5"><span class="text-primary">EPISÓDIOS:</span> ${totalEpisodes}</p>
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

// GO BACK HOME
function home() {
  characterContainer.innerHTML = "";
  currentPage = 1
  getCharacters(currentPage);
}
const goBackHome = document.getElementById("goBackHome")
goBackHome.addEventListener("click", home)

// SEARCH BY NAME
input_search_character.addEventListener('input', () => {
  characterContainer.innerHTML = "";
  currentPage = 1
  getCharacters(currentPage, input_search_character.value)
})

getLocations()
getEpisodes()
getCharacters();