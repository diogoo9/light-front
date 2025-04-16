import React, { PureComponent, useEffect, useState } from "react";
import "./upload.css";
import axios from "axios";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import Icon from "@mui/material/Icon";

export default function UploadScreen() {
  const [file, setFile] = useState();

  function handleSubmit(event: any) {
    handleOpen();
    event.preventDefault();
    const url = "http://localhost:3000/invoices";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        handleClose();
        setFile(undefined);
        const msg = "Fatura cadastrada com sucesso";
        setsnack({ massage: msg, open: true });
      })
      .catch((err) => {
        handleClose();
        const msg = err.response.data.message;
        setsnack({ massage: msg, open: true });
      });
  }
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const [open, setOpen] = React.useState(false);
  const [snack, setsnack] = React.useState({ massage: "", open });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {}, []);
  return (
    <div className="container">
      <Snackbar
        open={snack.open}
        onClose={() => setsnack({ massage: "", open: false })}
        slots={{ transition: "fade" }}
        message={snack.massage}
        key=""
        autoHideDuration={1200}
      />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form className="form">
        <label>selecione o arquivo</label>
        <br></br>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          placeholder="selecionar arquivo"
        />
        <br></br>
        <button onClick={handleSubmit} className="send" disabled={!file}>
          send
        </button>
      </form>
    </div>
  );
}
