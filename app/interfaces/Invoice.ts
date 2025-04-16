export interface Invoice {
  id: string;
  date: string;
  electrical_energy_kwh: string;
  electrical_energy_value: string;
  scee_without_icms_kwh: string;
  scee_without_icms_value: string;
  compensated_energy_kwh: string;
  compensated_energy_value: string;
  municipal_public_contribution: string;
  eletric_consume_total: string;
  total_value_without_gd: string;
  client_id: string;
}
