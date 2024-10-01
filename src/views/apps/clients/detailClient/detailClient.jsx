import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';
import ClientTasks from '../clientTasks/clientTasks';

function DetailClientData({cid}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Kundli Preview" value="1" />
            <Tab label="Task" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Kundli Data will be displayed, which will be bind with client.</TabPanel>
        <TabPanel value="2"><ClientTasks cid={cid}/></TabPanel>
      </TabContext>
    </>
  );
}

export default DetailClientData;
