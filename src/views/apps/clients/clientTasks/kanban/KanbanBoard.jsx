'use client'
import { useEffect, useState } from 'react'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import { useDispatch, useSelector } from 'react-redux'

// Slice Imports
import { addColumn, updateColumns, addTasks } from '@/redux-store/slices/kanban'

// Component Imports
import KanbanList from './KanbanList'
import NewColumn from './NewColumn'
import KanbanDrawer from './KanbanDrawer'
import { GetColumns, GetTasks } from '@/app/Server/API/tasks'
// import { toastDisplayer } from '@/@core/components/toast-displayer/toastdisplayer'
import { useAuth } from '@/@core/contexts/authContext'

const KanbanBoard = ({cid}) => {
  const { user } = useAuth();
  // State
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hooks
  const kanbanStore = useSelector(state => state.kanbanReducer)
  const dispatch = useDispatch()

  const [boardRef, columns, setColumns] = useDragAndDrop(kanbanStore.columns, {
    plugins: [animations()],
    dragHandle: '.list-handle'
  })

  // Add New Column
  const addNewColumn = title => {
    const maxId = Math.max(...kanbanStore.columns.map(column => column.id))

    dispatch(addColumn(title))
    setColumns([...columns, { id: maxId + 1, title, taskIds: [] }])
  }

  // To get the current task for the drawer
  const currentTask = kanbanStore.tasks.find(task => task.id === kanbanStore.currentTaskId)

  // Update Columns on Drag and Drop
  useEffect(() => {
    if (columns !== kanbanStore.columns) dispatch(updateColumns(columns))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])


  const fetchColumnsData = async (transactionID,cid) =>{
    try {
      // Call the API to get columns
      const response = await GetColumns(transactionID,cid)
      const updatedData = await response.responseData.map(item => ({
        ...item,
        // taskIds: [],
        id: item.transId
    }));
      return updatedData
    } catch (error) {
      // return toastDisplayer("error",error)
    }
  }

  const fetchKundliTasksData = async (transactionID,cid) =>{
    try {
      // Call the API to get columns
      const response = await GetTasks(transactionID,cid)
    //   const updatedData = await response.responseData.map(item => ({
    //     ...item,
    //     // taskIds: [],
    //     id: item.transId
    // }));
      return await response.responseData
    } catch (error) {
      // return toastDisplayer("error",error)
    }
  }

  useEffect(()=>{
    if (user?.transactionID) {
      const fetchDatacolumn = async () =>{
        const columnsData = await fetchKundliTasksData(user?.transactionID,cid);
        if(await columnsData){
          // console.log("TaskList =======> ",tasksList)
          // console.log("columns =======> ",columns)
          // console.log("columnsData =======> ",columnsData)
          // let taskIds = []

          // columns.map(col => {
          //   taskIds = [...taskIds, ...col.taskIds]
          // })
          // console.log("taskIds =======> ",taskIds)
          // const newTasksList = columnsData.filter(task => task && taskIds.includes(task.id))
          // console.log("TaskList Last =======> ",newTasksList)
          // setTasksList(newTasksList)
          // setTasksList(columnsData)
          dispatch(addTasks(columnsData));
        }
      }
      fetchDatacolumn()
    }
  },[user,cid])

  useEffect(()=>{
    if (user?.transactionID) {
      const fetchDatacolumn = async () =>{
        const columnsData = await fetchColumnsData(user?.transactionID,cid);
        if(await columnsData){
          setColumns(columnsData)
        }
      }
      fetchDatacolumn()
    }
  },[user])

  return (
    <div className='flex items-start gap-6'>
      <div ref={boardRef} className='flex gap-6'>
        {columns.map(column => (
          <KanbanList
            key={column.id}
            dispatch={dispatch}
            column={column}
            store={kanbanStore}
            setDrawerOpen={setDrawerOpen}
            columns={columns}
            setColumns={setColumns}
            currentTask={currentTask}
            tasks={column.taskIds.map(taskId => kanbanStore.tasks.find(task => task.id === taskId))}
            cid={cid}
          />
        ))}
      </div>
      <NewColumn addNewColumn={addNewColumn} />
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
    </div>
  )
}

export default KanbanBoard
