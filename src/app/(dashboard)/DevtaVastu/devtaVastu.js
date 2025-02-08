'use client'
import Loader from '@/components/common/Loader/Loader'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import DiscardPopUp from '@/components/devta-vastu/DiscardTabPopUp/DiscardPopUp'
import DevtaVastu from '@/views/apps/devtaVastu/DevtaVastu'
import { LoadingButton } from '@mui/lab'
import { Card, MenuItem, Select, Tabs, Tab, IconButton } from '@mui/material'
import React, { useRef, useState } from 'react'
// import html2canvas from 'html2canvas';
// import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
// GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

// Set the worker
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

import DownloadPopUp from '@/components/devta-vastu/DownloadPDFPopup/DownloadPopUp'

import { toast } from "react-toastify";
function DevtaVastuPage() {
  const [loading, setLoading] = useState(false)
  const [downloadPDFLoading, setDownloadPDFLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const printRefs = useRef([])
  const leftprintRefs = useRef([])

  // useEffect(() => {
  //   setLoading(false)
  // }, [])

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

  const [selectedGroup, setSelectedGroup] = useState('1')
  const [savedGroups, setSavedGroups] = useState(['House Plan'])
  const [activeTab, setActiveTab] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [removeOpen, setRemoveOpen]=useState(false);
  const [selectedTab, setSelectedTab]=useState(null);
  const [downloadConfirm, setDownloadConfirm]=useState(false);

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
    setDownloadConfirm(!downloadConfirm);
  }

  const handleSave = () => {
    if(!fileUploaded){
      return toast.error("Please upload a file!!")
    }
    if (selectedGroup != 1) {
      setSaveLoading(true)
      setSavedGroups(prev => {
        if (!prev.includes(selectedGroup)) {
          return [...prev, selectedGroup]
        }
        return prev
      })
      // console.log(tabGroup.filter(item => item.label !== selectedGroup));
      // setTabGroup(prev => prev.filter(item => item.label !== selectedGroup))
      setSelectedGroup(1)
      setActiveTab(savedGroups.length)
    }
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


  const handleRemoveGroup = (value) => {
    if(savedGroups.length > 1){
      setSavedGroups((prev) => prev.filter((group) => group !== selectedTab));
      setActiveTab(activeTab-1)
    }
  };


  const generatePDFsForAllGroups = async (data) => {
    if (savedGroups.length === 0) {
      alert("Please add at least one group");
      return;
    }

    let preservedTab = activeTab;
    setLoading(true);

    // Hide the scrollbar
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed'; // Prevent scrolling
    document.body.style.width = '100%'; // Ensure full width

    const options = {
      margin: 10,
      filename: "output.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "pt", format: "a3", orientation: "landscape" },
    };

    const pdfContainer = document.createElement("div");

    for (let i = 0; i < data.length; i++) {
      const groupIndex = savedGroups.indexOf(data[i]);

      if (groupIndex === -1) {
        continue;
      }

      await waitForDOMUpdate();

      const leftDivRef = leftprintRefs.current[groupIndex];
      const rightDivRef = printRefs.current[groupIndex];

      if (!leftDivRef || !rightDivRef) {
        console.error(`🚨 Error: Element refs not found for groupIndex ${groupIndex}`);
        continue;
      }

      leftDivRef.classList.remove("hidden-print");

      const pageWrapper = document.createElement("div");
      pageWrapper.style.display = "flex";
      pageWrapper.style.pageBreakAfter = "always";

      // Clone left section
      const leftClone = leftDivRef.cloneNode(true);
      leftClone.style.width = "30%";
      leftClone.style.height = "100%";
      leftClone.style.display = "inline-block";
      leftClone.style.overflow = "hidden";

      // Clone right section
      const rightClone = rightDivRef.cloneNode(true);
      rightClone.style.width = "70%";
      rightClone.style.height = "100%";
      rightClone.style.display = "inline-block";
      rightClone.style.overflow = "hidden";

      pageWrapper.appendChild(leftClone);
      pageWrapper.appendChild(rightClone);
      pdfContainer.appendChild(pageWrapper);
    }

    if (!pdfContainer.innerHTML.trim()) {
      alert("No matching data found for PDF generation.");
      setLoading(false);
      document.body.style.overflow = ''; // Restore scrollbar
      document.body.style.height = ''; // Restore body height
      document.body.style.position = ''; // Restore position
      document.body.style.width = ''; // Restore width
      return;
    }

    document.body.appendChild(pdfContainer);

    await waitForImagesToLoad(pdfContainer);
    await waitForDOMUpdate();

    await html2pdf().from(pdfContainer).set(options).save();

    setActiveTab(preservedTab);
    document.body.removeChild(pdfContainer);
    setLoading(false);

    // Restore the scrollbar
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
  };

  // Helper function to ensure images load before rendering PDF
  const waitForImagesToLoad = (container) => {
    const images = Array.from(container.getElementsByTagName("img"));
    return Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );
  };

  // Helper function to wait for React state updates and re-renders
  const waitForDOMUpdate = () =>
    new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 300)));



  const handleRemoveOpen=(value)=>{
    if(savedGroups.length > 1){
      setSelectedTab(value);
      setRemoveOpen(!removeOpen);
    }
  }


  return (
    <>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='flex flex-col gap-4'>
            <Card>
              <PageTitle
                title={'Vastu Layout Griding'}
                endCmp={
                  <>
                    <div>
                      <LoadingButton
                        variant='outlined'
                        // onClick={generatePDFsForAllGroups}
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
                      <Select
                        labelId='tab-select-label'
                        id='tab-select'
                        value={selectedGroup || []}
                        onChange={e => {
                          setSelectedGroup(e.target.value)
                        }}
                        disableClearable
                        size='small'
                        sx={{
                          width: '200px'
                        }}
                      >
                        <MenuItem value='1' disabled>
                          Select Group
                        </MenuItem>
                        {tabGroup
                          .filter(item => !savedGroups.includes(item.label)) // Filter out saved groups
                          .map((item, index) => (
                            <MenuItem key={index} value={item.label}>
                              {item.label}
                            </MenuItem>
                          ))}
                        {/* {tabGroup.map((item, index) => (
                      <MenuItem key={index} value={item.label}>
                        {item.label}
                      </MenuItem>
                    ))} */}
                      </Select>
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
                        Add New
                      </LoadingButton>
                    </div>
                  </>
                }
              />
            </Card>
            <Card>
              {savedGroups.length > 0 && (
                <>
                  <div className='flex items-center space-x-2 overflow-auto'>
                    <Tabs
                      className='pt-1 flex-1 overflow-auto'
                      value={activeTab}
                      onChange={handleTabChange}
                      aria-label='saved groups tabs'
                      variant='scrollable' // Enables horizontal scrolling
                      scrollButtons='false' // Shows scroll buttons when needed
                    >
                      {savedGroups.map((group, index) => (
                        <Tab
                          key={index}
                          className='px-2'
                          label={
                            <div className='flex items-center gap-2 justify-between'>
                              <span>{group}</span>
                              <IconButton
                                size='small'
                                onClick={e => {
                                  e.stopPropagation() // Prevent tab change on button click
                                  handleRemoveOpen(group);
                                  // handleRemoveGroup(group)
                                }}
                              >
                                <i className='tabler-x text-xs'></i>
                              </IconButton>
                            </div>
                          }
                        />
                      ))}
                    </Tabs>
                  </div>

                  {/* Render DevtaVastu component for the active tab */}
                </>
              )}
              {savedGroups.map(
                (group, index) =>
                  activeTab === index && (
                    <DevtaVastu
                      key={index}
                      setPrintRef={el => (printRefs.current[index] = el)}
                      setleftPrintRef={el => (leftprintRefs.current[index] = el)}
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
            </Card>
            {removeOpen && <DiscardPopUp open={removeOpen} handleClose={handleRemoveOpen} TabData={selectedTab} handleRemoveGroup={handleRemoveGroup} />}
            {downloadConfirm && <DownloadPopUp open={downloadConfirm} handleClose={downloadPDF} TabData={savedGroups} handleSave={generatePDFsForAllGroups}/>}
          </div>
        </>
      )}
    </>
  )
}

export default DevtaVastuPage
