const express = require("express");
const app = express.Router();

app.get('/menu', async (req, res) => {
  const query = `
    query getMenus {
        menu(handle: "gnb-menu") {
          id
          title
          items {
            id
            title
            url
            resourceId
            type
            items {
              id
              title
              url
              resourceId
              type
              items {
                id
                title
                url
                resourceId
                type
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
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`GraphQL API returned status: ${response.status}`)
    }

    const menuData = await response.json();
    const menuItems = menuData?.data?.menu?.items || [];

    return res.json(
      menuItems,
    );

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;