import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Button, Card, 
  CardContent, Grid, Divider, CircularProgress, Alert,
  IconButton, TextField, Stack 
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLabelDetail } from '../hooks/useLabelDetail';
import { useUpdateLabel } from '../hooks/useUpdateLabel';
import type { LabelRequest } from '../types/label';

const LabelDetail = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: label, isLoading, isError } = useLabelDetail(id);
    const updateMutation = useUpdateLabel();

    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset } = useForm<LabelRequest>();

    // Sync form when label data arrives
    useEffect(() => { if (label) reset({ name: label.name }); }, [label, reset]);

    const onSave = (formData: LabelRequest) => {
        if (id) {
        updateMutation.mutate({ id, name: formData.name }, {
            onSuccess: () => setIsEditing(false)
        });
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (isError) return <Alert severity="error">Error loading label details.</Alert>;

    return (

        <Container sx={{ mt: 4 }}>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/dashboard')} 
                sx={{ mb: 2 }}
            >
                Back to Dashboard
            </Button>

            <Card elevation={3}>
                <CardContent>
                    <Stack 
                        direction="row" 
                        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        {isEditing ? (
                        <Box component="form" onSubmit={handleSubmit(onSave)} sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
                            <TextField 
                            {...register('name', { required: true })}
                            size="small"
                            fullWidth
                            autoFocus
                            />
                            <IconButton type="submit" color="primary"><SaveIcon /></IconButton>
                            <IconButton onClick={() => setIsEditing(false)} color="error"><CancelIcon /></IconButton>
                        </Box>
                        ) : (
                        <>
                            <Typography variant="h4" color="primary">{label?.name}</Typography>
                            <IconButton onClick={() => setIsEditing(true)}><EditIcon /></IconButton>
                        </>
                        )}
                    </Stack>
                    
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        ID: {label?.id}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <Typography variant="overline">Type</Typography>
                            <Typography variant="h6">{label?.type}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <Typography variant="overline">Label List Visibility</Typography>
                            <Typography variant="h6">{label?.labelListVisibility || 0}</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <Typography variant="overline">Message List Visibility</Typography>
                            <Typography variant="h6">{label?.messageListVisibility || 0}</Typography>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </Container>

    );
};

export default LabelDetail;