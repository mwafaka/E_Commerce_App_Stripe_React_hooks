import { useState } from "react";
import "../../styles/ShoppingCart.css";
import Header from "./Header";
import ShoppingCartOverlay from "./ShoppingCartOverlay";
import ProductList from "./ProductList";
import { loadStripe } from '@stripe/stripe-js';
import {Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51GqiCaF4DrgLkK0ui3cpz5Bab7LYUbFN45S39tPXElXyMTChptOSN5vBOw8sqazt9q0VpmxbZWKZPJkT0pV50G3A00r2BJ0UTA');

const shoppingProducts = [
  {
    id: 0,
    name: "Nike VaporFly 4% Flyknit",
    price: 209,
    image:
      "https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/acmoik7t1kfbprm8hsqs/vaporfly-4-flyknit-running-shoe-7R7zSn.jpg",
    quantityInCart: 0,
    inCart: false,
  },
  {
    id: 1,
    name: "Nike Air Monarch IV PR",
    price: 89,
    image:
      "https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/vjsleghax3228bpidanh/air-monarch-iv-pr-shoe-qf64pl.jpg",
    quantityInCart: 0,
    inCart: false,
  },
  {
    id: 2,
    name: "Nike Air Max Deluxe SE",
    price: 149,
    image:
      "https://c.static-nike.com/a/images/f_auto,b_rgb:f5f5f5,w_880/rkhls7wdxdydeg1vkwkt/air-max-deluxe-se-shoe-T6Vkl2.jpg",
    quantityInCart: 0,
    inCart: false,
  },
];

function ShoppingCartApp() {
  const [state, setState] = useState({
    items: shoppingProducts,
    quantity: 0,
    amountToPay: 0,
    itemsInCart: [],
  });

  const addToCart = (item) => {
    state.itemsInCart.push(state.items[item.id]);
    shoppingProducts[item.id].inCart = true;
    shoppingProducts[item.id].quantityInCart = 1;
    setState({
      quantity: state.quantity + 1,
      amountToPay: state.amountToPay + state.items[item.id].price,
      itemsInCart: state.itemsInCart,
      items: shoppingProducts,
    });
  };
  const removeFromCart = (item, indexInCart) => {
    shoppingProducts[item.id].inCart = false;
    shoppingProducts[item.id].quantityInCart = 0;
    state.itemsInCart.splice(indexInCart, 1);
    setState({
      quantity: state.quantity - 1,
      amountToPay: state.amountToPay - state.items[item.id].price,
      itemsInCart: state.itemsInCart,
      items: shoppingProducts,
    });
  };

  return (
    <main id="main">
      <Elements stripe={stripePromise}>
      <Header quantity={state.quantity} amountToPay={state.amountToPay} />
      <ShoppingCartOverlay data={state} removeFromCart={removeFromCart} />
      <ProductList itemsInCart={state.items} addToCart={addToCart} />
      </Elements>
    </main>
  );
}

export default ShoppingCartApp;
