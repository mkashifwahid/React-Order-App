import { createContext, useReducer } from 'react';

export const Store = createContext();

const initalState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.ItemId === newItem.itemId
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.itemId === existItem.itemId ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state.cart, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(useReducer, initalState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
