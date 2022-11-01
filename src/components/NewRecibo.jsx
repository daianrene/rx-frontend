import { Col, Form, Row } from "react-bootstrap";

import PdfView from "./PdfView";
import { PDFViewer } from "@react-pdf/renderer";

import { useState, useEffect } from "react";
import numeroALetras from "../utils/amountToString";

import User from "../servcices/user";

const NewRecibo = () => {
  const [print, setPrint] = useState(false);
  const [hab, setHab] = useState(false);

  const [form, setform] = useState({
    razonsocial: "",
    domicilio: "",
    localidad: "",
    telefono: "",
    iva: "",
    cuit: "",
    suma: "",
    concepto: "",
    total: "",
  });

  useEffect(() => {}, []);

  useEffect(() => {
    const validate = () => {
      let flag = true;
      ["razonsocial", "cuit", "domicilio", "concepto", "total"].forEach(
        (key) => {
          if (!form[key]) flag = false;
        }
      );
      return flag;
    };

    validate() ? setHab(true) : setHab(false);
  }, [form]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();

    const valueUp = value.charAt(0).toUpperCase() + value.slice(1);

    setform((prevalue) => ({ ...prevalue, [name]: valueUp }));

    if (name == "total") {
      const totalString = numeroALetras(value);
      setform((prevalue) => ({ ...prevalue, ["suma"]: totalString }));
    }
  };

  const handleClick = () => {
    User.postRecibo(form, setPrint);
  };

  return !print ? (
    <div className="container ">
      <div className="jumbotron mt-5">
        <h1>Nuevo Recibo</h1>
        <Form className="my-5">
          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label>Nombre y Apellido o Razón Social *</Form.Label>
            <Form.Control
              name="razonsocial"
              onChange={handleChange}
              defaultValue={form.rz}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDomicilio">
              <Form.Label>Domicilio *</Form.Label>
              <Form.Control
                name="domicilio"
                onChange={handleChange}
                defaultValue={form.dom}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLocalidad">
              <Form.Label>Localidad</Form.Label>
              <Form.Control
                name="localidad"
                onChange={handleChange}
                defaultValue={form.loc}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTel">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                name="telefono"
                onChange={handleChange}
                defaultValue={form.tel}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridIva">
              <Form.Label>IVA</Form.Label>
              <Form.Control
                name="iva"
                onChange={handleChange}
                defaultValue={form.iva}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridCuit">
              <Form.Label>CUIT *</Form.Label>
              <Form.Control
                name="cuit"
                type="number"
                onChange={handleChange}
                defaultValue={form.cuit}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridTa1">
              <Form.Label>Total *</Form.Label>
              <Form.Control
                name="total"
                type="number"
                autoComplete="off"
                onChange={handleChange}
                defaultValue={form.total}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridTa2">
            <Form.Label>En concepto de *</Form.Label>
            <Form.Control
              name="concepto"
              onChange={handleChange}
              autoComplete="off"
              defaultValue={form.concepto}
              as="textarea"
              style={{ height: "100px" }}
            />
          </Form.Group>
        </Form>
        <button
          className={"btn btn-primary mt-3"}
          onClick={handleClick}
          disabled={!hab}
          type="button"
        >
          Generar Recibo
        </button>
      </div>
    </div>
  ) : (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
      <PdfView formulario={form} />
    </PDFViewer>
  );
};

export default NewRecibo;
