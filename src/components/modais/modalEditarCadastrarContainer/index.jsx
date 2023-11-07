import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ContainerServices from '../../../services/containerServices';

export default function ModalEditarCadastrarContainer({
  show,
  handleClose,
  id,
}) {
  const schema = yup.object({
    cliente: yup.string().required('Nome do cliente é obrigatório'),
    numContainer: yup
      .string()
      .matches(/^[A-Z]{4}\d{7}$/, 'Digite um número de container válido')
      .required('Nome do cliente é obrigatório'),
    tipo: yup.string().required('Tipo é obrigatório'),
    categoria: yup.string().required('Categoria é obrigatório'),
    status: yup.string().required('Status é obrigatório'),
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
    if (!id) {
      ContainerServices.postContainer(data).then(() => {
        handleClose();
        reset();
      });
    } else {
      ContainerServices.putContainer(data, id).then(() => {
        handleClose();
        reset();
      });
    }
  };

  useEffect(() => {
    if (id) {
      ContainerServices.getContainerById(id).then(({ data }) => {
        const fields = [
          'cliente',
          'numContainer',
          'tipo',
          'status',
          'categoria',
        ];
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
          id ? 'Editar Container' : 'Cadastrar Container'
        }`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <Form.Group className="mb-2">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              placeholder="TechNova Solutions, Ltda"
              {...register('cliente')}
            />
            <small className="text-danger">{errors.cliente?.message}</small>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Número Container</Form.Label>
            <Form.Control
              type="text"
              name="numContainer"
              placeholder="TEST1234567"
              {...register('numContainer')}
            />
            <small className="text-danger">
              {errors.numContainer?.message}
            </small>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Tipo</Form.Label>
            <Form.Select name="tipo" {...register('tipo')}>
              <option value="">Selecione</option>
              <option value="20">20</option>
              <option value="40">40</option>
            </Form.Select>
            <small className="text-danger">{errors.tipo?.message}</small>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Categoria</Form.Label>
            <Form.Select name="categoria" {...register('categoria')}>
              <option value="">Selecione</option>
              <option value="IMPORTACAO">Importação</option>
              <option value="EXPORTACAO">Exportação</option>
            </Form.Select>
            <small className="text-danger">{errors.categoria?.message}</small>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" {...register('status')}>
              <option value="">Selecione</option>
              <option value="CHEIO">Cheio</option>
              <option value="VAZIO">Vazio</option>
            </Form.Select>
            <small className="text-danger">{errors.status?.message}</small>
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
