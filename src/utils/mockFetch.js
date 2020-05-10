import sudokus from "../fake-data/sudokus";
import users from "../fake-data/users";

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
        default: {
          reject("Invalid end point");
        }
      }
    }, 1000);
  });

export default mockFetch;
