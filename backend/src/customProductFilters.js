const express = require("express");
const app = express.Router();

app.get('/customFilter', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const after = req.query.after || null;
    const query = `
        query GetCollectionFilters {
            collection(handle: "Blinds") {
                id
                title
                products(first: ${limit}${after ? `, after:"${after}"` : ''}) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            id,
                            title,
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

    try {
        const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
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
        const edges = result.data.collection.products.edges;
        const products = edges.map(edge => ({
            ...edge.node,
            cursor: edge.cursor,
        }));

        const nextPageCursor = result.data.collection.products.pageInfo.hasNextPage && edges.length > 0
            ? edges[edges.length - 1].cursor
            : null;

        const filters = result.data.collection.products.filters;
        const brandFilter = filters.find(f => f.label === 'Brand');
        const colorFilter = filters.find(f => f.label === 'Color');
        const sizeFilter = filters.find(f => f.label === 'Size');

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