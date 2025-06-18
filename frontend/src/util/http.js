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

        return { products, filters, nextPageCursor, totalPages };
    } catch (error) {
        throw new Error(`Failed to fetch Menu: ${error.message}`);
    }


}

const apiFunctions = {
    fetchMenuItems,
    fetchProducts
}

export default apiFunctions;