import Product from "./Product";

function ProductList({ itemsInCart, addToCart }) {
  let item = itemsInCart.map((item) => {
    return <Product key={item.id} item={item} addToCart={addToCart} />;
  });
  return (
    <section
      style={{
        margin: "2em 2em 2em 2em",
        display: "flex",
        alignItems: "center",
        marginTop: "15%",
      }}
    >
      {item}
    </section>
  );
}

export default ProductList;
