import type { Client } from "~/interfaces/Client";

let url: string = "http://localhost:3000/clients";

export const getClients = async (params: string): Promise<Client[] | []> => {
  const uri = new URL(url);
  uri.searchParams.set("search", params);
  return fetch(uri).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }
    return [];
  });
};
