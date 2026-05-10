import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Button, Card, 
  CardContent, Grid, Divider, CircularProgress, Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLabelDetail } from '../hooks/useLabelDetail';

const LabelDetail = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: label, isLoading, isError } = useLabelDetail(id);

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (isError) return <Alert severity="error">Error loading label details.</Alert>;

    return (

        <Container sx={{ mt: 4 }}>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/')} 
                sx={{ mb: 2 }}
            >
                Back to Dashboard
            </Button>

            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h4" color="primary" gutterBottom>
                        {label?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        ID: {label?.id}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    

                </CardContent>
            </Card>
        </Container>

    );
};

export default LabelDetail;