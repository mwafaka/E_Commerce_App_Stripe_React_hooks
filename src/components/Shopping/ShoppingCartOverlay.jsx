import { useState } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartProduct from "./ShoppingCartProduct";
////stripe///
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import "firebase/auth";

function ShoppingCartOverlay({ removeFromCart, data }) {
  //////stripe/////

  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) {
      return;
    }

    // Create a payment intent on your Cloud Function
    const functions = getFunctions();
    const createStripeCheckout =  httpsCallable(
      functions,
      "createStripePayment"
    );

  
  const response = await createStripeCheckout();
  console.log(response.data);

    // const { sessionId } = response.data;
    // console.log(response.data);
  
    // await stripe.redirectToCheckout({ sessionId });
  };

  /////////

  const closeOverlay = () => {
    document.getElementById("overlay").style.display = "none";
  };

  const [cartItems, setCartItems] = useState(data.itemsInCart);

  const updateAmountToPay = () => {
    // eslint-disable-next-line no-unused-vars
    let newAmountToPay = 0;
    // eslint-disable-next-line no-unused-vars
    let newNumberOfItems = 0;

    cartItems.forEach((item) => {
      newAmountToPay += item.price * item.quantityInCart;
      newNumberOfItems += item.quantityInCart;
    });
  };

  const removeFromCartHandler = (item, indexInCart) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(indexInCart, 1);

    setCartItems(updatedCartItems);
    removeFromCart(item, indexInCart);
    updateAmountToPay();
  };

  const handleQuantityChange = (item, newQuantity) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantityInCart = newQuantity;
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);
    updateAmountToPay();
  };

  let items = cartItems.map((item, index) => (
    <ShoppingCartProduct
      key={index}
      item={item}
      indexInCart={index}
      removeFromCart={removeFromCartHandler}
      handleQuantityChange={handleQuantityChange}
    />
  ));

  let amountToPay = 0;
  let numberOfItems = 0;

  cartItems.forEach((item) => {
    amountToPay += item.price * item.quantityInCart;
    numberOfItems += item.quantityInCart;
  });

  return (
    <div id="overlay" style={{ index: 7 }}>
      <section id="shopping-cart">
        <div id="cart-header">
          <span id="cart-title">Shopping Cart</span>
          <FontAwesomeIcon
            style={{ color: "red" }}
            icon={faTimesCircle}
            onClick={closeOverlay}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
        <span id="empty-cart">
          {items.length === 0 ? "Shopping cart is empty" : ""}
        </span>
        <h3 id="cart-total">Cart Total</h3>
        <div id="totals">
          <span>Cart Totals</span>
          <span>Number of items: {numberOfItems}</span>
          <span>Total: € {amountToPay}</span>
        </div>

        <button
          id="checkout"
          disabled={items.length === 0}
          onClick={() => handlePay()}
        >
          {/* <CardElement  />  */}
          Checkout
        </button>
      </section>
    </div>
  );
}

export default ShoppingCartOverlay;
