exports.createPages = async ({ actions: { createPage }, graphql }) => {
  createPage({
    path: "/no-data/",
    component: require.resolve("./src/templates/no-data.js"),
  });

  createPage({
    path: "/page-with-context/",
    component: require.resolve("./src/templates/page-with-context.js"),
    context: {
      title: "We Don’t Need No Stinkin’ GraphQL!",
      content: "<p>This is page content.</p><p>No GraphQL required!</p>",
    },
  });

  const results = await graphql(`
    {
      allProductsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  results.data.allProductsJson.edges.forEach((edge, index) => {
    const product = edge.node;

    createPage({
      path: `/gql/${product.slug}/`,
      component: require.resolve("./src/templates/product-graphql.js"),
      context: {
        slug: product.slug,
        test: product.slug + `---${index}`,
      },
    });
  });
};
