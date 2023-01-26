import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
// import { cartReducer } from "./slices/CartSlice";
// import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReduces = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReduces);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

//action creator

export { authenticateUser, logoutUser } from "./slices/userSlice";
export {
  //asynk thunks
  saveProduct,
  fetchHomePageProducts,
  fetchCategoryProducts,
  fetchQueryProducts,
  fetchSingleProductById,
  rateProduct,
  //reducer
  setSelectedProduct,
  setSearchResults,
} from "./slices/productSlice";

//cart action creatot
export {
  addToCart,
  removeFromCart,
  clearCart,

  //async thuks
  fetchCart,
  saveCart,
} from "./slices/cartSlice";
//hhoks

//user hooks

export const useUserInfo = () => useSelector((state) => state.user.userData);

//ptoducts hook
export const useSelectedProduct = () =>
  useSelector((state) => state.product.selectedProduct);
export const useHomePageProducts = () =>
  useSelector((state) => state.product.homePageProducts);
export const UseCategories = () =>
  useSelector((state) => state.product.categories);
export const useCategoryProducts = () =>
  useSelector((state) => state.product.categoryProducts);
export const useSearchResult = () =>
  useSelector((state) => state.product.searchResult);
export const useSingleProduct = () =>
  useSelector((state) => state.product.singleProduct);
//cart hooks

export const useCartItems = () => useSelector((state) => state.cart.cartItems);
