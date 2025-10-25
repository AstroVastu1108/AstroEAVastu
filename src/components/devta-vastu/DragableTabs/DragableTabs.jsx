// import { useState } from 'react'
// import { Tabs, Tab, IconButton } from '@mui/material'
// import { DndContext, closestCenter } from '@dnd-kit/core'
// import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import './DragableTabs.css'

// const DraggableTab1 = ({ group, index, handleRemoveOpen, handleTabChange, activeTab }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index })
//   const style = {
//     transform: transform ? `translateX(${transform.x}px)` : undefined,
//     transition
//   }

//   return (
//     <div ref={setNodeRef} style={style} className={`flex items-center ${activeTab === index ? 'selected-tab' : ''}`}>
//       <div {...attributes} {...listeners} className='drag-handle cursor-grab px-1'>
//         <i className='tabler-grip-vertical text-xs'></i>
//       </div>
//       <div className='flex cursor-pointer'>
//         <div
//           onClick={e => {
//             handleTabChange(e, index)
//           }}
//           className='text-primary font-ea-n'
//         >
//           {group?.title}
//         </div>
//         <IconButton
//           size='small'
//           onClick={e => {
//             e.stopPropagation() // Prevent tab change on button click
//             handleRemoveOpen(group)
//           }}
//           className='mx-1'
//         >
//           <i className='tabler-x text-xs'></i>
//         </IconButton>
//       </div>
//       {/* <Tab
//         key={index}
//         onClick={() => {
//           handleTabChange(null, index)
//         }}
//         className={`px-2 cursor-pointer`}
//         sx={{
//           filter:"none"
//         }}
//         label={
//           <div className='flex items-center gap-2 justify-between'>
//             <span className='text-primary' style={{filter:"none"}}>{group}</span>
//             <IconButton
//               size='small'
//               onClick={e => {
//                 e.stopPropagation() // Prevent tab change on button click
//                 handleRemoveOpen(group)
//               }}
//             >
//               <i className='tabler-x text-xs'></i>
//             </IconButton>
//           </div>
//         }
//       /> */}
//     </div>
//   )
// }

// export default function MovableTabs({
//   savedGroups,
//   setSavedGroups,
//   handleRemoveOpen,
//   activeTab,
//   handleTabChange,
//   groups,
//   setActiveTab
// }) {
//   const handleDragEnd = event => {
//     const { active, over } = event
//     if (active.id !== over.id) {
//       if (activeTab == active.id) {
//         setActiveTab(over.id)
//       } else {
//         setActiveTab(active.id)
//       }
//       setSavedGroups(arrayMove(savedGroups, active.id, over.id))
//     }
//   }

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <SortableContext items={savedGroups.map((_, index) => index)} strategy={verticalListSortingStrategy}>
//         <div className='flex overflow-x-auto'>

//           <Tabs
//             className=' flex-1 overflow-auto grid-tabs !h-[1rem]'
//             variant='scrollable'
//             scrollButtons='false'
//             value={activeTab}
//             onChange={handleTabChange}
//             aria-label='saved groups tabs'
//           >
//             {savedGroups.map((group, index) => (
//               <DraggableTab1
//                 key={index}
//                 index={index}
//                 group={groups.filter(item => item.title === group)[0]}
//                 handleRemoveOpen={handleRemoveOpen}
//                 handleTabChange={handleTabChange} // Pass handleTabChange to DraggableTab
//                 activeTab={activeTab}
//               />
//             ))}
//           </Tabs>

//         </div>
//       </SortableContext>
//     </DndContext>
//   )
// }

import { useState, useRef, useEffect } from 'react'
import { Tabs, IconButton } from '@mui/material'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import './DragableTabs.css'

const DraggableTab1 = ({ group, index, handleRemoveOpen, handleTabChange, activeTab }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index })
  const style = {
    transform: transform ? `translateX(${transform.x}px)` : undefined,
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`inline-flex items-center px-2 ${activeTab === index ? 'selected-tab' : ''}`}
    >
      <div {...attributes} {...listeners} className='drag-handle cursor-grab px-1'>
        <i className='tabler-grip-vertical text-xs'></i>
      </div>

      <div
        onClick={e => handleTabChange(e, index)}
        className='flex cursor-pointer items-center text-primary font-ea-n'
      >
        {group?.title}
      </div>

      <IconButton
        size='small'
        onClick={e => {
          e.stopPropagation()
          handleRemoveOpen(group)
        }}
        className='mx-1'
      >
        <i className='tabler-x text-xs'></i>
      </IconButton>
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
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // 🔹 Scroll checker
  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5)
  }

  // 🔹 Smooth scroll function
  const handleScroll = direction => {
    if (!scrollRef.current) return
    const scrollAmount = 150
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  // 🔹 Handle drag end
  const handleDragEnd = event => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      if (activeTab === active.id) {
        setActiveTab(over.id)
      } else {
        setActiveTab(active.id)
      }
      setSavedGroups(arrayMove(savedGroups, active.id, over.id))
    }
  }

  return (
    <div className='relative flex items-center w-full'>
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => handleScroll('left')}
          className='absolute left-0 z-10 bg-white shadow rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100'
        >
          <i className='tabler-chevron-left text-sm'></i>
        </button>
      )}

      {/* Scrollable Tabs */}
      <div ref={scrollRef} className='flex overflow-x-hidden whitespace-nowrap mx-8 w-full'>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={savedGroups.map((_, index) => index)}
            strategy={verticalListSortingStrategy}
          >
            <Tabs
              className='!min-w-max flex-nowrap grid-tabs !h-[1rem]'
              value={activeTab}
              onChange={handleTabChange}
              aria-label='saved groups tabs'
            >
              {savedGroups.map((group, index) => (
                <DraggableTab1
                  key={index}
                  index={index}
                  group={groups.find(item => item.title === group)}
                  handleRemoveOpen={handleRemoveOpen}
                  handleTabChange={handleTabChange}
                  activeTab={activeTab}
                />
              ))}
            </Tabs>
          </SortableContext>
        </DndContext>
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => handleScroll('right')}
          className='absolute right-0 z-10 bg-white shadow rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100'
        >
          <i className='tabler-chevron-right text-sm'></i>
        </button>
      )}
    </div>
  )
}


// import { IconButton } from '@mui/material'
// import { DndContext, closestCenter } from '@dnd-kit/core'
// import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'

// const DraggableTab1 = ({ group, index, handleRemoveOpen, handleTabChange, activeTab }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index })
//   const style = {
//     transform: transform ? `translateX(${transform.x}px)` : undefined,
//     transition
//   }

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className={`flex items-center px-3 py-1 mr-2 whitespace-nowrap cursor-pointer border ${
//         activeTab === index ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-600'
//       } rounded`}
//       onClick={() => handleTabChange(null, index)}
//     >
//       <span>{group?.title}</span>
//       <IconButton
//         size='small'
//         onClick={e => {
//           e.stopPropagation()
//           handleRemoveOpen(group)
//         }}
//         className='ml-2'
//       >
//         <i className='tabler-x text-xs'></i>
//       </IconButton>
//     </div>
//   )
// }

// export default function MovableTabs({
//   savedGroups,
//   setSavedGroups,
//   handleRemoveOpen,
//   activeTab,
//   handleTabChange,
//   groups,
//   setActiveTab
// }) {
//   const handleDragEnd = event => {
//     const { active, over } = event
//     if (active.id !== over.id) {
//       if (activeTab === active.id) {
//         setActiveTab(over.id)
//       } else {
//         setActiveTab(active.id)
//       }
//       setSavedGroups(arrayMove(savedGroups, active.id, over.id))
//     }
//   }

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <SortableContext items={savedGroups.map((_, index) => index)} strategy={horizontalListSortingStrategy}>
//         <div className='flex overflow-x-auto scrollbar-hide py-2 px-1'>
//           {savedGroups.map((group, index) => (
//             <DraggableTab1
//               key={index}
//               index={index}
//               group={groups.find(item => item.title === group)}
//               handleRemoveOpen={handleRemoveOpen}
//               handleTabChange={handleTabChange}
//               activeTab={activeTab}
//             />
//           ))}
//         </div>
//       </SortableContext>
//     </DndContext>
//   )
// }
