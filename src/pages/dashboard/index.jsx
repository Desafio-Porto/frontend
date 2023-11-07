import React, { useCallback, useEffect, useState } from 'react';
import ContainerServices from '../../services/containerServices';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import Paginacao from '../../components/paginacao';
import Utils from '../../utils';

export default function Dashboard() {
  const [data, setData] = useState({});
  const [numberPage, setNumberPage] = useState(0);

  const getRelatorio = useCallback(async (page) => {
    const props = {
      page: page || 0,
    };

    await ContainerServices.getRelatorio(props).then(({ data }) =>
      setData(data)
    );
  }, []);

  useEffect(() => {
    getRelatorio(numberPage);
  }, [data?.relatorio?.totalPages, getRelatorio, numberPage]);

  return (
    <Container>
      <h1 className="my-5">Dashboard</h1>
      <Row>
        <Col>
          {data.sumario?.map((item, index) => (
            <Card style={{ width: '18rem' }} key={index} className="mb-2">
              <Card.Body>
                <Card.Title>{Utils.UnEnumCategoria(item.categoria)}</Card.Title>
                <Card.Text>{item.quantidade}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <h3 className="my-5">Clientes</h3>
      <Row>
        <Col>
          <Table striped>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {data?.relatorio?.content?.map((item, index) => (
                <tr key={index}>
                  <td>{item.cliente}</td>
                  <td>{Utils.UnEnumTipoMovimentacao(item.tipoMovimentacao)}</td>
                  <td>{item.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Paginacao
              numberPage={numberPage}
              setNumberPage={setNumberPage}
              totalPages={data?.relatorio?.totalPages}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
