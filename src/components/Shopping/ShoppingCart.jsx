import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function ShoppingCart({ quantity }) {
  const showOverlay = () => {
    document.getElementById("overlay").style.display = "flex";
    document.querySelector("body").style.overflow = "hidden";
  };

  return (
    <div id="cart">
      <span className={quantity == 0 ? "hide-price" : ""}>{quantity}</span>
      <FontAwesomeIcon icon={faShoppingCart} onClick={showOverlay} />
    </div>
  );
}

export default ShoppingCart;
