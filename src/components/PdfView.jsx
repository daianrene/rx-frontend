import pdf from "@react-pdf/renderer";
const { Page, Text, View, Document, StyleSheet } = pdf;
import getDate from "../utils/getDate.js";

// Create styles
const styles = StyleSheet.create({
  page: {
    height: "100%",
    maxWidth: "100%",
    fontSize: "12px",
    fontFamily: "Times-Roman",
  },
  border: {},
  rz: {
    position: "absolute",
    top: "6.335cm",
    left: "8.61cm",
  },
  dom: {
    position: "absolute",
    top: "7.29cm",
    left: "4.2cm",
  },
  loc: {
    position: "absolute",
    top: "8.25cm",
    left: "4.2cm",
  },
  tel: {
    position: "absolute",
    top: "8.25cm",
    left: "12.9cm",
  },
  iva: {
    position: "absolute",
    top: "9.5cm",
    left: "3.75cm",
  },
  cuit: {
    position: "absolute",
    top: "10.85cm",
    left: "4.4cm",
  },
  sumaView: {
    position: "absolute",
    maxWidth: "80%",
    top: "13.4cm",
    left: "2.1cm",
    textAlign: "justify",
  },
  conceptoView: {
    position: "absolute",
    maxWidth: "80%",
    top: "17.4cm",
    left: "2.1cm",
    textAlign: "justify",
  },
  lyf: {
    fontSize: "9.5pt",
    position: "absolute",
    top: "3.93cm",
    left: "15.4cm",
  },
  total: {
    position: "absolute",
    top: "24.55cm",
    left: "4.4cm",
  },
});

// Create Document Component
const PdfView = ({ formulario }) => {
  return (
    <Document>
      <Page size="A4" pageNumber={1}>
        <View style={styles.page}>
          <Text style={[styles.lyf, styles.border]}>
            {formulario?.lugaryfecha || "Paraná, Entre Rios " + getDate()}
          </Text>
          <Text style={[styles.rz, styles.border]}>
            {formulario.razonsocial}
          </Text>
          <Text style={[styles.dom, , styles.border]}>
            {formulario.domicilio}
          </Text>
          <Text style={[styles.loc, styles.border]}>
            {formulario.localidad}
          </Text>
          <Text style={[styles.tel, styles.border]}>{formulario.telefono}</Text>
          <Text style={[styles.iva, styles.border]}>{formulario.iva}</Text>
          <Text style={[styles.cuit, styles.border]}>{formulario.cuit}</Text>
          <View style={styles.sumaView}>
            <Text>{formulario.suma}</Text>
          </View>
          <View style={styles.conceptoView}>
            <Text>{formulario.concepto}</Text>
          </View>
          <Text style={[styles.total, styles.border]}>{formulario.total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfView;
