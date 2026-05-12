import { DataGrid } from '@mui/x-data-grid';
import type { GridRowParams, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Box, CircularProgress, Alert, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLabels } from '../hooks/useLabels';
import CreateLabelDialog from '../components/CreateLabelDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteLabel } from '../hooks/useDeleteLabel';

const Dashboard = () => {

    const { data, isLoading, isError, error } = useLabels();
    const deleteMutation = useDeleteLabel();
    const navigate = useNavigate();

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/labels/${params.id}`);
    };

    const handleDelete = (event: React.MouseEvent, id: string, name: string) => {
        event.stopPropagation(); // Prevents the row-click navigation from firing
        if (window.confirm(`Delete '${name}'?`)) {
            deleteMutation.mutate(id);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Label Name', width: 250 },
        { field: 'type', headerName: 'Type', width: 250 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 250,
            sortable: false,
            renderCell: (params: any) => (
                <Tooltip title="Delete Label">
                    <IconButton
                        color="error"
                        onClick={(event) => handleDelete(event, params.row.id, params.row.name)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ),
        },
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" gutterBottom>Gmail Labels</Typography>
                <CreateLabelDialog />
            </Box>

            <Box sx={{ height: 600, width: '100%' }}>
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
            </Box>
        </Container>
    );


};

export default Dashboard;
