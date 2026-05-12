import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreateLabel } from '../hooks/useCreateLabel';
import type { LabelRequest } from '../types/label';

const CreateLabelDialog = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LabelRequest>();
  const createMutation = useCreateLabel();

  const onSubmit = (data: LabelRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset(); // Clear form after success
      },
    });
  };

  return (
    <>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={() => setOpen(true)}
      >
        New Label
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Gmail Label</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register('name', { required: 'Label name is required' })}
              autoFocus
              margin="dense"
              label="Label Name"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateLabelDialog;