const express = require("express");
const app = express.Router();

async function getToken(email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const query = `
        mutation customerAccessTokenCreate($email: String!, $password: String!) {
            customerAccessTokenCreate(input: {email: $email, password: $password}) {
                customerAccessToken {
                    accessToken
                }
                customerUserErrors {
                    message
                    code
                }
            }
        }`;

    const variables = { email, password };

    try {
        const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();

        const userErrors = data?.data?.customerAccessTokenCreate?.customerUserErrors;
        if (userErrors && userErrors.length > 0) {
            throw new Error(JSON.stringify(userErrors));
        }

        const token = data?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
        return token;

    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await getToken(email, password);
        if (!token) {
            return res.status(400).json({ error: "Invalid email or password. Please try again." });
        }


        const query = `
            query getCustomer($token: String!) {
                customer(customerAccessToken: $token) {
                    id
                    firstName
                    lastName
                    email
                }
            }`;

        const variables = { token };

        const response = await fetch(process.env.SHOPIFY_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();

        if (data.errors) {
            return res.status(400).json({ error: 'Failed to fetch customer data' });
        }

        res.json({ customer: data.data.customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
