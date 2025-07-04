const express = require("express");
const app = express.Router();
const https = require("https");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const agent = new https.Agent({ family: 4 });

app.post('/search', async (req, res) => {
  const variables = {
    query: `title:*${req.body.q}*`,
    first: 20
  };

  const query = `
      query SearchProducts($query: String!, $first: Int!) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage{
                src
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                },
                maxVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      }),
      agent
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = app;
