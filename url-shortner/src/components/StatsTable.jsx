import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function StatsTable({ stats }) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>URL Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.length > 0 ? (
            stats.map((stat) => (
              <TableRow key={stat.shortCode}>
                <TableCell>{stat.shortUrl}</TableCell>
                <TableCell sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {stat.originalUrl}
                </TableCell>
                <TableCell>{stat.clicks}</TableCell>
                <TableCell>{new Date(stat.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(stat.expiry).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No URLs shortened yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}