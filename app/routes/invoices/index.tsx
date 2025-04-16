import type { Route } from "../+types/home";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Paid, Today, Download } from "@mui/icons-material";
import { useParams } from "react-router";
import "./invoices.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Users() {
  //const years: string[] = ["2014", "2015", "2024", "2025"];

  const { id } = useParams();

  const [invoices, setinvoices] = useState([]);
  const [selectedMonth, setselectedMonth] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const donwload = (id: string) => {
    const res = fetch("http://localhost:3000/invoices/" + id + "/download", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        responseType: "blob",
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        var file = window.URL.createObjectURL(blob);
        //new Blob([blob], { type: "application/pdf" });
        //window.location.(file);

        const tempLink = document.createElement("a");
        tempLink.href = file;
        tempLink.setAttribute("download", `fatura.pdf`); // Set the desired filename for the downloaded file

        // Append the <a> element to the body and click it to trigger the download
        document.body.appendChild(tempLink);
        tempLink.click();

        // Clean up the temporary elements and URL
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(file);
      });
  };

  useEffect(() => {
    setselectedMonth(searchParams.get("year") || "");
    const res = fetch(
      "http://localhost:3000/clients/" + id + "/invoices?" + searchParams
    ).then(async (response) => {
      if (response.ok) {
        setinvoices(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <br></br>

      {invoices &&
        invoices.map((invoice: any) => (
          <div className="invoice" key={invoice.id}>
            <div className="body">
              <div className="title">
                <Today style={{ color: "#02231c" }} />
                {invoice.date.split("/").reverse().join("/")}
              </div>
              <div className="details">
                <Paid style={{ color: "#02231c", marginRight: 2 }} />
                {" " + invoice.total_value_without_gd}
              </div>
            </div>
            <button className="download" onClick={() => donwload(invoice.id)}>
              <Download fontSize={"small"} />
              Baixar
            </button>
          </div>
        ))}
    </div>
  );
}
