import axios from "axios";

class GameService {
  static getGames = async (url, email, auth) => {
    const response = await axios.get(url,{
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static getGame = async (url, email, auth) => {
    const response = await axios.get(url,{
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static deleteGame = async (url, email, auth) => {
    const response = await axios.delete(url,{
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static updateGame = async (url, game, email, auth) => {
    const response = await axios.put(url, game, {
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static createGame = async (url, game, email, auth) => {
    const response = await axios.post(url, game,{
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }
}

export default GameService;