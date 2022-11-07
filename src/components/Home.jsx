import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PDFViewer } from "@react-pdf/renderer";
import PdfView from "./PdfView";

import User from "../servcices/user";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import numeroALetras from "../utils/amountToString";

const reformatDate = (date) => {
  const [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
  return dd + "/" + mm + "/" + yyyy;
};

const Home = () => {
  const [recibos, setRecibos] = useState([]);
  const [open, setOpen] = useState(false);
  const [detallado, setDetallado] = useState({});
  const [print, setPrint] = useState(false);

  useEffect(() => {
    User.getRecibos().then((res) => {
      const data = res.data;
      setRecibos(data);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "razonsocial", headerName: "Razon Social", flex: 1 },
    { field: "cuit", headerName: "CUIT", flex: 0.7 },
    { field: "domicilio", headerName: "Domicilio", flex: 0.8 },
    { field: "concepto", headerName: "Concepto", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      flex: 0.7,
      valueFormatter: ({ value }) =>
        new Intl.NumberFormat("es-AR", {
          currency: "ARS",
          style: "currency",
        }).format(value),
    },
    {
      field: "createdAt",
      headerName: "Fecha",
      type: "dateTime",
      flex: 0.6,
      renderCell: (params) => {
        return reformatDate(params?.value);
      },
    },

    {
      field: "actions",
      headerName:"Acciones",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SearchIcon color="primary" fontSize="large" />}
          label="Detail"
          onClick={() => {
            const newDetallado = recibos.find((rec) => rec.id === params.id);
            newDetallado.suma = numeroALetras(newDetallado.total);

            setDetallado(newDetallado);

            setOpen(true);
          }}
        />,
        <GridActionsCellItem
          icon={<PrintIcon color="primary" fontSize="large" />}
          label="Print"
          onClick={() => {
            const newDetallado = recibos.find((rec) => rec.id === params.id);
            newDetallado.suma = numeroALetras(newDetallado.total);

            setDetallado(newDetallado);

            setPrint(true);
          }}
        />,
      ],
    },
  ];

  return !print ? (
    <>
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="d-flex justify-content-between align-items-center mt-1 mb-5">
            <h1>Mis Recibos</h1>
            <Link to="nuevo">
              <button className="btn btn-success px-3 font-weight-bold">
                <span style={{ verticalAllign: "middle" }}>NUEVO </span>
                <i
                  className="material-icons-outlined"
                  style={{ fontSize: "25px", verticalAlign: "-0.25em" }}
                >
                  add
                </i>
              </button>
            </Link>
          </div>

          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={recibos}
              columns={columns}
              autoHeight={true}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableColumnMenu={true}
            />
          </div>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Detalles del recibo {detallado.id}
          </DialogTitle>
          <DialogContent>
            <>
              <p>Razon Social: {detallado.razonsocial}</p>
              <p>Localidad: {detallado.localidad}</p>
              <p>Telefono: {detallado.telefono}</p>
              <p>IVA: {detallado.iva}</p>
              <p>CUIT: {detallado.cuit}</p>
              <p>Concepto: {detallado.concepto}</p>
              <p>Total: {detallado.total}</p>
              <p>Lugar y Fecha: {detallado.lugaryfecha}</p>
            </>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  ) : (
    <>
      <div
        className="btn btn-primary float-right my-3 mx-5  "
        onClick={() => setPrint(false)}
      >
        CERRAR
      </div>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <PdfView formulario={detallado} />
      </PDFViewer>
    </>
  );
};

export default Home;
