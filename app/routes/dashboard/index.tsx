import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./invoices.css";
import { getStatistics } from "~/models/dashboardModel";
import { Button, TextField } from "@mui/material";

export default function Charts() {
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };
  const [statistics, setstatistics] = useState<any>({});
  const [width, setwidth] = useState<any>({});
  const [filters, setfilters] = useState<any>({
    start_date: "2024-01-01",
    end_date: "2025-01-01",
  });
  useEffect(() => {
    getData();
    setwidth(window.innerWidth * 0.9);
  }, []);

  const getData = () => {
    getStatistics(filters).then((res) => {
      setstatistics(res);
      const total_consume = formatMoney(
        Number(res?.financial_values?.total_consume || 0)
      );
      const total_economy = formatMoney(
        Number(res?.financial_values?.total_economy || 0)
      );
      const compensated_and_eletrical = res.compensated_and_eletrical;
      setstatistics({
        total_consume,
        total_economy,
        compensated_and_eletrical,
      });
    });
  };
  return (
    <div className="containerDashboard">
      <div className="filters">
        <label htmlFor="init">Dados de </label>
        <TextField
          id="init"
          value={filters.start_date}
          onChange={(val) =>
            setfilters({ ...filters, start_date: val.target.value })
          }
          type="date"
          variant="outlined"
        />
        <label htmlFor="end"> até </label>
        <TextField
          id="end"
          type="date"
          value={filters.end_date}
          onChange={(val) =>
            setfilters({ ...filters, end_date: val.target.value })
          }
          variant="outlined"
        />
        <Button
          style={{ color: "#FFF", backgroundColor: "#02231c" }}
          onClick={() => getData()}
        >
          aplicar
        </Button>
      </div>
      <br></br>

      <div className="cards">
        <div className="card">
          <div className="title">Total consumido</div>
          <div className="value">{statistics?.total_consume}</div>
        </div>
        <div className="card">
          <div className="title">Total compensado</div>
          <div className="value">{statistics?.total_economy}</div>
        </div>
      </div>
      <br></br>
      <br></br>
      <AreaChart
        width={width}
        height={400}
        data={statistics.compensated_and_eletrical}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="compensated_kwh"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="eletrical_kwh"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </div>
  );
}
