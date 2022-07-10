import React from "react";
import Link from "next/link";

const ProductList = ({ products }) => {
  return (
    <>
      <h1>ProductList</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link href={`/products/${product.id}`} passHref>
              <h2>
                {product.id} {product.title}
              </h2>
            </Link>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default ProductList;

export async function getStaticProps() {
  console.log("Generating / Regenerating ProductList");
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();
  //   console.log(data);
  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
}
