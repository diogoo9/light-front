import { Chip } from "@mui/material";
import type { Route } from "../+types/home";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { Person, Home, Business, Search } from "@mui/icons-material";
import "./users.css";
import { getClients } from "~/models/clients";
import type { Invoice } from "~/interfaces/Invoice";
import type { Client } from "~/interfaces/Client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Users() {
  //const years: string[] = ["2014", "2015", "2024", "2025"];
  let navigate = useNavigate();

  const [clients, setclients] = useState<Client[]>([]);
  const [search, setsearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setsearch(search);
    else {
      changesearch("");
    }
  }, []);

  useEffect(() => {
    getClients(search).then((res: Client[]) => {
      setclients(res);
    });
  }, [search]);

  const changesearch = (search: string) => {
    setsearch(search);
    if (search) setSearchParams({ search });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="search">
          <Search />
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              if (value) {
                return changesearch(value);
              } else {
                changesearch("");
              }
            }}
          />
        </div>
      </div>
      <br></br>

      {clients &&
        clients.map((client: any) => (
          <div
            className="client"
            key={client.id}
            onClick={() => navigate(client.id + "/invoices")}
          >
            <div className="title">
              <Person style={{ color: "#b3b3b3" }} />
              {client.name}
            </div>
            <div className="details">
              <Home style={{ color: "#b3b3b3", marginRight: 2 }} />
              {" " + client.instalation_number}
            </div>
            <div className="details">
              <Business style={{ color: "#b3b3b3", marginRight: 2 }} />
              {" " + client.supplier}
            </div>
          </div>
        ))}
    </div>
  );
}
