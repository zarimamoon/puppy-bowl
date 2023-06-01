const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-C";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const allPlayers = await response.json();
    return allPlayers;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const singlePlayer = await response.json();
    return singlePlayer;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}/players/`, {
      method: "POST",
      body: JSON.stringify(playerObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const players = await fetchAllPlayers();
    renderAllPlayers(players, playerContainer);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
    fetchAllPlayers();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList, playerContainer) => {
  try {
    // Clear the content of playerContainer before rendering
    playerContainer.innerHTML = "";

    const allH1 = document.createElement("h1");
    allH1.innerHTML = "All Players";
    playerContainer.appendChild(allH1);
    playerContainer.style.background = "beige";
    playerContainer.style.display = "grid";
    playerContainer.style.height = "600px";
    playerContainer.style.width = "600px";
    playerContainer.style.justifyContent = "center";
    playerContainer.style.alignContent = "center";

    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("player");

      const nameElement = document.createElement("h2");
      nameElement.textContent = player.name;
      playerElement.appendChild(nameElement);

      const breedElement = document.createElement("p");
      breedElement.textContent = player.breed;
      playerElement.appendChild(breedElement);

      const statusElement = document.createElement("p");
      statusElement.textContent = player.status;
      playerElement.appendChild(statusElement);

      const imageUrlElement = document.createElement("p");
      imageUrlElement.textContent = player.imageUrl;
      playerElement.appendChild(imageUrlElement);

      const teamIdElement = document.createElement("p");
      teamIdElement.textContent = player.teamId;
      playerElement.appendChild(teamIdElement);

      playerContainer.appendChild(playerElement);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

/* create form thru DOM - Dana */
const renderNewPlayerForm = async () => {
  const form = document.createElement("form");
  form.setAttribute("id", "signUpForm");

  const formH1 = document.createElement("h1");
  formH1.innerHTML = "Yay, puppies! Join a Puppy Bowl team today!";
  form.appendChild(formH1);

  // Create an input element for Puppy Name
  const puppyNameInput = document.createElement("input");
  puppyNameInput.setAttribute("id", "puppyValue");
  puppyNameInput.setAttribute("type", "text");
  puppyNameInput.setAttribute("name", "puppyName");
  puppyNameInput.setAttribute("placeholder", "Puppy Name");
  form.appendChild(puppyNameInput);

  // Create an input element for breed
  const dogBreedInput = document.createElement("input");
  dogBreedInput.setAttribute("id", "breedValue");
  dogBreedInput.setAttribute("type", "text");
  dogBreedInput.setAttribute("name", "dogBreed");
  dogBreedInput.setAttribute("placeholder", "Breed");
  form.appendChild(dogBreedInput);

  // Create an input element to submit image URL
  const imgURL = document.createElement("input");
  imgURL.setAttribute("id", "imgValue");
  imgURL.setAttribute("type", "text");
  imgURL.setAttribute("name", "imgURL");
  imgURL.setAttribute("placeholder", "Image URL of puppy");
  form.appendChild(imgURL);

  // create a submit button
  const addPlayerBtn = document.createElement("button");
  addPlayerBtn.setAttribute("id", "submitValue");
  addPlayerBtn.setAttribute("type", "submit");
  addPlayerBtn.setAttribute("value", "Submit");
  addPlayerBtn.innerHTML = "Add Player";
  form.appendChild(addPlayerBtn);

  // Append the form to the newPlayerFormContainer element
  newPlayerFormContainer.appendChild(form);

  // Apply styles to the form
  form.style.background = "#c2c6f9";
  form.style.display = "grid";
  form.style.height = "600px";
  form.style.width = "600px";
  form.style.justifyContent = "center";
  form.style.alignContent = "center";
  form.style.marginTop = "100px";

  puppyNameInput.style.padding = "10px";
  puppyNameInput.style.margin = "10px";
  dogBreedInput.style.padding = "10px";
  dogBreedInput.style.margin = "10px";
  imgURL.style.padding = "10px";
  imgURL.style.margin = "10px";

  formH1.style.letterSpacing = "3px";
  formH1.style.width = "500px";

  function applyFontToElements() {
    var elements = document.querySelectorAll("body");
    elements.forEach(function (element) {
      element.style.fontFamily = "Montserrat, sans-serif";
      element.style.wordSpacing = "23px";
      element.style.display = "grid";
      element.style.justifyItems = "center";
    });
  }

  // Load the font and apply it to the elements after it has finished loading
  var link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  link.addEventListener("load", applyFontToElements);

  const playerObj = {
    name: puppyNameInput.value,
    breed: dogBreedInput.value,
    imageURL: imgURL.value,
    status: "active",
    teamID: null,
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const playerName = puppyNameInput.value;
    const playerBreed = dogBreedInput.value;
    const playerImageUrl = imgURL.value;

    const newPlayer = {
      name: playerName,
      breed: playerBreed,
      status: "bench",
      imageUrl: playerImageUrl,
      teamId: null,
    };

    await addNewPlayer(newPlayer);

    puppyNameInput.value = "";
    dogBreedInput.value = "";
    imgURL.value = "";
  });
};

const init = async () => {
  renderNewPlayerForm();
  const allPlayers = await fetchAllPlayers();
  renderAllPlayers(allPlayers, playerContainer);
};

init();
