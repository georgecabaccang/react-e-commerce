enum URLS {
    // request methods
    GET = "get",
    POST = "post",
    PATCH = "patch",

    // server requests
    SERVER_BASE = "http://localhost:8002",
    USER_SIGN_IN = "user/sign-in",
    USER_SIGN_UP = "user/sign-up",
    USER_SIGN_OUT = "user/sign-out",
    REFRESH_TOKEN = "user/refresh-tokens",
    GET_CART = "cart",

    // PRODUCTS
    PRODUCTS_BASE = "http://localhost:8002/products",
}

export default URLS;
