/* eslint-disable import/no-anonymous-default-export */
const API_URL = "http://localhost:8080/shopify/";
const PRODUCTS_PER_PAGE = 12;

async function fetchMenuItems() {

    try {
        const response = await fetch(API_URL + "menu");
        if (!response.ok) {
            throw new Error(`Failed to fetch Menu. Status: ${response.status}`);
        }

        const responseData = await response.json();
        const menus = responseData || null;
        return menus;
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw new Error(`Failed to fetch Menu: ${error.message}`);
    }
}

async function fetchProducts(pageInfo, filteredValues, collectionId) {
    try {
        const response = await fetch(API_URL + "customFilter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                limit: PRODUCTS_PER_PAGE,
                after: pageInfo || null,
                filters: filteredValues,
                collectionId: collectionId.split("/").pop(),
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Menu. Status: ${response.status}`);
        }

        const responseData = await response.json();
        const products = responseData.products.products || [];
        const filters = responseData.filters || [];
        const nextPageCursor = responseData.products.nextPageCursor || null;
        const totalPages = responseData.products.totalPages || 1;
        await new Promise(resolve => setTimeout(resolve, 500));

        return { products, filters, nextPageCursor, totalPages };
    } catch (error) {
        throw new Error(`Failed to fetch Menu: ${error.message}`);
    }


}

async function fetchProductDetails(productId) {
    console.log(productId)
    try {
        const res = await fetch(API_URL + "productDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        console.log(res)
        const productDetails = data.productData.product || null;
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(productDetails)
        return { productDetails };

    } catch (error) {
        console.error("Failed to fetch product details:", error);
    }
}

async function fetchSearchSuggestions(q) {
    try {
        const res = await fetch(API_URL + "search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q }),
        });
        const data = await res.json();
        const searchSuggestions = data || null;
        return { searchSuggestions };

    } catch (error) {
        console.error("Failed to fetch product details:", error);
    }
}

const apiFunctions = {
    fetchMenuItems,
    fetchProducts,
    fetchProductDetails,
    fetchSearchSuggestions
}

export default apiFunctions;