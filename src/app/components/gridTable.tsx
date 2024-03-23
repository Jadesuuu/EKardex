import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import React from 'react';

interface Patient {
  roomNumber: number;
  lastName: string;
  givenName: string;
  middleName?: string;
  age: number;
  sex: string;
  patientNumber: number;
}

const columns = [
    { field: 'roomNumber', headerName: 'ROOM #', width: 150 },
    { field: 'lastName', headerName: 'LAST NAME', width: 150 },
    { field: 'givenName', headerName: 'FIRST NAME', width: 200 },
    { field: 'middleName', headerName: 'MIDDLE NAME', width: 150 },
    { field: 'age', headerName: 'AGE', width: 110 },
    { field: 'sex', headerName: 'SEX', width: 110 },
    { field: 'patientNumber', headerName: 'PATIENT NUMBER', width: 150 },
  ];

const Table: React.FC<{ data: Patient[] }> = ({ data }) => {
  return (
    <Box sx={{ height: 650, width: '85.1vw', marginTop: '0.5%', background: 'white'}}>
      {data.length > 0 && <DataGrid rows={data} columns={columns} getRowId={(row) => row.patientNumber} slots={{toolbar: GridToolbar}} slotProps={{toolbar: {showQuickFilter: true}}}/>}
    </Box>
  );
};

export default Table;
