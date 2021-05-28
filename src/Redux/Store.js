import { createStore } from "redux";
import rootReducer from "./Reducer";

const initialState = {
  Header: "Surveillance",
  // userName: "User",
  showBack: false,
  showCartIcon: false,
  backPath: "/",
  role: "",
  sidebarRoute: "",
  cartCounter: 0,
  cartPrice: 0
};

const store = createStore(rootReducer, initialState);
export default store;
