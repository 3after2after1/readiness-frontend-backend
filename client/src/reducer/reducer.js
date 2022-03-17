// const defaultState = {
//   forex: [],
//   crypto: [],
// };
import { UserState } from "../contexts/UserContext";
import axios from "axios";

export const watchListReducer = (state, action) => {
  const { user } = UserState();
  if (action.type === "ADD_ITEM") {
    //prepare data to pass to server endpoint to add to mongodb user collection based on userId
    const newData = {
      userId: user?.uid,
      market: action.payload.market,
      symbol: action.payload.symbol,
      item: {
        name: action.payload.symbol,
        image: action.payload.image,
      },
    };
    // try {
    //   axios
    //     .post("http://localhost:5000/watchlist/addsymbol", newData)
    //     .then((response) => {
    //       console.log(response.status);
    //       console.log(response.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    const newItem = [...state[action.payload.market], action.payload.item];
    //create new array for forex/crypto by appending new item to existing array
    return {
      ...state,
      [action.payload.market]: newItem,
    };
    //update the state
  }
  if (action.type === "REMOVE_ITEM") {
    //prepare data to pass to server endpoint to remove from mongodb user collection based on userId
    const oldData = {
      userId: user?.uid,
      market: action.payload.market,
      symbol: action.payload.symbol,
      item: {
        name: action.payload.name,
        image: action.payload.image,
      },
    };
    // try {
    //   axios
    //     .post("http://localhost:5000/watchlist/removesymbol", oldData)
    //     .then((response) => {
    //       console.log(response.status);
    //       console.log(response.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    //filter out object from forex/crypto array based on object property: symbol (name of crypto/forex)
    const newItem = state[action.payload.market].filter((item) => {
      console.log("checking logic");
      console.log(item, action.payload.symbol);
      return item.symbol !== action.payload.symbol;
    });
    console.log(newItem);
    return { ...state, [action.payload.market]: newItem };
  }
  if (action.type === "INITIALISE") {
    let data = null;
    const identity = {
      userId: user?.uid,
    };
    // try {
    //   data = axios
    //     .get("http://localhost:5000/watchlist//getwatchlist", identity)
    //     .then((response) => {
    //       return response.data;
    //     });
    // } catch (error) {
    //   console.log(error);
    // }

    return data || console.log("data not loaded!");
  }

  throw new Error("no matching action type");
};
