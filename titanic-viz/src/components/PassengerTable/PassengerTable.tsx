import React, { useState } from 'react';
import Passenger from '../../interface/Passenger';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

interface PassengerTableProps {
  passengers: Passenger[];
}

const PassengerTable: React.FC<PassengerTableProps> = ({ passengers }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (columnName: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnName]: value }));
  };

  const filterPassengers = (passenger: Passenger) => {
    return Object.entries(filters).every(([columnName, filterValue]) =>
      String(passenger[columnName]).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const filteredPassengers = passengers.filter(filterPassengers);

  if (!filteredPassengers || filteredPassengers.length === 0) {
    return <p>Fetching data..........</p>;
  }

  return (
    <TableContainer component={Paper} style={{ maxHeight: '500px', overflow: 'auto', margin: '16px', maxWidth: '2000px' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(passengers[0]).map((columnName) => (
              <TableCell key={columnName}>
                <TextField
                  label={`${columnName}`}
                  value={filters[columnName] || ''}
                  onChange={(e) => handleFilterChange(columnName, e.target.value)}
                  variant="standard"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPassengers.map((passenger, index) => (
            <TableRow key={passenger.passengerid} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'inherit' }}>
              {Object.values(passenger).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassengerTable;
