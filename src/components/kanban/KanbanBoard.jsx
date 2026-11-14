import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import TodoColumn from './TodoColumn.jsx';
import InProgressColumn from './InProgressColumn.jsx';
import DoneColumn from './DoneColumn.jsx';
import KanbanCard from './KanbanCard.jsx';
import {
  updateTicket,
  optimisticUpdateTicketStatus,
  rollbackTicketStatus,
} from '../../redux/slices/ticketSlice.js';

export default function KanbanBoard({ tickets = [], onAddTicket, canManage = true }) {
  const dispatch = useDispatch();
  const [activeTicket, setActiveTicket] = useState(null);

  // Configure pointer and keyboard sensors for smooth dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter tickets into column status groups
  const todoTickets = tickets.filter((t) => t.status === 'todo');
  const inProgressTickets = tickets.filter((t) => t.status === 'in_progress');
  const doneTickets = tickets.filter((t) => t.status === 'done');

  // Handle drag initiation
  const handleDragStart = (event) => {
    const { active } = event;
    const ticket = tickets.find((t) => t._id === active.id);
    if (ticket) {
      setActiveTicket(ticket);
    }
  };

  // Handle drag completion and optimistic status update
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTicket(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Resolve target status whether dropped on column or another card
    let targetStatus = null;
    if (['todo', 'in_progress', 'done'].includes(overId)) {
      targetStatus = overId;
    } else {
      const overTicket = tickets.find((t) => t._id === overId);
      if (overTicket) {
        targetStatus = overTicket.status;
      }
    }

    const currentTicket = tickets.find((t) => t._id === activeId);
    if (!currentTicket || !targetStatus || currentTicket.status === targetStatus) {
      return;
    }

    const previousStatus = currentTicket.status;

    // Apply optimistic update immediately in Redux
    dispatch(optimisticUpdateTicketStatus({ ticketId: activeId, status: targetStatus }));

    // Persist status change to MongoDB via PATCH /tickets/:ticketId
    const result = await dispatch(
      updateTicket({
        ticketId: activeId,
        data: { status: targetStatus },
      })
    );

    // Rollback if server request fails
    if (updateTicket.rejected.match(result)) {
      dispatch(rollbackTicketStatus({ ticketId: activeId, previousStatus }));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Three-column Kanban grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        <TodoColumn
          tickets={todoTickets}
          onAddTicket={onAddTicket}
          canManage={canManage}
        />
        <InProgressColumn
          tickets={inProgressTickets}
          onAddTicket={onAddTicket}
          canManage={canManage}
        />
        <DoneColumn
          tickets={doneTickets}
          onAddTicket={onAddTicket}
          canManage={canManage}
        />
      </div>

      {/* Floating drag overlay with elevated shadow and tactile tilt */}
      <DragOverlay dropAnimation={null}>
        {activeTicket ? (
          <div className="rotate-2 scale-[1.02] shadow-[0_20px_35px_rgba(124,45,18,0.18)] rounded-xl pointer-events-none">
            <KanbanCard ticket={activeTicket} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
