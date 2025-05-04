import { useState } from 'react'
import { Tabs, Tab, IconButton } from '@mui/material'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './DragableTabs.css'

const DraggableTab1 = ({ group, index, handleRemoveOpen, handleTabChange, activeTab }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index })

  const style = {
    transform: transform ? `translateX(${transform.x}px)` : undefined,
    transition
  }

  return (
    <div ref={setNodeRef} style={style} className={`flex items-center ${activeTab === index ? 'selected-tab' : ''}`}>
      <div {...attributes} {...listeners} className='drag-handle cursor-grab px-1'>
        <i className='tabler-grip-vertical text-xs'></i>
      </div>
      <div className='flex cursor-pointer'>
        <div
          onClick={e => {
            handleTabChange(e, index)
          }}
          className='text-primary font-ea-n'
        >
          {group?.title}
        </div>
        <IconButton
          size='small'
          onClick={e => {
            e.stopPropagation() // Prevent tab change on button click
            handleRemoveOpen(group)
          }}
          className='mx-1'
        >
          <i className='tabler-x text-xs'></i>
        </IconButton>
      </div>
      {/* <Tab
        key={index}
        onClick={() => {
          handleTabChange(null, index)
        }}
        className={`px-2 cursor-pointer`}
        sx={{
          filter:"none"
        }}
        label={
          <div className='flex items-center gap-2 justify-between'>
            <span className='text-primary' style={{filter:"none"}}>{group}</span>
            <IconButton
              size='small'
              onClick={e => {
                e.stopPropagation() // Prevent tab change on button click
                handleRemoveOpen(group)
              }}
            >
              <i className='tabler-x text-xs'></i>
            </IconButton>
          </div>
        }
      /> */}
    </div>
  )
}

export default function MovableTabs({
  savedGroups,
  setSavedGroups,
  handleRemoveOpen,
  activeTab,
  handleTabChange,
  groups,
  setActiveTab
}) {
  const handleDragEnd = event => {
    const { active, over } = event
    if (active.id !== over.id) {
      if(activeTab == active.id){
        setActiveTab(over.id)
      }else{
        setActiveTab(active.id)
      }
      setSavedGroups(arrayMove(savedGroups, active.id, over.id))
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={savedGroups.map((_, index) => index)} strategy={verticalListSortingStrategy}>
          <Tabs
            className=' flex-1 overflow-auto grid-tabs !h-[1rem]'
            variant='scrollable'
            scrollButtons='false'
            value={activeTab}
            onChange={handleTabChange}
            aria-label='saved groups tabs'
          >
            {savedGroups.map((group, index) => (
              <DraggableTab1
                key={index}
                index={index}
                group={groups.filter(item => item.label === group)[0]}
                handleRemoveOpen={handleRemoveOpen}
                handleTabChange={handleTabChange} // Pass handleTabChange to DraggableTab
                activeTab={activeTab}
              />
            ))}
          </Tabs>
      </SortableContext>
    </DndContext>
  )
}
