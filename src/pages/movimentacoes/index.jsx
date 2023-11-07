import React, { useCallback, useEffect, useState } from 'react';
import ContainerServices from '../../services/containerServices';
import { Button, Container, Table } from 'react-bootstrap';
import ModalEditarCadastrarContainer from '../../components/modais/modalEditarCadastrarContainer';
import Paginacao from '../../components/paginacao';
import MovimentacaoServices from '../../services/movimentacaoServices';
import { useParams } from 'react-router-dom';
import ModalEditarCadastrarMovimentacao from '../../components/modais/modalEditarCadastrarMovimentacao';

export default function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState({});
  const [numberPage, setNumberPage] = useState(0);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);

  const { idContainer } = useParams();

  const getMovimentacoes = useCallback(
    async (page) => {
      const props = {
        idContainer,
        page: page || 0,
      };

      await MovimentacaoServices.getMovimentacaoByIdContainer(props).then(({ data }) =>
        setMovimentacoes(data)
      );
    },
    [idContainer]
  );

  useEffect(() => {
    getMovimentacoes(numberPage);
  }, [movimentacoes.totalPages, getMovimentacoes, numberPage]);

  function handleDelete(id) {
    MovimentacaoServices.deleteMovimentacao(id).then(() => getMovimentacoes(numberPage)); 
  }

  function handleClose() {
    getMovimentacoes();
    setShow(false);
    setId(null);
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-5">Movimentações</h1>
        <Button
          className="bg-primary py-2 border-0"
          onClick={() => setShow(true)}
        >
          Adicionar movimentação
        </Button>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Data Hora Inicio</th>
            <th>Data Hora Término</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes?.content?.map((item, index) => (
            <tr key={index}>
              <td>{item.movimentacaoTipo}</td>
              <td>{item.dataHoraInicio}</td>
              <td>{item.dataHoraTermino}</td>
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
                    src=".././img/icons/pencil.svg"
                    alt="icone"
                    onClick={() => {
                      setId(item.id);
                      setShow(true);
                    }}
                  />
                  <img
                    src=".././img/icons/trash.svg"
                    alt="icone"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalEditarCadastrarMovimentacao
        show={show}
        id={id}
        handleClose={handleClose}
      />

      <div className="d-flex justify-content-center">
        <Paginacao
          numberPage={numberPage}
          setNumberPage={setNumberPage}
          totalPages={movimentacoes?.totalPages}
        />
      </div>
    </Container>
  );
}
