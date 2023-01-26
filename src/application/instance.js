import axios from "axios";
import { checkTokenValidaty } from "./utils";
 export const instance = axios.create({
    baseURL: "http://localhost:3001",
 });

 instance.interceptors.request.use(async (req) => {
   const token = localStorage.getItem("token");
   const refresh_token = localStorage.getItem("refresh_token");
   // თუ ტოკენი არ არსებობს
   if (!token || !refresh_token) return req;
   req.headers.Authorization = `Bearer ${token}`;
   const isExpired = checkTokenValidaty(token);
   if (!isExpired) return req;

   // vada gauvida tokens
   const { data } = await axios.post("http://localhost:3001/users/refresh", {
      refresh_token,
   });

   localStorage.setItem("token", data.token);
   req.headers.Authorization = `Bearer ${data.token}`;
   return req;
 });