const express = require('express');
const cors = require('cors');
const app = express();
const Products = require('./src/Products');
const Productfilters = require('./src/Productfilters');
const customProductFilters = require('./src/customProductFilters')
require('dotenv').config();

app.use(cors());
app.use('/shopify', Products)
app.use('/shopify', Productfilters);
app.use('/shopify', customProductFilters)

app.get('/', (req, res) => {
    res.send("Backend is running!");
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})