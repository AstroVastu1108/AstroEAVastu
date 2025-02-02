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

  const DEFAULT_POINTS = [
    { x: 220, y: 220 },
    { x: 560, y: 220 },
    { x: 560, y: 560 },
    { x: 220, y: 560 }
  ]
  const [tabGroup, setTabGroup] = useState([
    {
      label: 'House Plan',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Google Layout',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Griding With 16 Zone',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: '16 Zone Bar Chart',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Civil Energy',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Devta Mark',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Devta Marking Color',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Devta bar chart',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Devta + Marma Points',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Custom Remedial Marking',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Site Energy audit',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    },
    {
      label: 'Geo ',
      points: DEFAULT_POINTS,
      centroid: null,
      setCentroid: null,
      snapToCentroid: false,
      setSnapToCentroid: null,
      inputDegree: 0,
      setInputDegree: null
    }
  ])
  const [selectedGroup, setSelectedGroup] = useState('House Plan')
  const [savedGroups, setSavedGroups] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)
  // const [points, setPoints] = useState(DEFAULT_POINTS);

  const [previewUrl, setPreviewUrl] = useState(null)

  async function readFileData(uploadedFile) {
    const fileReader = new FileReader()

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        try {
          const typedArray = new Uint8Array(fileReader.result)
          const pdf = await pdfjsLib.getDocument(typedArray).promise
          const images = []

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)

            // Increase the scale factor for higher resolution
            const scale = 4 // Adjust this as needed (e.g., 2 for 2x resolution)
            const viewport = page.getViewport({ scale })

            // Create a canvas with updated dimensions
            const canvas = document.createElement('canvas')
            canvas.width = viewport.width
            canvas.height = viewport.height

            const context = canvas.getContext('2d')

            // Render the page with higher quality
            await page.render({ canvasContext: context, viewport }).promise

            // Convert canvas to Base64
            const base64 = canvas.toDataURL()
            images.push(base64)
          }

          resolve(images)
        } catch (error) {
          console.error('Error extracting images:', error)
          reject(error)
        }
      }

      fileReader.onerror = () => {
        console.error('FileReader error:', fileReader.error)
        reject(fileReader.error)
      }

      fileReader.readAsArrayBuffer(uploadedFile)
    })
  }

  const handleFileUpload = async event => {
    const uploadedFile = event.target.files[0]

    if (uploadedFile) {
      const fileType = uploadedFile.type

      if (fileType.includes('image')) {
        // If the uploaded file is an image
        setFileUploaded(true)
        const reader = new FileReader()
        reader.onloadend = () => {
          // console.log("reader : ", reader.result)
          setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(uploadedFile)
      } else if (fileType === 'application/pdf') {
        // Extract all pages as images
        const images = await readFileData(uploadedFile)

        if (images.length > 0) {
          // Default to the first page
          setPreviewUrl(images[0])
          setFileUploaded(true)

          // Prompt the user for page selection
          const pageNumber = prompt(`Enter the page number (1 to ${images.length}):`, '1')

          if (pageNumber) {
            const pageIndex = parseInt(pageNumber, 10) - 1

            if (pageIndex >= 0 && pageIndex < images.length) {
              setPreviewUrl(images[pageIndex])
            } else {
              alert('Invalid page number. Showing the first page.')
            }
          }
        } else {
          alert('No pages found in the PDF.')
        }
      } else {
        alert('Unsupported file type. Please upload an image or PDF.')
      }
    }
  }

  const downloadPDF = () => {
    // downloadPDF()
    setDownloadPDFLoading(true)
  }

  const handleSave = () => {
    setSaveLoading(true)
    setSavedGroups(prev => {
      if (!prev.includes(selectedGroup)) {
        return [...prev, selectedGroup]
      }
      return prev
    })
    setTabGroup(prev => prev.filter(item => item.label !== selectedGroup))
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handlePointsChange = (index, newPoints) => {
    setTabGroup(prev => {
      const updatedGroup = [...prev]
      updatedGroup[index].points = newPoints
      return updatedGroup
    })
  }

  const handleCentroidChange = (index, newCentroid) => {
    setTabGroup(prev => {
      const updatedGroup = [...prev]
      updatedGroup[index].centroid = newCentroid
      return updatedGroup
    })
  }

  const handleSnapToCentroidChange = (index, newSnapToCentroid) => {
    setTabGroup(prev => {
      const updatedGroup = [...prev]
      updatedGroup[index].snapToCentroid = newSnapToCentroid
      return updatedGroup
    })
  }

  const handleInputDegreeChange = (index, newInputDegree) => {
    setTabGroup(prev => {
      const updatedGroup = [...prev]
      updatedGroup[index].inputDegree = newInputDegree
      return updatedGroup
    })
  }

  const updatePointsForAllTabs = (selectedGroup, newPoints) => {
    if (selectedGroup == 'House Plan') {
      setTabGroup(prevTabGroup =>
        prevTabGroup.map(tab => ({
          ...tab,
          points: newPoints
        }))
      )
    }
  }

  return (
    <>
      <Card>
        <PageTitle
          title={'Vastu Layout Griding'}
          endCmp={
            <>
              <div>
                <Select
                  labelId='tab-select-label'
                  id='tab-select'
                  value={selectedGroup}
                  onChange={e => {
                    setSelectedGroup(e.target.value)
                  }}
                  disableClearable
                  size='small'
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
                  Add
                </LoadingButton>
              </div>
            </>
          }
        />
        {savedGroups.length > 0 && (
          <>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label='saved groups tabs'>
              {savedGroups.map((group, index) => (
                <Tab key={index} label={group} />
              ))}
            </Tabs>
          </>
        )}
      </Card>
      {savedGroups.map(
        (group, index) =>
          activeTab === index && (
            <DevtaVastu
              key={index}
              downloadPDFLoading={downloadPDFLoading}
              setDownloadPDFLoading={setDownloadPDFLoading}
              saveLoading={saveLoading}
              setSaveLoading={setSaveLoading}
              selectedGroup={group}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
              handleFileUpload={handleFileUpload}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              points={tabGroup[index].points}
              setPoints={newPoints => handlePointsChange(index, newPoints)}
              centroid={tabGroup[index].centroid}
              setCentroid={newCentroid => handleCentroidChange(index, newCentroid)}
              snapToCentroid={tabGroup[index].snapToCentroid}
              setSnapToCentroid={newSnapToCentroid => handleSnapToCentroidChange(index, newSnapToCentroid)}
              inputDegree={tabGroup[index].inputDegree}
              setInputDegree={newInputDegree => handleInputDegreeChange(index, newInputDegree)}
              updatePointsForAllTabs={updatePointsForAllTabs}
            />
          )
      )}
    </>
  )
}

export default DevtaVastuPage
