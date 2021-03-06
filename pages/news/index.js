import React from "react";

const index = ({ articles }) => {
  return (
    <>
      <h1>List of Articles</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} {article.title} | {article.category}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default index;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();
  console.log("Pre-rendering ArticleList");
  return {
    props: {
      articles: data,
    },
  };
}
