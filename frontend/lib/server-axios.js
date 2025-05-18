// lib/server-axios.ts
import axios from "axios";
import { cookies } from "next/headers";

export const getServerAxios = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: process.env.API_INTERNAL_BASE_URL,
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });

  return instance;
};
