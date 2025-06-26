const express = require("express");
const app = express.Router();

app.post('/productDetails', async (req, res) => {
  const productID = req.body.productId || "tshirt";
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
              variantsCount {
                count
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

app.post('/getVarients', async (req, res) => {
  const productID = req.body.productId || "tshirt";
  const query = `
     query getVarient {
      product(handle: "${productID}") {
        variants(first: 100) {
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
              selectedOptions {
                name
                value
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
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL API returned status: ${response.status}`);
    }

    const variants = await response.json();
    const variantEdges = variants.data.product.variants.edges;

    const availableVariants = variantEdges.filter(({ node }) => node.availableForSale);

    const groupedVariants = availableVariants.reduce((obj, { node }) => {
      const options = node.selectedOptions.reduce((obj, { name, value }) => {
        const lowerName = name.toLowerCase();
        if (lowerName === 'color') obj.color = value;
        if (lowerName === 'size') obj.size = value;
        return obj;
      }, {});

      if (!options.color || !options.size) return obj;

      console.log(obj[options.color]);

      if (!obj[options.color]) {
        obj[options.color] = { sizes: [], price: node.price };
      }

      console.log(obj[options.color]);

      if (!obj[options.color].sizes.includes(options.size)) {
        obj[options.color].sizes.push({ size: options.size, price: node.price });

      }
      console.log(obj)
      return obj;
    }, {});


    const responseData = {
      availableColors: Object.keys(groupedVariants),
      colorDetails: groupedVariants,
    };
    console.log(responseData)
    return res.json(responseData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = app;