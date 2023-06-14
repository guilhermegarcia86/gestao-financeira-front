import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Country } from '../../types/Country';

interface EditModalProps {
  country: Country;
  onSave: (country: Country) => void;
  onClose: () => void;
}

const EditCountryModal: React.FC<EditModalProps> = ({ country, onSave, onClose }) => {
  const [editedCountry, setEditedCountry] = useState(country);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCountry((prevCountry) => ({
      ...prevCountry,
      name: {
        ...prevCountry.name,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editedCountry);
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Editar País</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome Comum"
          name="common"
          defaultValue={editedCountry.name.common}
          onChange={handleFieldChange}
        />
        <TextField
          label="Nome Oficial"
          name="official"
          defaultValue={editedCountry.name.official}
          onChange={handleFieldChange}
        />
        {/* Outros campos de edição */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCountryModal;