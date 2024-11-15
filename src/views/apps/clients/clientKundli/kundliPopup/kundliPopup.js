// import React, { useState } from 'react'
// import {
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton
// } from '@mui/material'
// import KundliDataGrid from '@/views/apps/kundli/KundliGrid/kundliGrid'

// function KundliPopUp({ open, handleAddClose, kundliData, onSelectKundli, client, cid, user, handleSubmit,kundliType }) {
//   const [isDisable, setIsDisable] = useState(false)
//   const [kundli, setKundli] = useState([])

//   const columns = [
//     { field: 'FirstName', flex: 1, headerName: 'First Name', headerClassName: 'rowheader', headerAlign: 'left' },
//     { field: 'MiddleName', flex: 1, headerName: 'Middle Name', headerClassName: 'rowheader', headerAlign: 'left' },
//     { field: 'LastName', flex: 1, headerName: 'Last Name', headerClassName: 'rowheader', headerAlign: 'left' },
//     { field: 'Gender', flex: 1, headerName: 'Gender', headerClassName: 'rowheader', headerAlign: 'left' },
//     { field: 'BirthDate', flex: 1, headerName: 'BirthDate', headerClassName: 'rowheader', headerAlign: 'left' },
//     { field: 'BirthTime', flex: 1, headerName: 'BirthTime', headerClassName: 'rowheader', headerAlign: 'left' }
//   ]





//   const [selectedData, setSelectedData] = useState([])

//   const handleRowClick = e => {
//     setSelectedData(e.row)
//   }


//   const handleSelectedSubmit = () => {
//     return handleSubmit(selectedData, client, setSelectedData)
//   }


//   return (
//     <Dialog
//       open={open}
//       onClose={handleAddClose}
//       maxWidth='md'
//       fullWidth
//       PaperProps={{
//         component: 'form',
//         onSubmit: event => {
//           event.preventDefault()
//         }
//       }}
//     >
//       <DialogTitle
//         className='PopupHeader bg-primary text-white p-4'
//         style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
//       >
//         <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span>Select Kundli</span>
//           <IconButton
//             aria-label='close'
//             onClick={handleAddClose}
//             sx={{
//               color: 'white'
//             }}
//           >
//             <i className='tabler-x'></i>
//           </IconButton>
//         </div>
//         <DialogContentText className='text-white'>Select the kundli to bind with {client.name}.</DialogContentText>
//       </DialogTitle>
//       <DialogContent>
//         <KundliDataGrid
//           columns={columns}
//           pageSize={5}
//           checkboxSelection={true}
//           onRowClick={handleRowClick}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleAddClose}>Cancel</Button>
//         <Button variant='outlined' disabled={isDisable} onClick={handleSelectedSubmit}>
//           {isDisable ? (
//             <>
//               <CircularProgress size={14} aria-label='Wait' />
//               <span style={{ marginLeft: 8 }}>Selecting ...</span>
//             </>
//           ) : (
//             'Select'
//           )}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default KundliPopUp
import React, { useState, useMemo } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material'
import KundliDataGrid from '@/views/apps/kundli/KundliGrid/kundliGrid'

function KundliPopUp({ open, handleAddClose, onSelectKundli, client, handleSubmit }) {
  const [isDisable, setIsDisable] = useState(false)
  const [selectedData, setSelectedData] = useState([])

  // Memoize the columns to avoid re-renders
  const columns = useMemo(
    () => [
      { field: 'FirstName', flex: 1, headerName: 'First Name', headerClassName: 'rowheader', headerAlign: 'left' },
      { field: 'MiddleName', flex: 1, headerName: 'Middle Name', headerClassName: 'rowheader', headerAlign: 'left' },
      { field: 'LastName', flex: 1, headerName: 'Last Name', headerClassName: 'rowheader', headerAlign: 'left' },
      { field: 'Gender', flex: 1, headerName: 'Gender', headerClassName: 'rowheader', headerAlign: 'left' },
      { field: 'BirthDate', flex: 1, headerName: 'BirthDate', headerClassName: 'rowheader', headerAlign: 'left' },
      { field: 'BirthTime', flex: 1, headerName: 'BirthTime', headerClassName: 'rowheader', headerAlign: 'left' }
    ],
    []
  )

  // Handle row click to select kundli
  const handleRowClick = e => {
    setSelectedData(e.row)
  }

  const handleSelection = (rows) => {
    setSelectedData(rows);
  };
  // Submit selected kundli data
  const handleSelectedSubmit = () => {
    setIsDisable(true)
    handleSubmit(selectedData, client, setSelectedData).finally(() => setIsDisable(false))
  }

  return (
    <Dialog
      open={open}
      onClose={handleAddClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: event => event.preventDefault()
      }}
    >
      <DialogTitle
        className='PopupHeader bg-primary text-white p-4'
        style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
      >
        <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Select Kundli</span>
          <IconButton
            aria-label='close'
            onClick={handleAddClose}
            sx={{ color: 'white' }}
          >
            <i className='tabler-x'></i>
          </IconButton>
        </div>
        <DialogContentText className='text-white'>
          Select the kundli to bind with {client.name}.
        </DialogContentText>
      </DialogTitle>

      <DialogContent>

        <KundliDataGrid
          columns={columns}
          pageSize={5}
          checkboxSelection={true}
          onRowClick={handleRowClick}
          // onSelectionModelChange={handleSelection}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAddClose}>Cancel</Button>
        <Button variant='outlined' disabled={isDisable} onClick={handleSelectedSubmit}>
          {isDisable ? (
            <>
              <CircularProgress size={14} aria-label='Wait' />
              <span style={{ marginLeft: 8 }}>Selecting ...</span>
            </>
          ) : (
            'Select'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default KundliPopUp
