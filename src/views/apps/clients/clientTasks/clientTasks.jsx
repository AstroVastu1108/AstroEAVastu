import React, { useState } from 'react';
import KanbanBoard from './kanban/KanbanBoard';
import Listing from './listing/tasksListing';


function ClientTasks({cid}) {

  return (
  //  <><KanbanBoard cid={cid} /></>
   <><Listing cid={cid} from="ClientTasks" /></>
  );
}

export default ClientTasks