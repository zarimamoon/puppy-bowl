const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");
const bodyDiv = document.querySelector("body");

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
    const result = await response.json();
    const allPlayers = result.data.players;
    console.log(result);
    return allPlayers;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const singlePlayer = await response.json();
    console.log(singlePlayer);
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

/*
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

// Create single player cards
const renderAllPlayers = async (playerList, playerContainer) => {
  try {
    // create a header for All Players
    const allH1 = document.createElement("h1");
    allH1.innerHTML = "All Puppies";
    playerContainer.appendChild(allH1);

    //loop through player objects
    playerList.forEach((player) => {
      const playerCard = document.createElement("div");
      playerCard.classList.add("card");

      const nameElement = document.createElement("h2");
      nameElement.textContent = player.name;
      playerCard.appendChild(nameElement);

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("buttons");
      playerCard.appendChild(buttonContainer);

      // Create the "See Details" button
      const detailsButton = document.createElement("button");
      detailsButton.classList.add("details-button");
      detailsButton.setAttribute("data-id", player.id);
      detailsButton.textContent = "See Details";
      buttonContainer.appendChild(detailsButton);

      // Create the "Delete" button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-id", player.id);
      deleteButton.textContent = "Delete";
      buttonContainer.appendChild(deleteButton);

      playerContainer.appendChild(playerCard);

      // Add Event listener for "See details" button

      // Add add Event listener for "Remove from roster" button

      // After deleting the party, re-render all parties
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
  puppyNameInput.setAttribute("placeholder", "Puppy's Name");
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

  // add event listener to submit button
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

    console.log(newPlayer);

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
