import { DataGrid } from '@mui/x-data-grid';
import type { GridRowParams, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useLabels } from '../hooks/useLabels';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const { data, isLoading, isError, error } = useLabels();
    const navigate = useNavigate();

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/labels/${params.id}`);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Label Name', width: 250 },
        { field: 'type', headerName: 'Type', width: 150 },
    ];

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (isError) return <Alert severity="error">{(error as Error).message}</Alert>;

    return (
        <Container sx={{ mt: 4, height: 600 }}>
        <Typography variant="h4" gutterBottom>Gmail Labels</Typography>
        <DataGrid 
            rows={data || []} 
            columns={columns} 
            getRowId={(row) => row.id}
            onRowClick={handleRowClick}
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
            sx={{ cursor: 'pointer' }}
        />
        </Container>
    );


};

export default Dashboard;
