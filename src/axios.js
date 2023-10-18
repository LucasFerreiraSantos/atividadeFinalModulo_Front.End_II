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

// CRIAR CARDS
function createContainersCards(result) {
  const characters = result
  characters.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("col-6 card mb-3")
    card.style.maxWidth = "540px"

    card.innerHTML = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${character.image}" class="img-fluid rounded-start" alt="image characters">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3><strong>${character.name}</strong></h3>
                <p><strong>${character.status} - ${character.species}</strong></p>
                <p>última localização conhecida</p>
                <p><strong>${character.location.name}</strong></p>
              </div>
          </div>
    `;
    characterContainer.appendChild(card);
  })
}

// PEGAR O TOTAL DE PERSONAGENS
function totalCharacters(info, result) {
  const totalCharacters = info
  const totalEpisodes = result
  data_api.innerHTML = `
    <p class="p-5"><span class="text-primary">PERSONAGENS:</span> ${totalCharacters.count}</p>
    <p class="p-5"><span class="text-primary">EPISÓDIOS:</span> ${totalEpisodes[0].episode.length}</p>
  `;
}

// VOLTAR UMA PÁGINA
function previousPage() {
  if (currentPage >= 1) {
    characterContainer.innerHTML = "";
    currentPage--;
    getCharacters(currentPage);
  }
}
const btnPaginatePrevious = document.getElementById("btnPaginatePrevious");
btnPaginatePrevious.addEventListener("click", previousPage);

// AVANÇAR UMA PÁGINA
function nextPage() {
  if (currentPage < 42) {
    characterContainer.innerHTML = "";
    currentPage++;
    getCharacters(currentPage);
  }
}
const btnPaginateNext = document.getElementById("btnPaginateNext");
btnPaginateNext.addEventListener("click", nextPage);

// PESQUISAR POR NOME
input_search_character.addEventListener('input', () => {
  characterContainer.innerHTML = "";
  currentPage = 1
  getCharacters(currentPage, input_search_character.value)
})

getCharacters();


