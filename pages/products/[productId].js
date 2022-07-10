import React from "react";
import { useRouter } from "next/router";

const Product = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>
        id:{product.id} title:{product.title} price:{product.price}
      </h2>
      <p>{product.description}</p>
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: "1" } },
      { params: { productId: "2" } },
      { params: { productId: "3" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  console.log(`Generating page for /products/${params.productId}`);
  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
}
