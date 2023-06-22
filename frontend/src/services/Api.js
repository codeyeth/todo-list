import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";
const baseURL = isDevelopment ? "http://localhost:3000/" : "https://some-domain:3000/";

export default () => {
  return axios.create({
    baseURL,
  });
};
