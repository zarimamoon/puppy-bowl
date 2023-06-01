const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-C';
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
      console.log(allPlayers);
      return allPlayers;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}/players/${playerId}`);
      const singlePlayer = await response.json();
      console.log(singlePlayer)
      return singlePlayer;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
     const response = await fetch(`${APIURL}/players/`, {
            method: 'POST', 
            body: JSON.stringify(playerObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);
        fetchAllPlayers();
        
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};


const removePlayer = async (playerId) => {
    try {
       const response = await fetch(`${APIURL}/players/${playerId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log(result);
        fetchAllPlayers();

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err);
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
      playerContainer.innerHTML = 'All Players';
      
      const playersArray = Array.from(playerList);
      playersArray.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player');
      playerElement.innerHTML = `
                <h2>${player.name}</h2>
                <p>${player.description}</p>
                <p>${player.date}</p>
                <p>${player.time}</p>
                <p>${player.location}</p>
                <button class="details-button" data-id="${player.id}">See Details</button>
                <button class="delete-button" data-id="${player.id}">Delete</button>
            `;
      playerContainer.appendChild(playerElement); 
      
    });

    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
/* create form thru DOM - Dana */
const renderNewPlayerForm = async () => {
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', `${APIURL}/players`)
  form.setAttribute('id', 'signUpForm');

  const formH1 = document.createElement("h1");  
  formH1.innerHTML = "Yay, puppies! Join a Puppy Bowl team today!";
  form.appendChild(formH1);

  // Create an input element for Puppy Name
  const puppyNameInput = document.createElement("input");
  puppyNameInput.setAttribute("id", "puppyValue")
  puppyNameInput.setAttribute("type", "text");
  puppyNameInput.setAttribute("name", "puppyName");
  puppyNameInput.setAttribute("placeholder", "Puppy Name");
  form.appendChild(puppyNameInput);

  const dogBreedInput = document.createElement("input");
  dogBreedInput.setAttribute("id", "breedValue")
  dogBreedInput.setAttribute("type", "text");
  dogBreedInput.setAttribute("name", "dogBreed");
  dogBreedInput.setAttribute("placeholder", "Breed");
  form.appendChild(dogBreedInput);

  const imgURL = document.createElement("input");
  imgURL.setAttribute("id", "imgValue")
  imgURL.setAttribute("type", "text");
  imgURL.setAttribute("name", "imgURL");
  imgURL.setAttribute("placeholder", "Image URL of puppy");
  form.appendChild(imgURL);

  // create a submit button
  const submit = document.createElement("input");
  submit.setAttribute("id", "submitValue")
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  form.appendChild(submit);

  // Append the form to the newPlayerFormContainer element
  newPlayerFormContainer.appendChild(form);

  // Apply styles to the form
  document.getElementById("new-player-form").style.background = "#c2c6f9";
  document.getElementById("new-player-form").style.display = "grid";
  document.getElementById("new-player-form").style.height = "600px";
  document.getElementById("new-player-form").style.width = "600px";
  document.getElementById("new-player-form").style.justifyContent = "center";
  document.getElementById("new-player-form").style.alignContent = "center";
  document.getElementById("new-player-form").style.marginTop = "100px";

  document.getElementById("puppyValue").style.padding = "10px";
  document.getElementById("puppyValue").style.margin = "10px";
  document.getElementById("breedValue").style.padding = "10px";
  document.getElementById("breedValue").style.margin = "10px";
  document.getElementById("imgValue").style.padding = "10px";
  document.getElementById("imgValue").style.margin = "10px";

  document.querySelector("h1").style.letterSpacing = "3px";
  document.querySelector("h1").style.width = "500px";

  function applyFontToElements() {
    var elements = document.querySelectorAll('body');
    elements.forEach(function(element) {
      element.style.fontFamily = 'Montserrat, sans-serif';
      element.style.wordSpacing = "23px";
      element.style.display = "grid";
      element.style.justifyItems = "center";
    });
  }

  // Load the font and apply it to the elements after it has finished loading
  var link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  link.addEventListener('load', function() {
    applyFontToElements();
  });

try {
    const players = await fetchAllPlayers();
    renderAllPlayers(players, playerContainer);
  }     
     catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    
     }
    }
    
const init = async () => {
  renderNewPlayerForm();
  const allPlayers = await fetchAllPlayers();
  renderAllPlayers(allPlayers, playerContainer);
};

init(); 

