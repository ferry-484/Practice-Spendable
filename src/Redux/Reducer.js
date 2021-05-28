export default (state, action) => {
  switch (action.type) {
    case "HANDLE_SIDEBAR_TEXT":
      return { ...state, Header: action.payload };

    // case "LOGGEDIN_USER_NAME":
    //   return { ...state, loggedInUserName: action.payload };

    // case "LOGGEDIN_USERID":
    //   return { ...state, loggedInUserID: action.payload };
    case "SHOW_BACK":
      return {
        ...state,
        showBack: action.payload.value,
        backPath: action.payload.backPath
      };

    case "USER_ROLE":
      return {
        ...state,
        role: action.payload
      };

    case "SHOW_CART_ICON":
      return { ...state, showCartIcon: action.payload };

    case "Show_Sidebar_Route":
      return { ...state, sidebarRoute: action.payload };

    case "Cart_Counter_Add":
      return { ...state, cartCounter: action.payload };

    case "Cart_Price_Add":
      return { ...state, cartPrice: action.payload };
    default:
      return state;
  }
};
