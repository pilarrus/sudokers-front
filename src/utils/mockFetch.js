import sudokus from "../fake-data/sudokus";
import users from "../fake-data/users";
import ranking from "../fake-data/ranking";

const mockFetch = url =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (url) {
        case "/users": {
          return resolve(users);
        }
        case "/sudokus": {
          return resolve(sudokus);
        }
        case "/ranking": {
          return resolve(ranking);
        }
        default: {
          reject("Invalid end point");
        }
      }
    }, 1000);
  });

export default mockFetch;
