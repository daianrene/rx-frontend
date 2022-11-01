const Recibo = ({ data }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.razonsocial}</td>
      <td>{data.cuit}</td>
      <td>{data.domicilio}</td>
      <td>{data.concepto}</td>
      <td>{data.total}</td>
      <td>{data.fechaylugar.split(" ").pop()}</td>
    </tr>
  );
};

export default Recibo;
