import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CardContent, Grid, IconButton, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClientTasks from '../clientTasks/clientTasks';
import './detailClient.css';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import ClientKundli from '../clientKundli/clientKundli';
import { useAuth } from '@/@core/contexts/authContext';
import { GetClientById } from '@/app/Server/API/client';
import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer';
import InfoTable from '@/components/preview/InfoTable/InfoTable';
function DetailClientData({ cid }) {
  const [value, setValue] = useState('1');
  const [client, setClient] = useState([]);
  const { user } = useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("user : ", user?.transactionID)
  const getClientData = async (transactionID, cid) => {
    try {
      const response = await GetClientById(transactionID, cid);
      if (response.hasError) {
        return toastDisplayer("error", response.errorMessage);
      }
      console.log("response : ", response)
      setClient(response.responseData)
    } catch (error) {
      return toastDisplayer("error", error);
    }

  }

  useEffect(() => {
    if (user?.transactionID) {
      console.log("================")
      getClientData(user?.transactionID, cid)
    }
  }, [user])


  const [showKundliList, setShowKundliList] = useState(false);

  // Toggle visibility of KundliList
  const toggleKundliList = () => {
    setShowKundliList(!showKundliList);
  };


  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-0' onClick={toggleKundliList}>
              <div className="flex justify-between items-center">
                <PageTitle title={"Client Information"} />

                <IconButton >
                  {showKundliList ? (
                    <i className="tabler-chevron-up" />
                  ) : (
                    <i className="tabler-chevron-down" />
                  )}
                </IconButton>
              </div>
            </CardContent>
          </Card>

        </Grid>
      </Grid>

      <Grid container spacing={6} className='mt-2'>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4'>
              {showKundliList && (
                <div className="KundliList">
                  <PageTitle title={"Basic Info"} />
                  <div className={'xs:flex-col ClientDetail-Div'}>
                    <div className='flex flex-row block-detail'>
                      <InfoTable InfoTableTextArr={[
                        { "label": "Name ", "value": `${client.name} ` },
                        { "label": "Status ", "value": `${client.status}` },
                        // { "label": "Person ", "value": `${client.person}` },
                        // { "label": "Phone ", "value": `${client.phone1}` },
                        // { "label": "Email ", "value": `${client.email1}` },
                      ]}/>
                    </div>
                    <div className='flex flex-row block-detail'>
                      <InfoTable InfoTableTextArr={[
                        // { "label": "Name ", "value": `${client.name} ` },
                        // { "label": "Status ", "value": `${client.status}` },
                        { "label": "Person ", "value": `${client.person}` },
                        { "label": "Phone ", "value": `${client.phone1}` },
                        // { "label": "Email ", "value": `${client.email1}` },
                      ]}/>
                    </div>
                    <div className='flex flex-row block-detail'>
                      <InfoTable InfoTableTextArr={[
                        // { "label": "Name ", "value": `${client.name} ` },
                        // { "label": "Status ", "value": `${client.status}` },
                        // { "label": "Person ", "value": `${client.person}` },
                        // { "label": "Phone ", "value": `${client.phone1}` },
                        { "label": "Email ", "value": `${client.email1}` },
                        { "label": "Country ", "value": `${client.country} ` },
                      ]}/>
                    </div>
                    <div className='flex flex-row block-detail'>
                      <InfoTable InfoTableTextArr={[
                          // { "label": "Country ", "value": `${client.country} ` },
                          { "label": "City ", "value": `${client.city}` },
                          { "label": "Area ", "value": `${client.area}` },
                          // { "label": "Building ", "value": `${client.building}` },
                          // { "label": "Lane ", "value": `${client.lane}` },
                       ]} />
                    </div>
                    <div className='flex flex-row block-detail'>
                      <InfoTable InfoTableTextArr={[
                          // { "label": "Country ", "value": `${client.country} ` },
                          // { "label": "City ", "value": `${client.city}` },
                          // { "label": "Area ", "value": `${client.area}` },
                          { "label": "Building ", "value": `${client.building}` },
                          { "label": "Lane ", "value": `${client.lane}` },
                       ]} />
                    </div>
                  </div>
                  {/* <Box>

                    <div className="client-details">
                      <div className="card">
                        <h3>Basic Info</h3>
                        <p><strong>Name:</strong> {client.name}</p>
                        <p><strong>Status:</strong> {client.status}</p>
                        <p><strong>Person:</strong> {client.person}</p>
                        <p><strong>Phone 1:</strong> {client.phone1} ({client.phone1Name})</p>
                        <p><strong>Phone 2:</strong> {client.phone2} ({client.phone2Name})</p>
                        <p><strong>Phone 3:</strong> {client.phone3} ({client.phone3Name})</p>
                        <p><strong>Email:</strong> {client.email1}</p>
                        <p><strong>GSTIN:</strong> {client.gstin}</p>
                      </div>

                      <div className="card">
                        <h3>Address</h3>
                        <p><strong>Building:</strong> {client.building}</p>
                        <p><strong>Lane:</strong> {client.lane}</p>
                        <p><strong>Area:</strong> {client.area}</p>
                        <p><strong>City:</strong> {client.city}</p>
                        <p><strong>State:</strong> {client.state}</p>
                        <p><strong>Country:</strong> {client.country}</p>
                        <p><strong>Pin:</strong> {client.pin}</p>
                      </div>
                    </div>
                  </Box> */}
                </div>
              )}
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Kundli Preview" value="1" />
                    <Tab label="Task" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1"><ClientKundli cid={cid} /></TabPanel>
                <TabPanel value="2"><ClientTasks cid={cid} /></TabPanel>
              </TabContext>

            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </>
  );
}

export default DetailClientData;
