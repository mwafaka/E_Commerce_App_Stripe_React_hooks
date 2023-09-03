import ShoppingCart from "./ShoppingCart";

function Header({ quantity, amountToPay }) {
  return (
    <header id="header">
      <ShoppingCart quantity={quantity} amountToPay={amountToPay} />
    </header>
  );
}

export default Header;
