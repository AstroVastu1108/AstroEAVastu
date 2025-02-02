'use client'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import DevtaVastu from '@/views/apps/devtaVastu/DevtaVastu'
import { LoadingButton } from '@mui/lab'
import { Card, MenuItem, Select, Tabs, Tab } from '@mui/material'
import React, { useState } from 'react'

function DevtaVastuPage() {
  const [loading, setLoading] = useState(false)
  const [downloadPDFLoading, setDownloadPDFLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [tabGroup, setTabGroup] = useState([
    {label: 'House Plan',state:[]},
    {label: 'Google Layout',state:[]},
    {label: 'Griding With 16 Zone',state:[]},
    {label: '16 Zone Bar Chart',state:[]},
    {label: 'Civil Energy',state:[]},
    {label: 'Devta Mark',state:[]},
    {label: 'Devta Marking Color',state:[]},
    {label: 'Devta bar chart',state:[]},
    {label: 'Devta + Marma Points',state:[]},
    {label: 'Custom Remedial Marking',state:[]},
    {label: 'Site Energy audit',state:[]},
    {label: 'Geo ',state:[]},
  ])
  const [selectedGroup, setSelectedGroup] = useState("House Plan")
  const [savedGroups, setSavedGroups] = useState([])
  const [activeTab, setActiveTab] = useState(0);

  const downloadPDF = () => {
    // downloadPDF()
    setDownloadPDFLoading(true)
  }

  const handleSave = () => {
    setSaveLoading(true);
    setSavedGroups((prev) => {
      if (!prev.includes(selectedGroup)) {
        return [...prev, selectedGroup];
      }
      return prev;
    });
    setTabGroup((prev) => prev.filter(item => item.label !== selectedGroup));
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Card>
        <PageTitle
          title={'Vastu Layout Griding'}
          endCmp={
            <>
              <div>
                <Select
                  labelId="tab-select-label"
                  id="tab-select"
                  value={selectedGroup}
                  onChange={(e) => {
                    setSelectedGroup(e.target.value);
                  }}
                  disableClearable
                  size="small"
                  sx={{
                    width: '200px'
                  }}
                >
                  {/* <MenuItem value="">Select Group</MenuItem> */}
                  {tabGroup.map((item, index) => (
                    <MenuItem key={index} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <LoadingButton
                  variant='outlined'
                  onClick={downloadPDF}
                  loading={loading}
                  loadingPosition='start'
                  type='submit'
                  sx={{
                    width: '200px'
                  }}
                >
                  Download Report
                </LoadingButton>
              </div>
              <div>
                <LoadingButton
                  variant='contained'
                  onClick={handleSave}
                  loadingPosition='start'
                  type='submit'
                  sx={{
                    width: '150px'
                  }}
                >
                  Save
                </LoadingButton>
              </div>
            </>
          }
        />
        {savedGroups.length > 0 && (
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
          aria-label="saved groups tabs"
        >
          {savedGroups.map((group, index) => (
            <Tab
              key={index}
              label={group}
              onClick={() => {
                // setSavedGroups((prev) => prev.filter(item => item !== group));
                // setTabGroup((prev) => [...prev, { label: group, state: [] }]);
              }}
            />
          ))}
        </Tabs>
        )}
      </Card>
      
      <DevtaVastu
        downloadPDFLoading={downloadPDFLoading}
        setDownloadPDFLoading={setDownloadPDFLoading}
        saveLoading={saveLoading}
        setSaveLoading={setSaveLoading}
        selectedGroup={savedGroups[activeTab]}
      />
    </>
  )
}

export default DevtaVastuPage
