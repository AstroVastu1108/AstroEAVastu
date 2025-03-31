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
import SaveLayoutPopUp from '@/components/devta-vastu/SaveLayoutPopUp/SaveLayoutPopUp'

import { getVastuLayouts, getVastuLayoutsByID, saveVastuLayouts } from '@/app/Server/API/vastulayout'
import { useRouter } from "next/navigation";
function DevtaVastuPage({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [downloadPDFLoading, setDownloadPDFLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const printRefs = useRef([])
  const leftprintRefs = useRef([])
  const [vastuLayoutData, setVastuLayoutData] = useState([])
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileInfo, setFileInfo] = useState("")
  const [previewUrl, setPreviewUrl] = useState(null)
  const [tabGroup, setTabGroup] = useState(TabsData);
  const [IsDownloading, setIsDownloading] = useState(false);
  const [forceRenderAllTabs, setForceRenderAllTabs] = useState(false);
  const [isLayoutChange, setIsLayoutChange] = useState(false);

  const [formData, setFormData] = useState({
    ProjectName: '',
    clientId: '',
    Address: '',
    OAU: '',
    OAUV: '',
    CAU: '',
    CAUV: '',
    TAU: '',
    TAUV: '',
    Reference: '',
    Remark: '',
    Rivision: '',
    isUpdate: '',
    VPID: ''
  })

  // const [selectedGroup, setSelectedGroup] = useState(null)
  const [savedGroups, setSavedGroups] = useState(['House Plan']);

  useEffect(() => {
    if (id != "NEW") {
      getVastuData(id);
    }
  }, []);

  // Func
  const getVastuData = async (kId) => {
    if (kId != "undefined" && kId != null) {
      setLoading(true);
      const res = await getVastuLayoutsByID(kId);
      setLoading(false);
      if (res.hasError) {
        router.push('/vastu-list')
      } else {
        const resData = res.responseData?.Result?.VastuLayout
        setFormData({
          ProjectName: resData?.ProjectName,
          clientId: resData?.ClientName,
          Address: resData?.Address,
          OAU: resData?.OpenAreaUnit,
          OAUV: resData?.OpenArea,
          CAU: resData?.CoveredAreaUnit,
          CAUV: resData?.CoveredArea,
          TAU: resData?.TotalAreaUnit,
          TAUV: resData?.TotalArea,
          Reference: resData?.Reference,
          Remark: resData?.Remark,
          Rivision: resData?.Revision,
          isUpdate: true,
          VPID: resData?.VPID
        })
        setVastuLayoutData(res.responseData?.Result?.VastuLayout)
        const incomingData = res.responseData?.Result?.VastuLayout?.TabGroups
        const updatedTabGroup = tabGroup.map((tab) => {
          const matchingData = incomingData?.find((data) => data.Label === tab.label);
          if (matchingData) {
            return {
              ...tab,
              points: matchingData.Points.map((point) => ({
                x: point.x, // Convert X to x
                y: point.y  // Convert Y to y
              })),
              centroid: { x: matchingData.Centroid.x, y: matchingData.Centroid.y },
              snapToCentroid: matchingData.SnapToCentroid,
              inputDegree: matchingData.InputDegree,
              translate: { x: matchingData.Translate?.x, y: matchingData.Translate?.y },
              zoom: matchingData.Zoom,
              polygons: matchingData.Polygons,
              lockChakra: matchingData.lockChakra,
              lockCentroid: matchingData.lockCentroid,
              lineSets: matchingData.LineSets,
              hideCircle: matchingData.hideCircle,
              hide32Circle: matchingData.hide32Circle,
              hide4Circle: matchingData.hide4Circle,
              hide16Circle: matchingData.hide16Circle,
              hide8Circle: matchingData.hide8Circle
            };
          }
          return tab;
        });

        const matchedLabels = incomingData?.map((data) => data.Label)
          .filter((label) => updatedTabGroup.some((tab) => tab.label === label));

        setTabGroup(updatedTabGroup);
        setSavedGroups(matchedLabels);
        setActiveHouse(updatedTabGroup.filter((item) => item.label == matchedLabels[0])[0]);
        setFileUploaded(true)
        setPreviewUrl(res.responseData?.Result?.VastuLayout?.NecessaryFiles[0]?.Base64File)
        setFileInfo(res.responseData?.Result?.VastuLayout?.NecessaryFiles[0]?.OriginalFileName)
      }
    } else {
      router.push('/vastu-list')
      // return toastDisplayer("error", "Kundli Id not found.");
    }

  }


  const [activeTab, setActiveTab] = useState(0)
  // const [fileUploaded, setFileUploaded] = useState(false)
  // const [fileInfo,setFileInfo] = useState("")
  const [removeOpen, setRemoveOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(null)
  const [downloadConfirm, setDownloadConfirm] = useState(false)
  const [AddPage, setAddPage] = useState(false);
  const [LayoutSave, setLayoutSave] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [layoutCount] = useState(parseInt(localStorage.getItem("layoutCount") || "1"));
  const openEl = Boolean(anchorEl);

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
          reject(error)
        }
      }

      fileReader.onerror = () => {
        reject(fileReader.error)
      }

      fileReader.readAsArrayBuffer(uploadedFile)
    })
  }

  const handleFileUpload = async event => {
    const uploadedFile = event.target.files[0]

    if (uploadedFile) {
      const fileType = uploadedFile.type
      const name = uploadedFile.name
      setFileInfo(name)
      if (fileType.includes('image')) {
        // If the uploaded file is an image
        setFileUploaded(true)
        const reader = new FileReader()
        reader.onloadend = () => {
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
    // setLoading(!loading);
    handleAnchorElClose();
    setDownloadConfirm(!downloadConfirm);
    setIsDownloading(!IsDownloading);
    setForceRenderAllTabs(!forceRenderAllTabs);
    // setLoading(false);
  }

  // const handleSave = (selectedGroup,selectedBaseGroup) => {
  //   if (!fileUploaded) {
  //     return toast.error('Please upload a file!!')
  //   }


  //   if (selectedGroup != 1) {
  //     setSaveLoading(true)
  //     setSavedGroups(prev => {
  //       if (!prev.includes(selectedGroup)) {
  //         return [...prev, selectedGroup]
  //       }
  //       return prev
  //     })
  //     setActiveTab(savedGroups.length)
  //   }
  // }

  const handleSave = (selectedGroup, selectedBaseGroup) => {
    if (!fileUploaded) {
      return toast.error('Please upload a file!!');
    }

    // Find the base group data
    const baseGroupData = tabGroup.find(tab => tab.label === selectedBaseGroup);

    if (!baseGroupData) {
      return toast.error('Base group not found!');
    }

    // Update tabGroup by replacing selectedGroup with baseGroupData, keeping its label
    setTabGroup(prevTabGroup =>
      prevTabGroup.map(tab =>
        tab.label === selectedGroup
          ? { ...baseGroupData, label: tab.label }  // Keep label, update other data
          : tab
      )
    );

    ("Updated tabGroup:", tabGroup);

    if (selectedGroup !== 1) {
      setSaveLoading(true);
      setSavedGroups(prev => {
        if (!prev.includes(selectedGroup)) {
          return [...prev, selectedGroup];
        }
        return prev;
      });
      setActiveTab(savedGroups.length);
    }
  };


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleTabGroupChange = (index, key, value) => {
    setIsLayoutChange(true);
    setTabGroup((prev) => {
      const updatedGroup = [...prev];
      updatedGroup[index][key] = value;

      return updatedGroup;
    });
  };

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

  const handleDownload = async () => {
    const response = await fetch("/api/generate-pdf");
    console.log(response)
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-pdf.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };


  // const handleDownload = async (data) => {
  //   setIsDownloading(true);
  //   await generatePDFsForAllGroups(data); // Your download function
  //   setIsDownloading(false);
  // };

  const generatePDFsForAllGroups = async data => {

    if (savedGroups.length === 0) {
      alert('Please add at least one group')
      return
    }

    let preservedTab = activeTab
    setLoading(true);

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

      if (groupIndex === -1) {
        continue
      }

      await waitForDOMUpdate()

      const leftDivRef = leftprintRefs.current[groupIndex]
      const rightDivRef = printRefs.current[groupIndex]

      if (!leftDivRef || !rightDivRef) {
        continue
      }

      leftDivRef.classList.remove('hidden-print')

      const pageWrapper = document.createElement('div')
      pageWrapper.style.display = 'flex'
      pageWrapper.style.pageBreakAfter = 'always'


      const leftClone = leftDivRef.cloneNode(true);
      leftClone.style.width = "26%";
      leftClone.style.height = "100%";
      leftClone.style.display = "inline-block";
      leftClone.style.overflow = "hidden";
      leftClone.style.paddingTop = "24px"
      leftClone.style.fontFamily = "'Segoe UI', Arial, sans-serif"; // Apply font-family
      // leftClone.style.border = "2px solid red";

      // Clone right section
      const rightClone = rightDivRef.cloneNode(true);
      rightClone.style.width = "74%";
      rightClone.style.height = "790px";
      rightClone.style.display = "inline-block";
      rightClone.style.overflow = "hidden";
      rightClone.style.paddingTop = "24px"
      rightClone.style.paddingLeft = "8px"
      rightClone.style.fontFamily = "'Segoe UI', Arial, sans-serif"; // Apply font-family
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

  const handleSaveLayoutToggle = () => {
    handleAnchorElClose();
    if (!fileUploaded) {
      return toast.error('Please upload a file!!')
    }
    setLayoutSave(!LayoutSave);
  }

  const [activeHouse, setActiveHouse] = useState(tabGroup.findIndex((e) => e.label == savedGroups[activeTab])[0]);

  useEffect(() => {
    setActiveHouse(tabGroup.filter((e) => e.label == savedGroups[activeTab])[0]);
  }, [activeTab])


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='flex flex-col gap-4'>
            <Card className='bg-primary'>
              <div className={`chart-name sticky top-0 z-50 font-ea-sb rounded-t flex justify-between md:items-center gap-y-2 lg:flex-row sm:flex-row flex-col`}>
                {vastuLayoutData?.ProjectName ? vastuLayoutData?.ProjectName : `New-Vastu-Layout-${layoutCount}`}
                <div className={`flex justify-between md-items-center lg:gap-1 lg:flex-row md:flex-row gap-5 birthDateTime-Div`} >
                  <div className='flex flex-row gap-1 chart-date items-center'>
                    <span className='label font-ea-n'>Client Name: </span>
                    <span className='value font-ea-sb'>{vastuLayoutData?.ClientName ? vastuLayoutData?.ClientName : "--"}</span>
                  </div>
                  {/* <div className='flex flex-row gap-1 chart-date items-center'>
                    <span className='label font-ea-n'>Client ID: </span>
                    <span className='value font-ea-sb'>{vastuLayoutData?.VPID ? "#" + vastuLayoutData?.VPID : "#--"}</span>
                  </div> */}

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
                        <MenuItem onClick={handleSaveLayoutToggle} className="flex gap-1"><i className={'tabler-browser-check me-2'} />{formData?.isUpdate ? "Update Layout Project" : "Save Layout Project"}</MenuItem>
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
              {activeHouse && tabGroup && tabGroup.map(
                (group, index) => (
                  (forceRenderAllTabs || activeHouse?.label === group.label) &&
                  (
                    <>
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
                        points={tabGroup[index].points}
                        setPoints={newPoints => handleTabGroupChange(index, 'points', newPoints)}
                        centroid={tabGroup[index].centroid}
                        setCentroid={newCentroid => handleTabGroupChange(index, 'centroid', newCentroid)}
                        snapToCentroid={tabGroup[index].snapToCentroid}
                        setSnapToCentroid={newSnapToCentroid => handleTabGroupChange(index, 'snapToCentroid', newSnapToCentroid)}
                        lockCentroid={tabGroup[index].lockCentroid}
                        setLockCentroid={newLockCentroid => handleTabGroupChange(index, 'lockCentroid', newLockCentroid)}
                        lockChakra={tabGroup[index].lockChakra}
                        setLockChakra={newLockChakra => handleTabGroupChange(index, 'lockChakra', newLockChakra)}
                        inputDegree={tabGroup[index].inputDegree}
                        setInputDegree={newInputDegree => handleTabGroupChange(index, 'inputDegree', newInputDegree)}
                        translate={tabGroup[index].translate}
                        setTranslate={newTranslate => handleTabGroupChange(index, 'translate', newTranslate)}
                        zoom={tabGroup[index].zoom}
                        setZoom={newZoom => handleTabGroupChange(index, 'zoom', newZoom)}
                        polygons={tabGroup[index].polygons}
                        setPolygons={newPolygons => handleTabGroupChange(index, 'polygons', newPolygons)}
                        updatePointsForAllTabs={updatePointsForAllTabs}
                        vastuLayoutData={vastuLayoutData}
                        hide32Circle={tabGroup[index].hide32Circle}
                        setHide32Circle={newHide32Circle => handleTabGroupChange(index, 'hide32Circle', newHide32Circle)}
                        hide16Circle={tabGroup[index].hide16Circle}
                        setHide16Circle={newHide16Circle => handleTabGroupChange(index, 'hide16Circle', newHide16Circle)}
                        hide8Circle={tabGroup[index].hide8Circle}
                        setHide8Circle={newHide8Circle => handleTabGroupChange(index, 'hide8Circle', newHide8Circle)}
                        hide4Circle={tabGroup[index].hide4Circle}
                        setHide4Circle={newHide4Circle => handleTabGroupChange(index, 'hide4Circle', newHide4Circle)}
                        hideCircle={tabGroup[index].hideCircle}
                        setHideCircle={newHideCircle => handleTabGroupChange(index, 'hideCircle', newHideCircle)}
                        lineSets={tabGroup[index].lineSets}
                        setLineSets={newLineSets => handleTabGroupChange(index, 'lineSets', newLineSets)}
                        setLoading={setLoading}
                        loading={loading}
                        IsDownloading={IsDownloading}
                        isLayoutChange={isLayoutChange}
                      />
                    </>
                    // <div key={index} style={{ display: activeHouse?.label === group.label ? 'block' : 'none' }}>
                    // </div>
                  ))
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
                handleSave={handleDownload}
              />
            )}
            {AddPage && (
              <AddPagePopUp open={AddPage} handleClose={handleAddNewPage} handleSave={handleSave} tabGroup={tabGroup} savedGroups={savedGroups} />
            )}
            {LayoutSave && (
              <SaveLayoutPopUp open={LayoutSave} layoutData={formData} setLayoutData={setVastuLayoutData} fileInfo={fileInfo} handleClose={handleSaveLayoutToggle} tabGroup={tabGroup} savedGroups={savedGroups} previewUrl={previewUrl} setLoading={setLoading} setIsLayoutChange={setIsLayoutChange} />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default DevtaVastuPage
