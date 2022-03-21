import { createContext, useContext, useReducer } from "react";
import { UserState } from "../contexts/UserContext";
import axios from "axios";
import { BACKEND_DOMAIN } from "../api/backend";
const WatchListContextAccess = createContext();

const WatchListContext = ({ children }) => {
  const defaultState = {
    forex: [],
    crypto: [],
  };
  const { user } = UserState();
  const watchListInitializer = async () => {
    // console.log("spamming!!!");
    const identity = {
      userId: user?.uid,
    };
    // const data = await axios
    //   .get(`${BACKEND_DOMAIN}/watchlist/getwatchlist`, identity)
    //   .then((response) => {
    //     return response.data;
    //   });
    dispatch({ type: "INITIALISE" });
    // dispatch({ type: "INITIALISE", payload: data });
  };
  const watchListReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
      //prepare data to pass to server endpoint to add to mongodb user collection based on userId
      const newData = {
        userId: user?.uid,
        market: action.payload.market,
        item: {
          name: action.payload.item.name,
          image: action.payload.item.image,
          symbol: action.payload.item.symbol,
        },
      };
      console.log("newData before", newData);
      // try {
      //   console.log("newData before123");
      //   axios
      //     .post(`${BACKEND_DOMAIN}/watchlist/addsymbol`, newData)
      //     .then((response) => {
      //       console.log("NEW DATA");
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
        item: {
          name: action.payload.name,
          image: action.payload.image,
          symbol: action.payload.symbol,
        },
      };
      // try {
      //   axios
      //     .post(`${BACKEND_DOMAIN}/watchlist/removesymbol`, oldData)
      //     .then((response) => {
      //       console.log(response.status);
      //       console.log(response.data);
      //     });
      // } catch (error) {
      //   console.log(error);
      // }
      //filter out object from forex/crypto array based on object property: symbol (name of crypto/forex)
      const newItem = state[action.payload.market].filter((object) => {
        console.log("checking logic");
        console.log(object, action.payload.item.symbol);
        return object.symbol !== action.payload.item.symbol;
      });
      console.log(newItem);
      return { ...state, [action.payload.market]: newItem };
    }
    if (action.type === "INITIALISE") {
      // const identity = {
      //   userId: user?.uid,
      // };

      // return action.payload;
      return state;
    }

    if (action.type === "CREATE_RECORD") {
      console.log("checking payload for create", action.payload);
      try {
        axios
          .post(`${BACKEND_DOMAIN}/watchlist/adduser`, action.payload)
          .then((response) => {
            console.log(response.status);
            console.log(response.data);
          });
      } catch (error) {
        console.log(error);
      }
      console.log(action.payload);
      return action.payload.watchlist;
    }

    throw new Error("no matching action type");
  };
  const [watchList, dispatch] = useReducer(watchListReducer, defaultState);

  return (
    <WatchListContextAccess.Provider
      value={{ watchList, dispatch, watchListInitializer }}
    >
      {children}
    </WatchListContextAccess.Provider>
  );
};

export default WatchListContext;

export const WatchListState = () => {
  return useContext(WatchListContextAccess);
};
