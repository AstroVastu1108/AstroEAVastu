import {
  Button,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  ThemeProvider,
  Radio,
  RadioGroup,
  FormLabel
} from '@mui/material'
import React, { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function SortableItem({ id, checked, handleCheckboxChange, showPdfTypeOptions }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        transform: CSS.Transform.toString(transform),
        transition
      }}
    >
      {showPdfTypeOptions &&
        <IconButton {...attributes} {...listeners} size='medium' className='drag-handle cursor-grab px-1'>
          <i className='tabler-grip-vertical text-xs'></i>
        </IconButton>
      }
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} name={id} />}
        label={id}
        style={{ flex: 1 }}
      />
    </div>
  )
}

function DownloadPopUp({
  open,
  handleClose,
  TabData,
  handleSave,
  showPdfTypeOptions = false, // Optional prop
  defaultCheckedItems = [] // New prop for default checked items
}) {
  const theme = createTheme({
    shape: { borderRadius: 8 }
  })

  const [items, setItems] = useState(TabData)
  const [checkedItems, setCheckedItems] = useState(
    TabData.reduce((acc, item) => ({ 
      ...acc, 
      [item]: defaultCheckedItems.includes(item) 
    }), {})
  )
  const [checkAll, setCheckAll] = useState(
    defaultCheckedItems.length > 0 && defaultCheckedItems.length === TabData.length
  )
  const [pdfType, setPdfType] = useState('client') // Default PDF type

  const handleCheckAll = event => {
    const isChecked = event.target.checked
    setCheckAll(isChecked)
    setCheckedItems(items.reduce((acc, item) => ({ ...acc, [item]: isChecked }), {}))
  }

  const handleCheckboxChange = event => {
    const { name, checked } = event.target
    setCheckedItems(prev => {
      const updatedItems = { ...prev, [name]: checked }
      setCheckAll(Object.values(updatedItems).every(val => val))
      return updatedItems
    })
  }

  const handleDragEnd = event => {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems(prev => {
        const oldIndex = prev.indexOf(active.id)
        const newIndex = prev.indexOf(over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: e => {
            e.preventDefault()
            const filteredItems = items.filter(key => checkedItems[key] === true)

            handleSave(filteredItems, pdfType) // Pass pdfType to handleSave
            handleClose()
          }
        }}
      >
        <DialogTitle className='text-primary text-2xl p-3 bg-[var(--secondary-color)] rounded-t-lg flex justify-between items-center'>
          <span className='text-primary text-2xl font-ea-sb !pl-3'>Download PDF</span>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <i className='tabler-x text-primary'></i>
          </IconButton>
        </DialogTitle>

        <DialogContent className='px-4 pt-3'>
          {showPdfTypeOptions && (
            <div className='mb-4'>
              <FormLabel component="legend">PDF Type</FormLabel>
              <RadioGroup
                row
                value={pdfType}
                onChange={e => setPdfType(e.target.value)}
                name="pdfType"
              >
                <FormControlLabel value="client" control={<Radio />} label="Client Deliverables" />
                <FormControlLabel value="operational" control={<Radio />} label="Operational" />
              </RadioGroup>
            </div>
          )}
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checkAll} onChange={handleCheckAll} />} label='Select All' />
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map(item => (
                  <SortableItem
                    key={item}
                    id={item}
                    checked={checkedItems[item]}
                    handleCheckboxChange={handleCheckboxChange}
                    showPdfTypeOptions={showPdfTypeOptions}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </FormGroup>
        </DialogContent>

        <DialogActions className='p-4 pt-0'>
          <Button variant='contained' className={'bg-primary'} type='submit'>
            Yes
          </Button>
          <Button variant='contained' className='bg-secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default DownloadPopUp
