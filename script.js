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
    console.log(response);
    return response.status;
    // const players = await fetchAllPlayers();
    // renderAllPlayers(players, playerContainer);
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
function templateAllPlayer(player) {
  const playerCard = document.createElement("div");
  playerCard.classList.add("card");
  playerCard.setAttribute('data-player-id', player.id);

  const nameElement = document.createElement("h2");
  nameElement.textContent = player.name;
  playerCard.appendChild(nameElement);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons");
  playerCard.appendChild(buttonContainer);

  //detail button

  const button = document.createElement('button');
  button.className = 'dButton';
  button.innerText = 'Details';

  button.addEventListener('click', async () => {
    try {
    const playerId = playerCard.getAttribute('data-player-id');
    const singlePlayer = await fetchSinglePlayer(playerId);
    const { name, breed, status, teamId, imageUrl } = singlePlayer.data.player;
    console.log("name of dog: " + name + "\nbreed of dog: " + breed + "\nstatus of dog: " + status + "\nTeam ID of dog: " + teamId + "\nImage URL od dog: " + imageUrl);
    alert(`Name of dog: ${name}\nBreed of dog: ${breed}\nStatus: ${status}\nTeam ID: ${teamId}\nImage URL: ${imageUrl}`);
    } catch (error) {
    console.error(`Error occurred while fetching details for player #${playerId}`, error);
    }
  });

    buttonContainer.appendChild(button);

 
    //delete button 
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerText = 'Remove';
    deleteButton.addEventListener('click', async (event) => {
    try {
      playerCard.remove();
      const playerId = playerCard.getAttribute('data-player-id');
      await removePlayer(playerId);
      console.log(`Player with ID ${playerId} removed from the API.`);
      
      
      } catch (error) {
      console.error('Error occurred while removing player:', error);
    }
    });

    buttonContainer.appendChild(deleteButton);
  

  return playerCard
}
// Create single player cards
const renderAllPlayers = async (playerList, playerContainer) => {
  try {
    // create a header for All Players
    const allH1 = document.createElement("h1");
    allH1.innerHTML = "All Puppies";
    playerContainer.appendChild(allH1);

    //loop through player objects
    //end of code to make function because it repeats itself later
    playerList.forEach((player) => {
      const playerCard = templateAllPlayer(player)
      playerContainer.appendChild(playerCard);


      //end of code to make function because it repeats itself later

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

    const player = {
      name: playerName,
      breed: playerBreed,
      status: "bench",
      imageUrl: playerImageUrl,
      teamId: null,
    };

    console.log(player);

    const status = await addNewPlayer(player);

    // start of code that repeats itself that needs function
    if (status === 200) {
      const playerCard =
        templateAllPlayer(player)
      playerContainer.appendChild(playerCard);
    }
    //// end of code that repeats itself that needs function

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