import type { Client } from "~/interfaces/Client";

let url: string = "http://localhost:3000/dashboard";

export const getStatistics = async (params: object): Promise<Client[] | []> => {
  const uri = new URL(url);
  uri.searchParams.set("start_date", params.start_date);
  uri.searchParams.set("end_date", params.end_date);
  return fetch(uri).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }
    return [];
  });
};
