import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import StatsTable from '../components/StatsTable';
import logger from '../utils/logger';

export default function StatsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    logger.log('StatsPage', 'info', 'Stats page loaded');
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setStats(savedUrls);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      <StatsTable stats={stats} />
    </Paper>
  );
}