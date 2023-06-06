// modules.js is to use ES6 modules to export and import methods and properties:

// Creates export fetchAllPlayers
export const fetchAllPlayers = async () => {
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
  };

// Creates export fetchSinglePlayer
  export const fetchSinglePlayer = async (playerId) => {
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
  };

// Creates export addNewPlayer
  export const addNewPlayer = async (playerObj) => {
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
  };

// Creates export removePlayer
  export const removePlayer = async (playerId) => {
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
  };