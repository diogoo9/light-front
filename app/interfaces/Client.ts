import type { Invoice } from "./Invoice";

export interface Client {
  id: string;
  name: string;
  instalation_number: String;
  supplier: string;
  invoices?: Invoice[];
}
