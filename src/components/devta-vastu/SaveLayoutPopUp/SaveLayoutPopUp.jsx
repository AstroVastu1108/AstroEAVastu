import { editVastuLayouts, saveVastuLayouts } from '@/app/Server/API/vastulayout'
import {
  Autocomplete,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  ThemeProvider
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
function SaveLayoutPopUp({ open, handleClose, tabGroup, layoutData, setLayoutData, savedGroups, previewUrl, fileInfo,setLoading }) {
  const router = useRouter();
  const theme = createTheme({
    shape: {
      borderRadius: 8 // Set the global border radius here
    }
  })
  const [formData, setFormData] = useState(layoutData)
  const [ClientData, setClientData] = useState([
    { clientId: 'CLT001', clientName: 'Alpha Corp' },
    { clientId: 'CLT002', clientName: 'Beta Enterprises' },
    { clientId: 'CLT003', clientName: 'Gamma Solutions' },
    { clientId: 'CLT004', clientName: 'Delta Innovations' },
    { clientId: 'CLT005', clientName: 'Epsilon Systems' }
  ])
  const [unitData, setUnitData] = useState([
    { Id: 'SF', Name: 'Square Feet' },
    { Id: 'SM', Name: 'Square Meter' },
    { Id: 'SY', Name: 'Square Yard' },
    { Id: 'H', Name: 'Hector' }
  ])
  const [errors, setErrors] = useState({
    ProjectName: false,
    clientId: false,
    Address: false,
    OAU: false,
    OAUV: false,
    CAU: false,
    CAUV: false,
    TAU: false,
    TAUV: false,
    Reference: false,
    Remark: false,
    Rivision: false
  })
  const [RequiredFields] = useState(['ProjectName', 'clientId', 'Address', 'OAU', 'CAU', 'TAU'])
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus()
      }
    }, 200)
  }, [open])

  const handleInputChange = (field, value, key, isRequired = false) => {
    if (isRequired) {
      if (!value) {
        setErrors(prev => ({
          ...prev,
          [key]: true
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          [key]: false
        }))
      }
    }

    if (field === 'ProjectName') {
      const newVal = value.replace(/^\w/, char => char.toUpperCase())
      setFormData(prev => ({
        ...prev,
        [field]: newVal
      }))
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLayoutSave = async () => {
    var flag = 0
    RequiredFields.map(e => {
      if (formData[e] == '') {
        setErrors(prev => ({
          ...prev,
          [`${e}`]: true
        }))
        flag = 1
      }
    })

    if (flag == 1) {
      return
    }

    const hasErrors = Object.values(errors).some(error => error === true)

    if (hasErrors) {
      // Display an error message or alert
      // toastDisplayer("error", "Please fill out all required fields correctly before submitting.");
      return // Prevent submission
    }

    const matchingItems = tabGroup
      .filter(item => savedGroups.includes(item.label))
      .map(({ label, points, centroid, snapToCentroid, inputDegree,zoom,translate, polygons,lockChakra,lockCentroid,lineSets,hideCircle,hide32Circle,hide16Circle,hide8Circle,hide4Circle}) => ({
        label,
        points,
        centroid,
        snapToCentroid,
        inputDegree,
        zoom,
        translate,
        polygons,
        lockChakra,lockCentroid,lineSets,hideCircle,hide32Circle,hide16Circle,hide8Circle,hide4Circle
      }))

    const payload = {
      // "CompanyID": "string",
      ProjectName: formData?.ProjectName,
      ClientName: formData?.clientId,
      Address: formData?.Address,
      OpenArea: formData?.OAUV,
      OpenAreaUnit: formData?.OAU,
      CoveredArea: formData?.CAUV,
      CoveredAreaUnit: formData?.CAU,
      TotalArea: formData?.TAUV,
      TotalAreaUnit: formData?.TAU,
      Reference: formData?.Reference,
      Remark: formData?.Remark,
      Revision: formData?.Revision,
      AuditDate: '2025-02-09T07:31:22.727Z',
      NecessaryFiles: [
        {
          OriginalFileName: fileInfo,
          Base64File: previewUrl
        }
      ],
      TabGroups: matchingItems
    }

    console.log('Payload : ', payload)
    try {
      setLoading(true);
      let data;
      let msg;
      if(formData?.isUpdate){
        setLayoutData(prev => ({
          ...prev,
          "ProjectName": formData?.ProjectName,
          "ClientName":formData?.clientId
        }))
        data = await editVastuLayouts(formData?.VPID,payload)
        msg = "Vastu Griding Update Successfully."
      }else{
        data = await saveVastuLayouts(payload)
        msg = "Vastu Griding Saved Successfully."
      }
      console.log('data result  : ', data)
      if(data.hasError){
        setLoading(false)
        return toast.error(data.error)
      }
      if(!formData?.isUpdate){
        router.push(`/devta-vastu/${data?.responseData?.Result?.VPID}`)
      }
      setLoading(false)
      handleClose()
      return toast.success(msg);

    } catch (error) {
      setLoading(false)
      return toast.error(error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        // className='rounded-lg'
        // maxWidth={'md'}
        fullWidth={true}
        PaperProps={{
          component: 'form',
          // className:'rounded',
          onSubmit: e => {
            e.preventDefault()
            //   if (!selectedGroup) setGroupError(true)
            //   if (!selectedBaseGroup) setBaseGroupError(true)
            //   if (selectedGroup && selectedBaseGroup) {
            //     handleSave(selectedGroup)
            //     handleClose()
            //   }
            handleLayoutSave()
          },
          sx: {
            width: '700px', // Set your custom width here
            maxWidth: '100%' // Optional: prevent exceeding container width
          }
        }}
      >
        <DialogTitle className='PopupHeader text-white p-3 py-2'>
          <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-primary text-2xl font-ea-sb !pl-3'>
              {!formData?.isUpdate ? 'Save Layout' : 'Update Layout'}
            </span>
            <IconButton
              aria-label='close'
              onClick={handleClose} // Replace with your close handler function
              sx={{
                color: 'white'
              }}
            >
              <i className='tabler-x text-primary'></i>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className='px-6 pt-2'>
          <DialogContentText>
            <Grid className='mt-1' container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Project Name'
                  autoFocus
                  inputRef={inputRef}
                  value={formData?.ProjectName}
                  //   size={TextFeildSize}
                  onChange={e => {
                    handleInputChange('ProjectName', e.target.value, 'ProjectName', true)
                  }}
                  error={errors.ProjectName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={ClientData}
                  getOptionLabel={option => option.clientName} // Extracts label text
                  // getOptionKey={option => option.clientId}
                  value={ClientData.find(item => item.clientName === formData?.clientId) || null}
                  // value={formData?.clientId || null}
                  onChange={(e, newValue) => {
                    handleInputChange('clientId', newValue?.clientName, 'clientId', true)
                    // setSelectedGroup(newValue ? newValue.label : null)
                    // setGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Client' error={errors?.clientId} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Client Address'
                  title='Client Address'
                  value={formData?.Address}
                  onChange={e => {
                    handleInputChange('Address', e.target.value, 'Address', true)
                  }}
                  error={errors.Address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={unitData}
                  getOptionLabel={option => option.Name} // Extracts label text
                  // getOptionKey={option => option.Id}
                  value={unitData.find(item => item.Id === formData?.OAU) || null}
                  // value={formData?.OAU || null}
                  onChange={(e, newValue) => {
                    handleInputChange('OAU', newValue?.Id, 'OAU', true)
                    // setSelectedGroup(newValue ? newValue.label : null)
                    // setGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Open Area & Unit' error={errors?.OAU} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Open Area & Unit Value'
                  value={formData?.OAUV}
                  onChange={e => {
                    handleInputChange('OAUV', e.target.value, 'OAUV', true)
                  }}
                  error={errors.OAU}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={unitData}
                  getOptionLabel={option => option.Name} // Extracts label text
                  // getOptionKey={option => option.Id}
                  value={unitData.find(item => item.Id === formData?.CAU) || null}
                  // value={formData?.CAU || null}
                  onChange={(e, newValue) => {
                    handleInputChange('CAU', newValue?.Id, 'CAU', true)
                    // setSelectedGroup(newValue ? newValue.label : null)
                    // setGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Covered Area & Unit' error={errors?.CAU} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Covered Area & Unit Value'
                  value={formData?.CAUV}
                  onChange={e => {
                    handleInputChange('CAUV', e.target.value, 'CAUV', true)
                  }}
                  error={errors.CAU}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={unitData}
                  getOptionLabel={option => option.Name} // Extracts label text
                  // getOptionKey={option => option.Id}
                  value={unitData.find(item => item.Id === formData?.TAU) || null}
                  // value={formData?.TAU || null}
                  onChange={(e, newValue) => {
                    handleInputChange('TAU', newValue?.Id, 'TAU', true)
                    // setSelectedGroup(newValue ? newValue.label : null)
                    // setGroupError(false)
                  }}
                  renderInput={params => <TextField {...params} label='Total Area & Unit' error={errors?.TAU} />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Total Area & Unit Value'
                  value={formData?.TAUV}
                  onChange={e => {
                    handleInputChange('TAUV', e.target.value, 'TAUV', true)
                  }}
                  error={errors.TAU}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Reference'
                  value={formData?.Reference}
                  onChange={e => {
                    handleInputChange('Reference', e.target.value, 'Reference', true)
                  }}
                  error={errors.Reference}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Rivision'
                  value={formData?.Rivision}
                  onChange={e => {
                    handleInputChange('Rivision', e.target.value, 'Rivision', true)
                  }}
                  error={errors.Rivision}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Remark'
                  value={formData?.Remark}
                  onChange={e => {
                    handleInputChange('Remark', e.target.value, 'Remark', true)
                  }}
                  error={errors.Remark}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='p-4 pt-0'>
          <Button variant='contained' className={'bg-primary'} type='submit'>
            Save
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default SaveLayoutPopUp
