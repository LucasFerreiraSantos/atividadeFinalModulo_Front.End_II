// GERADOR DA LISTA DE CARDS
async function getCharacters() {
  const characterContainer = document.querySelector(".character_list");

  await fetch("https://rickandmortyapi.com/api/character")
    .then((res) => {
      res.json().then((data) => {
        const characters = data.results;

        characters.forEach((character) => {
          const card = document.createElement("div");
          card.classList.add("character_card");

          card.innerHTML = `
        <img src="${character.image}" alt="#">
        <div>
        <h3><strong>${character.name}</strong></h3>
        <p><strong>${character.status} - ${character.species}</strong></p>
        <p>última localização conhecida</p>
        <p><strong>${character.location.name}</strong></p>
        </div>
      `;
          characterContainer.appendChild(card);
        });
      });
    })
    .catch((err) =>
      console.error("Não foi possível encontrar a informação", err)
    );
}

// PEGAR O TOTAL DE PERSONAGENS
async function totalCharacters() {
  const data_api = document.getElementById("data_api");

  await fetch("https://rickandmortyapi.com/api/character")
    .then((res) => {
      res.json().then((data) => {
        const characters = data;
        data_api.innerHTML = `
        <p>PERSONAGENS: ${characters.info.count}</p>
        <p>EPISÓDIOS: ${characters.results[0].episode.length}</p>
        `;
      });
    })
    .catch((err) => console.error("Não é possível achar a informação", err));
}

// VOLTAR UMA PÁGINA
const btnPaginatePrevious = document.getElementById("btnPaginatePrevious");
btnPaginatePrevious.addEventListener("click", (e) => {
  e.preventDefault();
  const currentPages = 4;
  const changePage = window.location(
    `https://rickandmortyapi.com/api/character/?page=${currentPages - 1}`
  );
  console.log(changePage);
});

// AVANÇAR UMA PÁGINA
const btnPaginateNext = document.getElementById("btnPaginateNext");
btnPaginateNext.addEventListener("click", (e) => {});

getCharacters();
totalCharacters();
