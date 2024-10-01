import React, { useState } from 'react';
import KanbanBoard from './kanban/KanbanBoard';


function ClientTasks({cid}) {

  return (
   <><KanbanBoard cid={cid} /></>
  );
}

export default ClientTasks