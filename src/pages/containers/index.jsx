import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import ContainerServices from '../../services/containerServices';
import ModalEditarCadastrarContainer from '../../components/modais/modalEditarCadastrarContainer';
import Paginacao from '../../components/paginacao';
import { useNavigate } from 'react-router-dom';

export default function Containers() {
  const [containers, setContainers] = useState({});
  const [numberPage, setNumberPage] = useState(0);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const getContainers = useCallback(async (page) => {
    const props = {
      page: page || 0,
    };

    await ContainerServices.getContainers(props).then(({ data }) =>
      setContainers(data)
    );
  }, []);

  useEffect(() => {
    getContainers(numberPage);
  }, [containers.totalPages, getContainers, numberPage]);

  function handleDelete(id) {
    ContainerServices.deleteContainer(id).then(() => getContainers(numberPage));
  }

  function handleClose() {
    getContainers();
    setShow(false);
    setId(null);
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-5">Containers</h1>
        <Button
          className="bg-primary py-2 border-0"
          onClick={() => setShow(true)}
        >
          Adicionar container
        </Button>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Categoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {containers?.content?.map((item, index) => (
            <tr key={index}>
              <td>{item.cliente}</td>
              <td>{item.numContainer}</td>
              <td>{item.tipo}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === 'CHEIO' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>{item.categoria}</td>
              <td>
                <div className="d-flex gap-2 actions">
                  <img
                    src="./img/icons/pencil.svg"
                    alt="icone"
                    onClick={() => {
                      setId(item.id);
                      setShow(true);
                    }}
                  />
                  <img
                    src="./img/icons/trash.svg"
                    alt="icone"
                    onClick={() => handleDelete(item.id)}
                  />
                  <img
                    src="./img/icons/move.svg"
                    alt="icone"
                    onClick={() => navigate(`/movimentacoes/${item.id}`)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalEditarCadastrarContainer
        show={show}
        id={id}
        handleClose={handleClose}
      />

      <div className="d-flex justify-content-center">
        <Paginacao
          numberPage={numberPage}
          setNumberPage={setNumberPage}
          totalPages={containers?.totalPages}
        />
      </div>
    </Container>
  );
}
