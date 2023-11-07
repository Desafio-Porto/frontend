import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ContainerServices from '../../../services/containerServices';
import MovimentacaoServices from '../../../services/movimentacaoServices';
import { useParams } from 'react-router-dom';

export default function ModalEditarCadastrarMovimentacao({
  show,
  handleClose,
  id,
}) {
  const { idContainer } = useParams();

  const schema = yup.object({
    movimentacaoTipo: yup
      .string()
      .required('Tipo de movimentação é obrigatório'),
    dataHoraInicio: yup.string().required('Data/Hora Inicio é obrigatório'),
    dataHoraTermino: yup.string().required('Data/Hora Término é obrigatório'),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const dataFormat = {
      movimentacaoTipo: data.movimentacaoTipo,
      dataHoraInicio: data.dataHoraInicio,
      dataHoraTermino: data.dataHoraTermino,
      container: {
        id: idContainer,
      },
    };

    if (!id) {
      MovimentacaoServices.postMovimentacao(dataFormat).then(() => {
        handleClose();
        reset();
      });
    } else {
      MovimentacaoServices.putMovimentacao(data, id).then(() => {
        handleClose();
        reset();
      });
    }
  };

  useEffect(() => {
    if (id) {
      MovimentacaoServices.getMovimentacaoById(id).then(({ data }) => {
        const fields = ['movimentacaoTipo', 'dataHoraInicio', 'dataHoraTermino'];
        fields.forEach((field) => {
          setValue(field, data[field]);
        });
      });
    }
  }, [id, setValue]);

  return (
    <Modal
      show={show}
      onHide={() => {
        reset();
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`${
          id ? 'Editar Movimentação' : 'Cadastrar Movimentação'
        }`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <Form.Group className="mb-2">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              type="text"
              name="movimentacaoTipo"
              {...register('movimentacaoTipo')}
            >
              <option value="">Selecione</option>
              <option value="EMBARQUE">Embarque</option>
              <option value="DESCARGA">Descarga</option>
              <option value="GATE_IN">Gate In</option>
              <option value="GATE_OUT">Gate Out</option>
              <option value="REPOSICIONAMENTO">Reposicionamento</option>
              <option value="PESAGEM">Pesagem</option>
              <option value="SCANNER">Scanner</option>
            </Form.Select>
            <small className="text-danger">
              {errors.movimentacaoTipo?.message}
            </small>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dataHoraInicio"
              {...register('dataHoraInicio')}
            />
            <small className="text-danger">
              {errors.dataHoraInicio?.message}
            </small>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dataHoraTermino"
              {...register('dataHoraTermino')}
            />
            <small className="text-danger">
              {errors.dataHoraTermino?.message}
            </small>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button className="bg-primary border-0" type="submit">
              Salvar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
