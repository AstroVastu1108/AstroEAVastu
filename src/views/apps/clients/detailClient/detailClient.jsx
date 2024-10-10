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
function DetailClientData({ cid }) {
  const [value, setValue] = useState('1');
  const [client,setClient] = useState([]);
  const {user} = useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("user : ",user?.transactionID)
  const getClientData = async (transactionID,cid)=>{
    try{
      const response = await GetClientById(transactionID,cid);
        if(response.hasError){
          return toastDisplayer("error",response.errorMessage);
        }
        console.log("response : ",response)
        setClient(response.responseData)
    }catch(error){
      return toastDisplayer("error",error);
    }

  }

  useEffect(()=>{
    if(user?.transactionID){
      console.log("================")
      getClientData(user?.transactionID,cid)
    }
  },[user])

  // const client = {
  //   clientID: "CL2024000000003",
  //   companyID: "66dd2723bd42fdec41bdbb53",
  //   status: "Active",
  //   groupCode: null,
  //   aliasID: null,
  //   name: "Abcsds",
  //   person: "Abc",
  //   reference: "No",
  //   building: "asjkas",
  //   lane: "AHbs",
  //   area: "abcsd",
  //   city: "Surat, Gujarat",
  //   pin: "875421",
  //   state: "",
  //   country: "India",
  //   phone1: "87854218754",
  //   phone2: "87542154",
  //   phone3: "9865326598",
  //   phone1Name: "Abc",
  //   phone2Name: "XYZ",
  //   phone3Name: "MNP",
  //   email1: "abc@gmail.com",
  //   gstin: "AFSAS8754A",
  //   ref1: null,
  //   ref2: null,
  //   rem1: null,
  //   rem2: null,
  //   manager: null,
  //   tick: null,
  //   zCDT: "0001-01-01T00:00:00Z",
  //   zCUSER: null,
  //   zCIP: null,
  //   zEDT: "0001-01-01T00:00:00Z",
  //   zEUSER: null,
  //   zEIP: null
  // }

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
              {showKundliList && (
                <div className="KundliList">
                  <Box>
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
                  </Box>
                </div>
              )}
              {/* <div className="KundliList">
                <Box>
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

                </Box>
              </div> */}
            </CardContent>
          </Card>

        </Grid>
      </Grid>

      <Grid container spacing={6} className='mt-2'>

        <Grid item xs={12} md={12}>
          <Card>
            <CardContent className='flex flex-col gap-4 p-5'>

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
