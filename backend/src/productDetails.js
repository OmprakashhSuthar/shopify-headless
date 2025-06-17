const express = require("express");
const app = express.Router();
const https = require("https");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const agent = new https.Agent({ family: 4 });

app.post('/productDetails', async (req, res) => {
  const { productID = "tshirt" } = req.body;
  const query = `
        query getProduct {
            product(handle: "${productID}") {
              id
              title
              handle
              description
              descriptionHtml
              vendor
              productType
              tags
              availableForSale
              totalInventory
              featuredImage {
                altText,
                height,
                width,
                id,
                src,
                url,
            }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              options {
                id
                name
                values
              }
              images(first: 20) {
                edges {
                  node {
                    id
                    url
                    src
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 20) {
                edges {
                  node {
                    id
                    title
                    sku
                    availableForSale
                    quantityAvailable
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      id
                      url
                      altText
                    }
                  }
                }
              }
            }
        }
    `
  try {
    const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
      agent
    });
    if (!response.ok) {
      throw new Error(`GraphQL API returned status: ${response.status}`)
    }

    const productData = await response.json();
    return res.json(
      { productData: productData.data },
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = app;