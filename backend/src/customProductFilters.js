const express = require("express");
const app = express.Router();
const https = require("https");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const agent = new https.Agent({ family: 4 });

app.post('/customFilter', async (req, res) => {
  const { limit = 100, after = null, filters = {}, collectionId = "Blinds" } = req.body;

  const filterEntries = [];

  for (const [key, values] of Object.entries(filters)) {
    values.forEach(value => {
      if (key.toLowerCase() === 'size') {
        filterEntries.push(`{variantOption: {name: "${key}", value: "${value}"}}`);
      } else if (key.toLowerCase() === 'brand') {
        filterEntries.push(`{productVendor: "${value}"}`);
      } else {
        filterEntries.push(`{variantOption: {name: "${key}", value: "${value}"}}`);
      }
    });
  }

  const filtersQuery = filterEntries.length
    ? `filters: [${filterEntries.join(',')}]`
    : '';

  const query = `
        query GetCollectionFilters {
            collection(handle: "${collectionId}") {
                id
                title
                products(first: ${limit}${after ? `, after:"${after}"` : ''}${filtersQuery ? `, ${filtersQuery}` : ''}) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            id,
                            title,
                            handle
                            description,
                            priceRange {
                                minVariantPrice {
                                    amount
                                },
                                maxVariantPrice {
                                    amount
                                }
                            },
                            featuredImage {
                                url
                            }
                        }
                    },
                    filters {
                        id
                        label
                        type
                        values {
                            id
                            label
                            count
                        }
                    }
                }
            }
        }`;
  console.log(query)
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
      throw new Error(`GraphQL API returned status: ${response.status}`);
    }

    const result = await response.json();
    const edges = result.data.collection.products.edges;
    const products = edges.map(edge => ({
      ...edge.node,
      cursor: edge.cursor,
    }));

    const nextPageCursor = result.data.collection.products.pageInfo.hasNextPage && edges.length > 0
      ? edges[edges.length - 1].cursor
      : null;

    const filters = result.data.collection.products.filters;

    const brandFilter = filters.find(f => f.label.toLowerCase() === 'brand');
    const colorFilter = filters.find(f => f.label.toLowerCase() === 'color');
    const sizeFilter = filters.find(f => f.label.toLowerCase() === 'size');

    return res.json({
      fullResponse: result,
      products: {
        products,
        pageInfo: result.data.collection.products.pageInfo,
        nextPageCursor,
        limit
      },
      filters: {
        brand: brandFilter,
        color: colorFilter,
        size: sizeFilter,
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;