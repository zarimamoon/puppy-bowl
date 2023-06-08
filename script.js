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
    const result = await response.json();
    const allPlayers = result.data.players;
    console.log(allPlayers);
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
    await fetchAllPlayers();
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
    allH1.className = 'title';

    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.setAttribute('data-player-id', player.id);
      playerElement.classList.add("player");
      playerElement.className = "play";

      const nameElement = document.createElement("h2");
      nameElement.textContent = player.name;
      playerElement.appendChild(nameElement);
      nameElement.className = "playerNAME";

      const breedElement = document.createElement("p");
      breedElement.textContent = player.breed;
      //playerElement.appendChild(breedElement);
      breedElement.className = "breed";

      const statusElement = document.createElement("p");
      statusElement.textContent = player.status;
      //playerElement.appendChild(statusElement);
      statusElement.className = "status";

      const imageUrlElement = document.createElement("p");
      imageUrlElement.textContent = player.imageUrl;
      //playerElement.appendChild(imageUrlElement);
      imageUrlElement.className = "image";

      const teamIdElement = document.createElement("p");
      teamIdElement.textContent = player.teamId;
      //playerElement.appendChild(teamIdElement);

      playerContainer.appendChild(playerElement);


      //detail button
      const button = document.createElement('button');
      button.className = "dButton";
      button.innerText = 'Details';

      button.addEventListener('click', async () => {
      try {
        const playerId = playerElement.getAttribute('data-player-id');
        const singlePlayer = await fetchSinglePlayer(playerId);
        console.log("Name of dog: " + player.name);
        console.log("Breed of Dog: " + player.breed);
        console.log("Status of dog: " + player.status);
        console.log("Team ID of dog: " + player.teamId);
        console.log("Image URL of dog: " + player.imageUrl);
        alert(`Name of dog: ${player.name}\nBreed of dog: ${player.breed}\nStatus: ${player.status}\nTeam ID: ${player.teamId}\nImage URL: ${player.imageUrl}`);
        } catch (error) {
         console.error(`Error occurred while fetching details for player #${player.id}`, error);
        }
      });

      playerElement.appendChild(button);


      //delete button 
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.innerText = 'Remove';
      deleteButton.addEventListener('click', async (event) => {
      try {
        playerElement.remove();
        const playerId = playerElement.getAttribute('data-player-id');
        await removePlayer(playerId);
        console.log(`Player with ID ${playerId} removed from the API.`);
        // Fetch and render updated player list
        const updatedPlayers = await fetchAllPlayers();
        renderAllPlayers(updatedPlayers, playerContainer);
        } catch (error) {
        console.error('Error occurred while removing player:', error);
      }
      });

      playerElement.appendChild(deleteButton);
 

     
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
  const imgURLInput = document.createElement("input");
  imgURLInput.setAttribute("id", "imgValue");
  imgURLInput.setAttribute("type", "text");
  imgURLInput.setAttribute("name", "imgURL");
  imgURLInput.setAttribute("placeholder", "Image URL of puppy");
  form.appendChild(imgURLInput);

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
  imgURLInput.style.padding = "10px";
  imgURLInput.style.margin = "10px";

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
