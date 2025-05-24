'use client'
import Loader from '@/components/common/Loader/Loader'
import PageTitle from '@/components/common/PageTitle/PageTitle'
import DiscardPopUp from '@/components/devta-vastu/DiscardTabPopUp/DiscardPopUp'
import DevtaVastu from '@/views/apps/devtaVastu/DevtaVastu'
import { LoadingButton } from '@mui/lab'
import { Card, MenuItem, Select, Tabs, Tab, IconButton, Menu, Button } from '@mui/material'
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
        // const updatedTabGroup = tabGroup.map((tab) => {
        //   const matchingData = incomingData?.find((data) => data.Label === tab.label && data.Title ===( tab.title || tab.label));
        //   if (matchingData) {
        //     return {
        //       ...tab,
        //       title: matchingData.Title ? matchingData.Title : tab.title,
        //       points: matchingData.Points.map((point) => ({
        //         x: point.x, // Convert X to x
        //         y: point.y  // Convert Y to y
        //       })),
        //       centroid: { x: matchingData.Centroid.x, y: matchingData.Centroid.y },
        //       snapToCentroid: matchingData.SnapToCentroid,
        //       inputDegree: matchingData.InputDegree,
        //       translate: { x: matchingData.Translate?.x, y: matchingData.Translate?.y },
        //       zoom: matchingData.Zoom,
        //       polygons: matchingData.Polygons,
        //       lockChakra: matchingData.lockChakra,
        //       lockCentroid: matchingData.lockCentroid,
        //       lineSets: matchingData.LineSets,
        //       hideCircle: matchingData.hideCircle,
        //       hide32Circle: matchingData.hide32Circle,
        //       hide4Circle: matchingData.hide4Circle,
        //       hide16Circle: matchingData.hide16Circle,
        //       hide8Circle: matchingData.hide8Circle,
        //       NecessaryFiles: matchingData.NecessaryFiles.map((file) => ({
        //         OriginalFileName: file.OriginalFileName,
        //         Base64File: file.Base64File,
        //         isPdf: file.isPdf,
        //         pdfImages: file.pdfImages,
        //         pdfPages: file.pdfPages,
        //         selectedPage: file.selectedPage
        //       })),
        //       cropImage: matchingData.CropImage,
        //       rotation: matchingData.Rotation,
        //       showDevta: matchingData.ShowDevta,
        //       showDevtaIntersaction: matchingData.ShowDevtaIntersaction,
        //       hideMarmaLines: matchingData.HideMarmaLines,
        //       hideMarmapoints: matchingData.HideMarmapoints,
        //       imageDragDone: matchingData.ImageDragDone,
        //       hideCircleIntersaction: matchingData.HideCircleIntersaction,
        //       disableDraw: matchingData.DisableDraw,
        //       hideDevta: matchingData.HideDevta,
        //       hideDevtaIntersaction: matchingData.HideDevtaIntersaction,
        //     };
        //   }
        //   return tab;
        // });
        const updatedTabGroup = [];

        tabGroup.forEach((tab) => {
          // Find ALL matching data items instead of just the first one
          const matchingDataItems = incomingData?.filter(
            (data) => data.Label === tab.label
          );

          if (matchingDataItems && matchingDataItems.length > 0) {
            // Add the first match as an update to the existing tab
            updatedTabGroup.push({
              ...tab,
              title: matchingDataItems[0].Title ? matchingDataItems[0].Title : tab.title,
              points: matchingDataItems[0].Points.map((point) => ({
                x: point.x,
                y: point.y
              })),
              centroid: { x: matchingDataItems[0].Centroid.x, y: matchingDataItems[0].Centroid.y },
              snapToCentroid: matchingDataItems[0].SnapToCentroid,
              inputDegree: matchingDataItems[0].InputDegree,
              translate: { x: matchingDataItems[0].Translate?.x, y: matchingDataItems[0].Translate?.y },
              zoom: matchingDataItems[0].Zoom,
              polygons: matchingDataItems[0].Polygons,
              lockChakra: matchingDataItems[0].lockChakra,
              lockCentroid: matchingDataItems[0].lockCentroid,
              lineSets: matchingDataItems[0].LineSets,
              hideCircle: matchingDataItems[0].hideCircle,
              hide32Circle: matchingDataItems[0].hide32Circle,
              hide4Circle: matchingDataItems[0].hide4Circle,
              hide16Circle: matchingDataItems[0].hide16Circle,
              hide8Circle: matchingDataItems[0].hide8Circle,
              NecessaryFiles: matchingDataItems[0].NecessaryFiles.map((file) => ({
                OriginalFileName: file.OriginalFileName,
                Base64File: file.Base64File,
                isPdf: file.isPdf,
                pdfPages: file.pdfPages,
                selectedPage: file.selectedPage,
                currentPageBase64: file.currentPageBase64,
                originalPdfBase64: file.originalPdfBase64 // Add this line to include the original PDF Base64
              })),
              cropImage: matchingDataItems[0].cropImage,
              rotation: matchingDataItems[0].rotation,
              showDevta: matchingDataItems[0].showDevta,
              showDevtaIntersaction: matchingDataItems[0].showDevtaIntersaction,
              hideMarmaLines: matchingDataItems[0].showMarma,
              hideMarmapoints: matchingDataItems[0].showMarmaPoints,
              imageDragDone: matchingDataItems[0].lockDragImage,
              hideCircleIntersaction: matchingDataItems[0].showChakraIntersactionPoints,
              disableDraw: matchingDataItems[0].doneDrowing,
              showDevta: matchingDataItems[0].showDevta,
              hideDevtaIntersaction: matchingDataItems[0].showDevtaPoints,
            });

            // // Add any additional matches as new tabs
            if (matchingDataItems.length > 1) {
              for (let i = 1; i < matchingDataItems.length; i++) {
                updatedTabGroup.push({
                  ...tab, // Base properties from the original tab
                  label: tab.label, // Keep the same label
                  title: matchingDataItems[i].Title ? matchingDataItems[i].Title : tab.title,
                  points: matchingDataItems[i].Points.map((point) => ({
                    x: point.x,
                    y: point.y
                  })),
                  centroid: { x: matchingDataItems[i].Centroid.x, y: matchingDataItems[i].Centroid.y },
                  snapToCentroid: matchingDataItems[i].SnapToCentroid,
                  inputDegree: matchingDataItems[i].InputDegree,
                  translate: { x: matchingDataItems[i].Translate?.x, y: matchingDataItems[i].Translate?.y },
                  zoom: matchingDataItems[i].Zoom,
                  polygons: matchingDataItems[i].Polygons,
                  lockChakra: matchingDataItems[i].lockChakra,
                  lockCentroid: matchingDataItems[i].lockCentroid,
                  lineSets: matchingDataItems[i].LineSets,
                  hideCircle: matchingDataItems[i].hideCircle,
                  hide32Circle: matchingDataItems[i].hide32Circle,
                  hide4Circle: matchingDataItems[i].hide4Circle,
                  hide16Circle: matchingDataItems[i].hide16Circle,
                  hide8Circle: matchingDataItems[i].hide8Circle,
                  NecessaryFiles: matchingDataItems[i].NecessaryFiles.map((file) => ({
                    OriginalFileName: file.OriginalFileName,
                    Base64File: file.Base64File,
                    isPdf: file.isPdf,
                    pdfPages: file.pdfPages,
                    selectedPage: file.selectedPage,
                    currentPageBase64: file.currentPageBase64,
                    originalPdfBase64: file.originalPdfBase64 // Add this line to include the original PDF Base64
                  })),
                  cropImage: matchingDataItems[i].cropImage,
                  rotation: matchingDataItems[i].rotation,
                  showDevta: matchingDataItems[i].showDevta,
                  showDevtaIntersaction: matchingDataItems[i].showDevtaIntersaction,
                  hideMarmaLines: matchingDataItems[i].showMarma,
                  hideMarmapoints: matchingDataItems[i].showMarmaPoints,
                  imageDragDone: matchingDataItems[i].lockDragImage,
                  hideCircleIntersaction: matchingDataItems[i].showChakraIntersactionPoints,
                  disableDraw: matchingDataItems[i].doneDrowing,
                  showDevta: matchingDataItems[i].showDevta,
                  showDevtaPoints: matchingDataItems[i].showDevtaPoints,
                  // id: `${tab.id || tab.label}_additional_${i}`, // Create a unique ID for each additional tab
                });
              }
            }
          } else {
            // If no match is found, keep the original tab
            updatedTabGroup.push(tab);
          }
        });

        const matchedLabels = incomingData?.map((data) => data.Title)
          .filter((label) => updatedTabGroup.some((tab) => tab.title === label));

        setTabGroup(updatedTabGroup);
        setSavedGroups(matchedLabels);
        setActiveHouse(updatedTabGroup.filter((item) => item.title == matchedLabels[0])[0]);
        setFileUploaded(true)
        // setPreviewUrl(res.responseData?.Result?.VastuLayout?.NecessaryFiles[0]?.Base64File)
        // setFileInfo(res.responseData?.Result?.VastuLayout?.NecessaryFiles[0]?.OriginalFileName)
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

  // const [points, setPoints] = useState(DEFAULT_POINTS);

  // const [previewUrl, setPreviewUrl] = useState(null)

  // useEffect(() => {
  //   const getLayouts = async () => {
  //     const data = await getVastuLayouts()
  //     console.log('Data : ', data)
  //   }
  //   getLayouts()
  // }, [])

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

  // const handleFileUpload = async event => {
  //   const uploadedFile = event.target.files[0]

  //   if (uploadedFile) {
  //     const fileType = uploadedFile.type
  //     const name = uploadedFile.name
  //     setFileInfo(name)
  //     if (fileType.includes('image')) {
  //       // If the uploaded file is an image
  //       setFileUploaded(true)
  //       const reader = new FileReader()
  //       reader.onloadend = () => {
  //         // console.log("reader : ", reader.result)
  //         setPreviewUrl(reader.result)
  //       }
  //       reader.readAsDataURL(uploadedFile)
  //     } else if (fileType === 'application/pdf') {
  // // Extract all pages as images
  // const images = await readFileData(uploadedFile)

  // if (images.length > 0) {
  //   // Default to the first page
  //   setPreviewUrl(images[0])
  //   setFileUploaded(true)

  //   // Prompt the user for page selection
  //   const pageNumber = prompt(`Enter the page number (1 to ${images.length}):`, '1')

  //   if (pageNumber) {
  //     const pageIndex = parseInt(pageNumber, 10) - 1

  //     if (pageIndex >= 0 && pageIndex < images.length) {
  //       setPreviewUrl(images[pageIndex])
  //     } else {
  //       alert('Invalid page number. Showing the first page.')
  //     }
  //   }
  // } else {
  //   alert('No pages found in the PDF.')
  // }
  //     } else {
  //       alert('Unsupported file type. Please upload an image or PDF.')
  //     }
  //   }
  // }

  // const handleFileUpload = async event => {
  //   const uploadedFile = event.target.files[0]

  //   if (uploadedFile) {
  //     const fileType = uploadedFile.type
  //     const name = uploadedFile.name
  //     setFileInfo(name)

  //     // Check for SVG specifically or any other image type
  //     if (fileType.includes('image') || fileType === 'image/svg+xml') {
  //       // If the uploaded file is an image (including SVG)
  //       setFileUploaded(true)
  //       const reader = new FileReader()
  //       reader.onloadend = () => {
  //         // console.log("reader : ", reader.result)
  //         setPreviewUrl(reader.result)
  //       }
  //       reader.readAsDataURL(uploadedFile)
  //     } else if (fileType === 'application/pdf') {
  //       // Extract all pages as images
  //       const images = await readFileData(uploadedFile)

  //       if (images.length > 0) {
  //         // Default to the first page
  //         setPreviewUrl(images[0])
  //         setFileUploaded(true)

  //         // Prompt the user for page selection
  //         const pageNumber = prompt('Enter the page number (1 to ' + images.length + '):', '1')

  //         if (pageNumber) {
  //           const pageIndex = parseInt(pageNumber, 10) - 1

  //           if (pageIndex >= 0 && pageIndex < images.length) {
  //             setPreviewUrl(images[pageIndex])
  //           } else {
  //             alert('Invalid page number. Showing the first page.')
  //           }
  //         }
  //       } else {
  //         alert('No pages found in the PDF.')
  //       }
  //     } else {
  //       alert('Unsupported file type. Please upload an image (including SVG) or PDF.')
  //     }
  //   }
  // }

  const handleFileUpload = (tabGroup, tabIndex) => (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      const fileType = uploadedFile.type;
      const name = uploadedFile.name;
      setFileInfo(name);

      // Create a reader to get the Base64 representation of the file
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result;
        if (fileType.includes('image') || fileType === 'image/svg+xml') {
          setTabGroup(prevTabGroup => {
            const updatedTabGroup = JSON.parse(JSON.stringify(prevTabGroup));
            if (!updatedTabGroup[tabIndex].NecessaryFiles) {
              updatedTabGroup[tabIndex].NecessaryFiles = [];
            }
            updatedTabGroup[tabIndex].NecessaryFiles[0] = {
              OriginalFileName: name,
              Base64File: base64Data
            };
            return updatedTabGroup;
          });

          setFileUploaded(true);
          setPreviewUrl(base64Data);
        }
        else if (fileType === 'application/pdf') {
          setTabGroup(prevTabGroup => {
            const updatedTabGroup = JSON.parse(JSON.stringify(prevTabGroup));

            if (!updatedTabGroup[tabIndex].NecessaryFiles) {
              updatedTabGroup[tabIndex].NecessaryFiles = [];
            }

            updatedTabGroup[tabIndex].NecessaryFiles[0] = {
              OriginalFileName: name,
              Base64File: "", 
              isPdf: true,
              pdfPages: 0,
              selectedPage: 0
            };

            return updatedTabGroup;
          });

          processPdfWithPdfJs(base64Data, tabIndex, name);
        } else {
          alert('Unsupported file type. Please upload an image (including SVG) or PDF.');
        }
      };

      reader.readAsDataURL(uploadedFile);
    }
  };

  // PDF.js processing function
  const processPdfWithPdfJs = (pdfBase64, tabIndex, fileName) => {
    const base64Data = pdfBase64.substring(pdfBase64.indexOf(',') + 1);

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    pdfjsLib.getDocument({ data: bytes }).promise
      .then((pdf) => {
        const totalPages = pdf.numPages;
        renderPdfPage(pdf, 1, tabIndex, fileName, pdfBase64, totalPages);

        setTabGroup(prevTabGroup => {
          const updatedTabGroup = JSON.parse(JSON.stringify(prevTabGroup));

          if (!updatedTabGroup[tabIndex].NecessaryFiles) {
            updatedTabGroup[tabIndex].NecessaryFiles = [];
          }

          updatedTabGroup[tabIndex].NecessaryFiles[0] = {
            ...updatedTabGroup[tabIndex].NecessaryFiles[0],
            pdfPages: totalPages,
          };

          return updatedTabGroup;
        });

        renderPdfPage(pdf, 1, tabIndex, fileName, pdfBase64, totalPages);
      })
      .catch(error => {
        console.error("Error loading PDF:", error);
      });
  };

  // Function to render a specific PDF page
  const renderPdfPage = (pdfDocument, pageNumber, tabIndex, fileName, originalPdfBase64, totalPages) => {
    pdfDocument.getPage(pageNumber).then(page => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Create an off-screen canvas to render the PDF page
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };

      // Render the page
      page.render(renderContext).promise.then(() => {
        // Convert the rendered page to base64
        const pageBase64 = canvas.toDataURL('image/png');

        setPreviewUrl(pageBase64);
        setFileUploaded(true);

        // Update the tabGroup with the rendered page
        setTabGroup(prevTabGroup => {
          const updatedTabGroup = JSON.parse(JSON.stringify(prevTabGroup));

          if (!updatedTabGroup[tabIndex].NecessaryFiles) {
            updatedTabGroup[tabIndex].NecessaryFiles = [];
          }

          // Update with the rendered page
          updatedTabGroup[tabIndex].NecessaryFiles[0] = {
            OriginalFileName: fileName,
            Base64File: "", // Current page as image
            originalPdfBase64: originalPdfBase64, // Store original PDF data for later use
            isPdf: true,
            pdfPages: totalPages,
            selectedPage: pageNumber - 1,
            currentPageBase64: pageBase64 // Store current page separately
          };

          return updatedTabGroup;
        });
      });
    });
  };


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

  // const handleSave = (selectedGroup, selectedBaseGroup, tabTitle) => {
  //   console.log("selectedGroup : ", selectedGroup);
  //   console.log("selectedBaseGroup : ", selectedBaseGroup);
  //   console.log("tabTitle : ", tabTitle);
  //   if (!fileUploaded) {
  //     return toast.error('Please upload a file!!');
  //   }

  //   // Find the base group data
  //   const baseGroupData = tabGroup.find(tab => tab.title === selectedBaseGroup);

  //   if (!baseGroupData) {
  //     return toast.error('Base group not found!');
  //   }

  //   // Update tabGroup by replacing selectedGroup with baseGroupData, keeping its label
  //   setTabGroup(prevTabGroup =>
  //     prevTabGroup.map(tab =>
  //       tab.title === selectedGroup
  //         ? { ...baseGroupData, label: tab.label, title: tabTitle }  // Keep label, update other data
  //         : tab // Keep existing data for other tabs
  //     )
  //   );


  //   if (selectedGroup !== 1) {
  //     setSaveLoading(true);
  //     setSavedGroups(prev => {
  //       if (!prev.includes(selectedGroup)) {
  //         return [...prev, selectedGroup];
  //       }
  //       return prev;
  //     });
  //     setActiveTab(savedGroups.length);
  //   }
  // };

  const handleSave = (selectedGroup, selectedBaseGroup, tabTitle) => {
    if (!fileUploaded) {
      return toast.error('Please upload a file!!');
    }

    // Find the base group data
    const baseGroupData = tabGroup.find(tab => tab.title === selectedBaseGroup);

    if (!baseGroupData) {
      return toast.error('Base group not found!');
    }

    const isTitleUnique = !tabGroup.some(tab => tab.title === tabTitle);
    if (!isTitleUnique) {
      return toast.error('Title already exists! Please choose a different title.');
    }
    setTabGroup(prevTabGroup => {
      if (isTitleUnique) {
        return [
          ...prevTabGroup,
          { ...baseGroupData, label: baseGroupData.label, title: tabTitle }
        ];
      }
    });

    if (selectedGroup != 1) {
      setSaveLoading(true)
      setSavedGroups(prev => {
        if (!prev.includes(tabTitle)) {
          return [...prev, tabTitle]
        }
        return prev
      })
      setActiveTab(savedGroups.length)
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
      setSavedGroups(prev => prev.filter(group => group !== selectedTab.title))
      const removeIndex = savedGroups.indexOf(selectedTab.title);
      if (activeTab == removeIndex && activeTab != 0 && savedGroups.length > 1) {
        setActiveTab(activeTab - 1)
      } else if (removeIndex == 0 && savedGroups.length == 2) {
        setActiveTab(0)
      } else if (removeIndex == 0 && savedGroups.length > 2) {
        setActiveTab(0)
      } else if (activeTab == removeIndex && savedGroups.length > 1) {
        setActiveTab(activeTab + 1)
      }
    }
  }
  const handleDownload = async (data) => {
    setIsDownloading(true);
    await printHandler(data); // Your download function
    setIsDownloading(false);
  };

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

    // Create a container for all pages
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

      // Clone left section
      const leftClone = leftDivRef.cloneNode(true);
      leftClone.style.width = "26%";
      leftClone.style.height = "100%";
      leftClone.style.display = "inline-block";
      leftClone.style.overflow = "hidden";
      leftClone.style.paddingTop = "24px"
      leftClone.style.fontFamily = "'Segoe UI', Arial, sans-serif"; // Apply font-family

      // Clone right section
      const rightClone = rightDivRef.cloneNode(true);
      rightClone.style.width = "74%";
      rightClone.style.height = "790px";
      rightClone.style.display = "inline-block";
      rightClone.style.overflow = "hidden";
      rightClone.style.paddingTop = "24px"
      rightClone.style.paddingLeft = "8px"
      rightClone.style.fontFamily = "'Segoe UI', Arial, sans-serif"; // Apply font-family

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

    // Apply the optimized settings we determined for the first function
    const options = {
      margin: 0,
      filename: 'output.pdf',
      image: {
        type: 'jpeg',
        quality: 0.85 // Optimized JPEG quality
      },
      html2canvas: {
        scale: 8, // Using the scale of 8 that worked well in your other function
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        imageTimeout: 0, // No timeout for large content
        backgroundColor: '#FFFFFF' // Ensures white background
      },
      jsPDF: {
        unit: 'pt',
        format: 'a4',
        orientation: 'landscape',
        compress: true, // Enable PDF compression
        hotfixes: ["px_scaling"] // Help with better text rendering
      }
    }

    await html2pdf()
      .from(pdfContainer)
      .set(options)
      .save()

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

  const [activeHouse, setActiveHouse] = useState(tabGroup.findIndex((e) => e.title == savedGroups[activeTab])[0]);

  useEffect(() => {
    setActiveHouse(tabGroup.filter((e) => e.title == savedGroups[activeTab])[0]);
  }, [activeTab]);

  // const printHandler = (data) => {
  //   // Check if we have any refs to print
  //   if (!printRefs.current || printRefs.current.length === 0) {
  //     console.error('Print container refs are empty or null')
  //     return
  //   }
  //   console.warn('Print container refs:', printRefs)
  //   console.warn('Print container refs:', data)
  //   // return;

  //   try {
  //     // Create a container for all content
  //     const printContainer = document.createElement('div')

  //     // Loop through all refs and add their content to the container
  //     printRefs.current.forEach((ref, index) => {
  //       const pageWrapper = document.createElement('div')
  //       pageWrapper.className = index < printRefs.current.length - 1 ? 'new-page page-break' : 'new-page'
  //       if (ref) {
  //         // Clone the content to avoid modifying the original
  //         const content = ref.cloneNode(true)

  //         // Create a wrapper for each component with page break styling

  //         pageWrapper.appendChild(content)

  //         // Add to the print container
  //         printContainer.appendChild(pageWrapper)
  //       }
  //     })

  //     // Create a hidden iframe to handle the PDF generation
  //     const iframe = document.createElement('iframe')
  //     iframe.style.display = 'none'
  //     document.body.appendChild(iframe)

  //     // Format the current date in YYYY-MM-DD HH:MM:SS format
  //     const currentDate = new Date()
  //     const formattedDate = currentDate.toISOString().split('T')[0]
  //     const formattedTime = currentDate.toTimeString().split(' ')[0]
  //     const fullDateTime = `${formattedDate} ${formattedTime}`

  //     // User information
  //     const username = 'DhruviRana4' // Using the username you provided

  //     // Add necessary styles for printing with landscape orientation
  //     iframe.contentDocument.write(`
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <title>Print Document</title>
  //       <style>
  //         @page {
  //           size: landscape;
  //           margin: 0;
  //         }

  //         @media print {
  //           body {
  //             margin: 0;
  //             background-color: white;
  //             color: black;
  //           }

  //           /* Force color printing */
  //           * {
  //             -webkit-print-color-adjust: exact !important;
  //             print-color-adjust: exact !important;
  //             color-adjust: exact !important;
  //           }

  //           /* Page break styling */
  //           .page-break {
  //             page-break-after: always;
  //             break-after: page;
  //           }

  //           /* Make sure last page doesn't have a break */
  //           .new-page:last-of-type {
  //             page-break-after: avoid;
  //             break-after: avoid;
  //           }
  //         }

  //         /* Non-print styles */
  //         body {
  //           margin: 0;
  //           padding: 20px;
  //           background-color: white;
  //           color: black;
  //           font-family: Arial, sans-serif;
  //         }



  //         /* Page break styling for preview */
  //         .page-break {
  //           margin-bottom: 30px;
  //           border-bottom: 1px dashed #ccc;
  //           padding-bottom: 30px;
  //         }


  //       </style>
  //     </head>
  //     <body>
  //       <div id="print-content">
  //         ${printContainer.innerHTML}
  //       </div>
  //     </body>
  //     </html>
  //     `)

  //     iframe.contentDocument.close()

  //     // Trigger print dialog and wait for it to complete
  //     iframe.contentWindow.focus()

  //     // Use a timeout to ensure the content is fully loaded
  //     setTimeout(() => {
  //       // Generate a dynamic filename with user and date
  //       const simpleDate = formattedDate.replace(/-/g, '')
  //       const dynamicFileName = `report_${username}_${simpleDate}.pdf`

  //       // Store the original title
  //       const originalTitle = document.title

  //       // Set the new title (filename)
  //       document.title = dynamicFileName

  //       // Print the document
  //       iframe.contentWindow.print()

  //       // Listen for the afterprint event to clean up
  //       iframe.contentWindow.addEventListener(
  //         'afterprint',
  //         () => {
  //           // Restore the original document title
  //           document.title = originalTitle

  //           // Remove the iframe after printing is done
  //           document.body.removeChild(iframe)
  //         },
  //         { once: true }
  //       )
  //     }, 500)
  //   } catch (err) {
  //     console.error('Print error:', err)
  //     alert('There was an error preparing the print view. Please try again.')
  //   }
  // }

  const printHandler = (data) => {
    // Check if we have any refs to print
    if (!printRefs.current || printRefs.current.length === 0) {
      console.error('Print container refs are empty or null')
      return
    }

    try {
      // Create a container for all content
      const printContainer = document.createElement('div')

      // If data array is provided, use it to find divs with matching IDs
      if (Array.isArray(data) && data.length > 0) {
        // Loop through the data array
        data.forEach((item, i) => {
          // Find the ref with ID matching the data item
          const ref = printRefs.current.find(element => element.id === item)
          const groupIndex = tabGroup.findIndex(e => e.label == data[i]);
          console.warn('Group Index:', groupIndex)
          if (groupIndex === -1) {
            console.warn(`No matching group found for item: ${item}`)
            return
          }

          if (ref) {
            const pageWrapper = document.createElement('div')
            // pageWrapper.className = i < data.length - 1 ? 'new-page page-break' : 'new-page'
            pageWrapper.className = 'new-page page-break'

            // Clone the content to avoid modifying the original
            const content = ref.cloneNode(true);
            const rightDivRef = leftprintRefs.current[groupIndex]
            const rightClone = rightDivRef.cloneNode(true);

            pageWrapper.appendChild(content)
            // pageWrapper.appendChild(rightClone);
            printContainer.appendChild(pageWrapper)
          } else {
            console.warn(`No element found with ID: ${item}`)
          }
        })
      } else {
        return toast.error('No matching data found for PDF generation.')
      }

      // Create a hidden iframe to handle the PDF generation
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      document.body.appendChild(iframe)

      // Get current date and time from the provided details
      const fullDateTime = '2025-05-11 05:30:45' // From your input
      const formattedDate = fullDateTime.split(' ')[0]

      // User information from the provided details
      const username = 'DhruviRana4' // From your input

      // Add necessary styles for printing with landscape orientation
      iframe.contentDocument.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Document</title>
      <style>
        @page {
          size: landscape;
          margin: 0;
        }
        
        @media print {
          body {
            margin: 0;
            // padding: 20px;
            background-color: white;
            color: black;
          }
          
          /* Force color printing */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Page break styling */
          .page-break {
            page-break-after: always;
            break-after: page;
          }
          
          .new-page:last-of-type {
            page-break-after: avoid;
            break-after: avoid;
          }
          .main-print-div{
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }
          .hidden-print {
            position: static; /* Restore to default position during print */
            left: auto;
            width: 25%;
          }
        }
        
        /* Non-print styles */
        body {
          margin: 0;
          background-color: white;
          color: black;
          font-family: Arial, sans-serif;
        }
        
        /* Page break styling for preview */
        .page-break {
          padding: 20px 10px;
        }
      </style>
    </head>
    <body>
      <div>
        ${printContainer.innerHTML}
      </div>
    </body>
    </html>
    `)

      iframe.contentDocument.close()

      // Trigger print dialog and wait for it to complete
      iframe.contentWindow.focus()

      // Use a timeout to ensure the content is fully loaded
      setTimeout(() => {
        // Generate a dynamic filename with user and date
        const simpleDate = formattedDate.replace(/-/g, '')
        const dynamicFileName = `report_${username}_${simpleDate}.pdf`

        // Store the original title
        const originalTitle = document.title

        // Set the new title (filename)
        document.title = dynamicFileName

        // Print the document
        iframe.contentWindow.print()

        // Listen for the afterprint event to clean up
        iframe.contentWindow.addEventListener(
          'afterprint',
          () => {
            // Restore the original document title
            document.title = originalTitle

            // Remove the iframe after printing is done
            document.body.removeChild(iframe)
          },
          { once: true }
        )
      }, 500)
    } catch (err) {
      console.error('Print error:', err)
      alert('There was an error preparing the print view. Please try again.')
    }
  }


  // const updatePdfPages = (selectedGroup, pageNumber) => {
  //   const index = tabGroup.findIndex(tab => tab.title === selectedGroup);
  //   setTabGroup((prev) => {
  //     const updatedGroup = [...prev];
  //     const tabToUpdate = { ...updatedGroup[index] };
  //     const updatedNecessaryFiles = [...tabToUpdate?.NecessaryFiles];
  //     updatedNecessaryFiles[0] = { ...updatedNecessaryFiles[0], selectedPage: pageNumber };
  //     tabToUpdate.NecessaryFiles = updatedNecessaryFiles;
  //     updatedGroup[index] = tabToUpdate;
  //     return updatedGroup;
  //   });
  // }

  const updatePdfPages = async (selectedGroup, pageNumber) => {
    try {
      // Find the index of the selected tab group
      const index = tabGroup.findIndex(tab => tab.title === selectedGroup);

      if (index === -1) {
        toast.error("Selected tab group not found");
        return;
      }

      // Get the current necessary files data
      const currentNecessaryFiles = tabGroup[index]?.NecessaryFiles?.[0];
      if (!currentNecessaryFiles || !currentNecessaryFiles.isPdf || !currentNecessaryFiles.originalPdfBase64) {
        toast.error("No valid PDF data found in selected tab group");
        return;
      }
      setLoading(true);

      // Extract the base64 data (remove data URL prefix if present)
      let base64Data = currentNecessaryFiles.originalPdfBase64;
      if (base64Data.includes('base64,')) {
        base64Data = base64Data.substring(base64Data.indexOf(',') + 1);
      }

      // Convert base64 to binary
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Load the PDF document
      const pdfDocument = await pdfjsLib.getDocument({ data: bytes }).promise;
      const totalPages = pdfDocument.numPages;

      // Validate page number
      if (pageNumber < 0 || pageNumber >= totalPages) {
        setLoading(false);
        toast.error(`Invalid page number. Must be between 1 and ${totalPages}`);
        return;
      }

      const page = await pdfDocument.getPage(pageNumber + 1); // +1 because PDF.js uses 1-based indexing

      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };

      await page.render(renderContext).promise;
      const pageBase64 = canvas.toDataURL('image/png');
      setPreviewUrl(pageBase64);
      setTabGroup(prevTabGroup => {
        const updatedTabGroup = [...prevTabGroup];

        const updatedTab = { ...updatedTabGroup[index] };

        if (!updatedTab.NecessaryFiles) {
          updatedTab.NecessaryFiles = [];
        }

        updatedTab.NecessaryFiles[0] = {
          ...updatedTab.NecessaryFiles[0],
          selectedPage: pageNumber,
          currentPageBase64: pageBase64,
          pdfPages: totalPages
        };

        updatedTabGroup[index] = updatedTab;

        return updatedTabGroup;
      });

      setLoading(false);

      return pageBase64;
    } catch (error) {
      setLoading(false);
      toast.error("Error updating PDF page. Please try again.");
    }
  };


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
              {savedGroups.length > 0 && tabGroup && (
                <>
                  <div className='flex items-center space-x-2 overflow-auto'>
                    <MovableTabs savedGroups={savedGroups} setSavedGroups={setSavedGroups} handleRemoveOpen={handleRemoveOpen} activeTab={activeTab} handleTabChange={handleTabChange} groups={tabGroup} setActiveTab={setActiveTab} />
                  </div>

                </>
              )}
              {activeHouse && tabGroup && tabGroup.map(
                (group, index) => (
                  ((savedGroups.includes(group.title) ? forceRenderAllTabs : false) || activeHouse?.title === group.title) &&
                  (
                    <>
                      <DevtaVastu
                        tabTitle={group.title}
                        setPrintRef={el => (printRefs.current[index] = el)}
                        setleftPrintRef={el => (leftprintRefs.current[index] = el)}
                        downloadPDFLoading={downloadPDFLoading}
                        setDownloadPDFLoading={setDownloadPDFLoading}
                        saveLoading={saveLoading}
                        setSaveLoading={setSaveLoading}
                        selectedGroup={group.label}
                        setPageTitle={(newName) => {
                          console.warn("New Name : ", newName)
                          console.warn("New Name : ", savedGroups[activeTab])
                          console.warn("Group : ", tabGroup[index])
                          setSavedGroups(prevGroups => {
                            const updatedGroups = [...prevGroups]
                            updatedGroups[activeTab] = newName
                            return updatedGroups
                          })
                          setTabGroup((prev) => {
                            const updatedGroup = [...prev];
                            updatedGroup[index].title = newName;
                            return updatedGroup;
                          });
                        }}
                        fileUploaded={fileUploaded}
                        setFileUploaded={setFileUploaded}
                        handleFileUpload={handleFileUpload(tabGroup[index], index)}
                        previewUrl={tabGroup[index].NecessaryFiles[0]}
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
                        cropImage={tabGroup[index].cropImage}
                        setCropImage={newCropImage => handleTabGroupChange(index, 'cropImage', newCropImage)}
                        rotation={tabGroup[index].rotation}
                        setRotation={newRotation => handleTabGroupChange(index, 'rotation', newRotation)}
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
                        updatePdfPages={updatePdfPages}
                        hideMarmaLines={tabGroup[index].hideMarmaLines}
                        setHideMarmaLines={newHideMarmaLines => handleTabGroupChange(index, 'hideMarmaLines', newHideMarmaLines)}
                        hideMarmapoints={tabGroup[index].hideMarmapoints}
                        setHideMarmapoints={newHideMarmapoints => handleTabGroupChange(index, 'hideMarmapoints', newHideMarmapoints)}
                        imageDragDone={tabGroup[index].imageDragDone}
                        setImageDragDone={newImageDragDone => handleTabGroupChange(index, 'imageDragDone', newImageDragDone)}
                        hideCircleIntersaction={tabGroup[index].hideCircleIntersaction}
                        setHideCircleIntersaction={newHideCircleIntersaction => handleTabGroupChange(index, 'hideCircleIntersaction', newHideCircleIntersaction)}
                        showDevta={tabGroup[index].showDevta}
                        setShowDevta={newShowDevta => handleTabGroupChange(index, 'showDevta', newShowDevta)}
                        showDevtaIntersaction={tabGroup[index].showDevtaIntersaction}
                        setShowDevtaIntersaction={newShowDevtaIntersaction => handleTabGroupChange(index, 'showDevtaIntersaction', newShowDevtaIntersaction)}
                        disableDraw={tabGroup[index].disableDraw}
                        setDisableDraw={newDisableDraw => handleTabGroupChange(index, 'disableDraw', newDisableDraw)}
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
