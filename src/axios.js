const characterContainer = document.querySelector(".character_list");
const btn_search_character = document.getElementById("btn_search_character");

async function getCharacters(page = 1) {
  const params = {
    page,
  };

  try {
    const response = await api.get("/", {
      params,
    });
    const results = data.results;
    const info = response.data.info;
    console.log(info);
    console.log(results);

    createContainersCards(results)
  } catch (error) {
    console.log("Erro ao chamar API", error);
  }
}

function createContainersCards(results) {
  const characters = results

  characters.forEach(character => {
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
  }
}

getCharacters();
