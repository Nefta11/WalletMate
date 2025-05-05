import React from 'react';
import CustomAlert from './CustomAlert';

const ExportAlert = ({ visible, onConfirm, onCancel }) => {
  return (
    <CustomAlert
      title="Exportar Datos"
      message="¿Estás seguro de que deseas exportar tus transacciones?"
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText="Exportar"
      cancelText="Cancelar"
    />
  );
};

export default ExportAlert;