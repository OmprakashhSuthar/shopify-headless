const express = require('express');
const app = express.Router();

app.get('/filters', async (req, res) => {
    const query =
        `query GetAvailableFilters {
            collection(handle: "Blinds") {
            handle
            products(first: 10) {
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
                "Content-Type": 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        const filters = data.data.collection.products.filters;
        const brandFilter = filters.find(f => f.label === 'Brand');
        const colorFilter = filters.find(f => f.label === 'Color');
        const sizeFilter = filters.find(f => f.label === 'Size');

        res.json({
            brand: brandFilter,
            color: colorFilter,
            size: sizeFilter,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = app;
