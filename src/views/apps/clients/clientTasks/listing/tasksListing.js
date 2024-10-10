import { useAuth } from '@/@core/contexts/authContext'
import { GetCompanyTasks, GetTasks } from '@/app/Server/API/tasks'
import { animations } from '@formkit/drag-and-drop'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KanbanDrawer from '../kanban/KanbanDrawer'
import { LoadingButton } from '@mui/lab'
import Loader from '@/components/common/Loader/Loader'

function Listing({ cid, from }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Hooks
  const kanbanStore = useSelector(state => state.kanbanReducer)
  const dispatch = useDispatch()

  const [boardRef, columns, setColumns] = useDragAndDrop(kanbanStore.columns, {
    plugins: [animations()],
    dragHandle: '.list-handle'
  })

  const fetchKundliTasksData = async (transactionID, cid, from) => {
    try {
      setLoading(true)
      if (from == 'ClientTasks') {
        const response = await GetTasks(transactionID, cid)
        // return await response.responseData
        setLoading(false)
        return await setTasks(response.responseData)
      }

      const response = await GetCompanyTasks(transactionID)
      setLoading(false)
      // return await response.responseData
      return await setTasks(response.responseData)
    } catch (error) {
      setLoading(false)
      return toastDisplayer('error', error)
    }
  }

  // const fetchDatacolumn = async () => {
  //   const columnsData = await fetchKundliTasksData(user?.transactionID, cid)
  //   if (await columnsData) {
  //     setTasks(columnsData)
  //     console.log('columnsData : ', columnsData)
  //   }
  // }
  useEffect(() => {
    if (user?.transactionID) {
      if (from == 'ClientTasks') {
        fetchKundliTasksData(user?.transactionID, cid, 'ClientTasks')
      } else {
        fetchKundliTasksData(user?.transactionID, cid, 'Tasks')
      }
    }
  }, [user, cid])

  const handleOpenDrawer = item => {
    setCurrentTask(item)
    setDrawerOpen(true)
    // console.log("Item : ",item)
  }

  return (
    <>
      {loading && <Loader />}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <TextField
          // value={newItem}
          // onChange={(e) => setNewItem(e.target.value)}
          placeholder='Add new Tasks'
          fullWidth
          variant='outlined'
          size='small'
          style={{ flexBasis: '78%' }}
        />
        <LoadingButton
          fullWidth
          variant='contained'
          // onClick={handleAddItem}
          loading={loading}
          style={{ flexBasis: '18%' }}
          color='primary'
        >
          {loading ? 'Loading ...' : 'Add Tasks'}
        </LoadingButton>
      </div>
      <List sx={{ bgcolor: 'background.paper', marginTop: 2 }}>
        {tasks.map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton role={undefined} dense>
              {/* <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense> */}
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  // checked={checked.includes(item.id)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.id}` }}
                />
              </ListItemIcon>
              {/* {editItem === item.id ? (
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : ( */}
              <ListItemText primary={item.title} onClick={() => handleOpenDrawer(item)} />

              <IconButton edge='end' aria-label='edit'>
                {/* <IconButton edge="end" aria-label="edit" onClick={() => (editItem === item.id ? handleSaveEdit() : handleEdit(item))}> */}
                {/* {editItem === item.id ? (
                    <Button variant="contained">Save</Button>
                  ) : ( */}
                <i className='tabler-edit' />
                {/* )} */}
              </IconButton>
              {/* <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}> */}
              <IconButton edge='end' aria-label='delete'>
                <i className='tabler-trash' />
              </IconButton>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {currentTask && (
        <KanbanDrawer
          task={currentTask}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          dispatch={dispatch}
          columns={columns}
          setColumns={setColumns}
        />
      )}
    </>
  )
}

export default Listing
