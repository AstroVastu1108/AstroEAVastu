'use client'
import Loader from '@/components/common/Loader/Loader'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import DiscardPopUp from '@/components/devta-vastu/DiscardTabPopUp/DiscardPopUp'
import DevtaVastu from '@/views/apps/devtaVastu/DevtaVastu'
import { LoadingButton } from '@mui/lab'
import { Card, MenuItem, Select, Tabs, Tab, IconButton, Menu } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
// import html2canvas from 'html2canvas';
// import jsPDF from "jspdf";

import html2pdf from 'html2pdf.js'
import './devtaVastu.css'
// GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js';
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'

// Set the worker
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf'

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js'

import DownloadPopUp from '@/components/devta-vastu/DownloadPDFPopup/DownloadPopUp'

import { toast } from 'react-toastify'
import MovableTabs from '@/components/devta-vastu/DragableTabs/DragableTabs'
import AddPagePopUp from '@/components/devta-vastu/AddPagePopUp/AddPagePopUp'
import { TabsData } from './TabGroupsData'
import { getVastuLayouts, saveVastuLayouts } from '@/app/Server/API/vastulayout'

function DevtaVastuPage() {
  const [loading, setLoading] = useState(false)
  const [downloadPDFLoading, setDownloadPDFLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const printRefs = useRef([])
  const leftprintRefs = useRef([])

  // useEffect(() => {
  //   setLoading(false)
  // }, [])

  const [tabGroup, setTabGroup] = useState(TabsData)

  // const [selectedGroup, setSelectedGroup] = useState(null)
  const [savedGroups, setSavedGroups] = useState(['House Plan'])
  const [activeTab, setActiveTab] = useState(0)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileInfo,setFileInfo] = useState("")
  const [removeOpen, setRemoveOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(null)
  const [downloadConfirm, setDownloadConfirm] = useState(false)
  const [AddPage, setAddPage] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [layoutCount] = useState(parseInt(localStorage.getItem("layoutCount") || "1"));
  const openEl = Boolean(anchorEl);

  // const [points, setPoints] = useState(DEFAULT_POINTS);

  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    const getLayouts = async () => {
      const data = await getVastuLayouts()
      console.log('Data : ', data)
    }
    getLayouts()
  }, [])

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
      const name  = uploadedFile.name
      setFileInfo(name)
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
    handleAnchorElClose();
    setDownloadConfirm(!downloadConfirm)
  }

  const handleSave = (selectedGroup) => {
    if (!fileUploaded) {
      return toast.error('Please upload a file!!')
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
      // setSelectedGroup(1)
      setActiveTab(savedGroups.length)
    }
  }

  const handleTabChange = (event, newValue) => {
    console.log(activeTab)
    console.log(newValue)
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

  const handleRemoveGroup = value => {
    if (savedGroups.length > 1) {
      setSavedGroups(prev => prev.filter(group => group !== selectedTab))
      setActiveTab(activeTab - 1)
    }
  }

  const generatePDFsForAllGroups = async data => {
    if (savedGroups.length === 0) {
      alert('Please add at least one group')
      return
    }

    let preservedTab = activeTab
    setLoading(true)

    // Hide the scrollbar
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    document.body.style.position = 'fixed' // Prevent scrolling
    document.body.style.width = '100%' // Ensure full width

    const options = {
      margin: 0,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'landscape' }
    }

    const pdfContainer = document.createElement('div')

    for (let i = 0; i < data.length; i++) {
      const groupIndex = tabGroup.findIndex(e => e.label == data[i]);
      console.log(groupIndex);

      if (groupIndex === -1) {
        continue
      }

      await waitForDOMUpdate()

      const leftDivRef = leftprintRefs.current[groupIndex]
      const rightDivRef = printRefs.current[groupIndex]

      if (!leftDivRef || !rightDivRef) {
        console.error(`🚨 Error: Element refs not found for groupIndex ${groupIndex}`)
        continue
      }

      leftDivRef.classList.remove('hidden-print')

      const pageWrapper = document.createElement('div')
      pageWrapper.style.display = 'flex'
      pageWrapper.style.pageBreakAfter = 'always'


      const leftClone = leftDivRef.cloneNode(true);
      leftClone.style.width = "20%";
      leftClone.style.height = "100%";
      leftClone.style.display = "inline-block";
      leftClone.style.overflow = "hidden";
      // leftClone.style.border = "2px solid red";

      // Clone right section
      const rightClone = rightDivRef.cloneNode(true);
      rightClone.style.width = "80%";
      rightClone.style.height = "790px";
      rightClone.style.display = "inline-block";
      rightClone.style.overflow = "hidden";
      // rightClone.style.border = "2px solid red";

      pageWrapper.appendChild(rightClone);
      pageWrapper.appendChild(leftClone);
      pdfContainer.appendChild(pageWrapper);
    }

    if (!pdfContainer.innerHTML.trim()) {
      alert('No matching data found for PDF generation.')
      setLoading(false)
      document.body.style.overflow = '' // Restore scrollbar
      document.body.style.height = '' // Restore body height
      document.body.style.position = '' // Restore position
      document.body.style.width = '' // Restore width
      return
    }

    document.body.appendChild(pdfContainer)

    await waitForImagesToLoad(pdfContainer)
    await waitForDOMUpdate()

    await html2pdf().from(pdfContainer).set(options).save()

    setActiveTab(preservedTab)
    document.body.removeChild(pdfContainer)
    setLoading(false)

    // Restore the scrollbar
    document.body.style.overflow = ''
    document.body.style.height = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }

  // Helper function to ensure images load before rendering PDF
  const waitForImagesToLoad = container => {
    const images = Array.from(container.getElementsByTagName('img'))
    return Promise.all(
      images.map(
        img =>
          new Promise(resolve => {
            if (img.complete) {
              resolve()
            } else {
              img.onload = resolve
              img.onerror = resolve
            }
          })
      )
    )
  }

  // Helper function to wait for React state updates and re-renders
  const waitForDOMUpdate = () => new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 300)))

  const handleRemoveOpen = value => {
    if (savedGroups.length > 1) {
      setSelectedTab(value)
      setRemoveOpen(!removeOpen)
    }
  }

  const handleAnchorElOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorElClose = (event) => {
    setAnchorEl(null);
  };

  const AddNewlayout = () => {
    handleAnchorElClose();
    let layoutCount = parseInt(localStorage.getItem("layoutCount") || "1", 10);
    layoutCount++;
    localStorage.setItem("layoutCount", layoutCount);
    window.open(`${process.env.NEXT_PUBLIC_APP_URL}/devta-vastu`, "_blank");
  }

  const handleAddNewPage = () => {
    handleAnchorElClose();
    if (!fileUploaded) {
      return toast.error('Please upload a file!!')
    }
    setAddPage(!AddPage);
  }

  const [activeHouse, setActiveHouse] = useState(tabGroup.findIndex((e) => e.label == savedGroups[activeTab])[0]);

  useEffect(() => {
    console.log(tabGroup.findIndex((e) => e.label == savedGroups[activeTab]))
    setActiveHouse(tabGroup.filter((e) => e.label == savedGroups[activeTab])[0]);
  }, [activeTab])

  const handleSubmit = async () => {
    // const matchingItems = tabGroup.filter(item => savedGroups.includes(item.label));

    // console.log("TabGroup : ",matchingItems)

    const matchingItems = tabGroup
      .filter(item => savedGroups.includes(item.label))
      .map(({ label, points, centroid, snapToCentroid, inputDegree }) => ({
        label,
        points,
        centroid,
        snapToCentroid,
        inputDegree
      }))

    console.log('==> ', matchingItems)
    const payload = {
      // "CompanyID": "string",
      ProjectName: 'Sample Layout 4',
      ClientName: '',
      Address: 'string',
      OpenArea: 0,
      OpenAreaUnit: 'string',
      CoveredArea: 0,
      CoveredAreaUnit: 'string',
      TotalArea: 0,
      TotalAreaUnit: 'string',
      Reference: 'string',
      Remark: 'string',
      Revision: 0,
      AuditDate: '2025-02-09T07:31:22.727Z',
      NecessaryFiles: [
        {
          OriginalFileName: fileInfo,
          Base64File: previewUrl
        }
      ],
      TabGroups: matchingItems
    }

    console.log("Payload : ",payload)
    try {
      const data  = await saveVastuLayouts(payload)
      console.log("data result  : ",data)
    } catch (error) {

    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='flex flex-col gap-4'>
            <Card className='bg-primary'>
              <div className={`chart-name sticky top-0 z-50 font-ea-sb rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col`}>
                {`New-Vastu-Layout-${layoutCount}`}
                <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row gap-5 birthDateTime-Div`} >
                  <div className='flex flex-row gap-1 chart-date items-center'>
                    <span className='label font-ea-n'>Client Name: </span>
                    <span className='value font-ea-sb'>Client1</span>
                  </div>
                  <div className='flex flex-row gap-1 chart-date items-center'>
                    <span className='label font-ea-n'>Client ID: </span>
                    <span className='value font-ea-sb'>#C2411-0FU0C-0HHJF-WLHA1</span>
                  </div>

                  <div className='flex justify-end'>
                    <>
                      <IconButton onClick={handleAnchorElOpen}>
                        <i className={'tabler-dots-vertical bg-white'} />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={openEl}
                        onClose={handleAnchorElClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem onClick={AddNewlayout} className="flex gap-1">
                          <i className={'tabler-browser-check me-2'} />New Layout Project
                        </MenuItem>
                        <MenuItem onClick={handleAddNewPage} className="flex gap-1"><i className={'tabler-browser-check me-2'} />Add Page</MenuItem>
                        <MenuItem onClick={() => { }} className="flex gap-1"><i className={'tabler-browser-check me-2'} />Save Layout Project</MenuItem>
                        <MenuItem onClick={downloadPDF} className="flex gap-1"><i className={'tabler-browser-check me-2'} />Download Report</MenuItem>
                      </Menu>
                    </>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              {savedGroups.length > 0 && (
                <>
                  <div className='flex items-center space-x-2 overflow-auto'>
                    <MovableTabs savedGroups={savedGroups} setSavedGroups={setSavedGroups} handleRemoveOpen={handleRemoveOpen} activeTab={activeTab} handleTabChange={handleTabChange} groups={tabGroup} setActiveTab={setActiveTab} />
                  </div>

                </>
              )}
              {activeHouse && tabGroup.map(
                (group, index) =>
                  activeHouse?.label === group.label && (
                    <>
                      {console.log(group)}
                      {console.log(activeHouse)}
                      {console.log(index)}
                      <DevtaVastu
                        key={index}
                        setPrintRef={el => (printRefs.current[index] = el)}
                        setleftPrintRef={el => (leftprintRefs.current[index] = el)}
                        downloadPDFLoading={downloadPDFLoading}
                        setDownloadPDFLoading={setDownloadPDFLoading}
                        saveLoading={saveLoading}
                        setSaveLoading={setSaveLoading}
                        selectedGroup={group.label}
                        fileUploaded={fileUploaded}
                        setFileUploaded={setFileUploaded}
                        handleFileUpload={handleFileUpload}
                        previewUrl={previewUrl}
                        setPreviewUrl={setPreviewUrl}
                        // points={tabGroup.findIndex((e)=>e.label == savedGroups[index]).points}
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
                    </>
                  )
              )}
            </Card>
            {removeOpen && (
              <DiscardPopUp
                open={removeOpen}
                handleClose={handleRemoveOpen}
                TabData={selectedTab}
                handleRemoveGroup={handleRemoveGroup}
              />
            )}
            {downloadConfirm && (
              <DownloadPopUp
                open={downloadConfirm}
                handleClose={downloadPDF}
                TabData={savedGroups}
                handleSave={generatePDFsForAllGroups}
              />
            )}
            {AddPage && (
              <AddPagePopUp open={AddPage} handleClose={handleAddNewPage} handleSave={handleSave} tabGroup={tabGroup} savedGroups={savedGroups} />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default DevtaVastuPage
