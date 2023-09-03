import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function ShoppingCartProduct({
  item,
  indexInCart,
  removeFromCart,
  handleQuantityChange,
}) {
  const handleRemoveFromCart = () => {
    removeFromCart(item, indexInCart);
  };

  const [quantity, setQuantity] = useState(item.quantityInCart);

  const handleQuantityInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      handleQuantityChange(item, newQuantity);
    }
  };

  return (
    <tr className="items-in-cart">
      <td>
        <img src={item.image} alt={item.name} />
      </td>
      <td>{item.name}</td>
      <td>€{item.price}</td>
      <td>
        <input
          type="number"
          name="quantity"
          min="1"
          max="10"
          value={quantity}
          onChange={handleQuantityInputChange}
        />
      </td>
      <td>€{item.price * quantity}</td>
      <td>
        <FontAwesomeIcon
          style={{ color: "red" }}
          icon={faTrash}
          onClick={handleRemoveFromCart}
        />
      </td>
    </tr>
  );
}

export default ShoppingCartProduct;
