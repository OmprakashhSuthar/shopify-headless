const express = require('express');
const app = express.Router();

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const after = req.query.after || null;

    const query = `
      query FetchProductSample {
        products(first: ${limit}${after ? `, after: "${after}"` : ''}) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              title
              description
              featuredImage {
                url
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
        const response =
            await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                },
                body: JSON.stringify({ query }),
            });

        if (!response.ok) {
            throw new Error(`GraphQL API returned status: ${response.status}`);
        }

        const result = await response.json();

        const edges = result.data.products.edges;
        const products = edges.map(edge => ({
            ...edge.node,
            cursor: edge.cursor,
        }));

        const nextPageCursor = result.data.products.pageInfo.hasNextPage && edges.length > 0
            ? edges[edges.length - 1].cursor
            : null;

        return res.json({
            products,
            pageInfo: result.data.products.pageInfo,
            nextPageCursor,
            limit,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;















// async function fetchShopifyAPI(method, query = {}) {
//     try {
//         const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//             },
//             body: JSON.stringify({ query }),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         }

//         const data = await response.json();

//         if (data.errors && data.errors.length > 0) {
//             throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
//         }

//         return data;
//     } catch (error) {
//         throw new Error(`Failed to fetch Shopify API: ${error.message}`);
//     }
// }