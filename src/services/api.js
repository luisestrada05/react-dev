import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon24.p.rapidapi.com/api/",
  headers: {
    "x-rapidapi-key": "4abc1ef1damsh1b9d574e9f1cf4dp16715fjsnbfd91f081f73",
    "x-rapidapi-host": "amazon24.p.rapidapi.com",
  },
});

export default {
  getCategories: (params) =>
    instance({
      method: "GET",
      url: "/category",
      params: {
        country: params,
      },
    }),
  getProducts: (params) =>
    instance({
      method: "GET",
      url: "/product",
      params: params,
    }),
};
