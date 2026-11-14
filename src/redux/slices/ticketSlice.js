import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
};

// Fetch tickets for a specific project
export const fetchTicketsByProject = createAsyncThunk(
  'tickets/fetchTicketsByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/${projectId}/tickets`);
      return response.data.tickets;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets');
    }
  }
);

// Create a new ticket
export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await api.post('/tickets', ticketData);
      return response.data.ticket;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create ticket');
    }
  }
);

// Update ticket status, priority, or content
export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async ({ ticketId, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/tickets/${ticketId}`, data);
      return response.data.ticket;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update ticket');
    }
  }
);

// Delete ticket
export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (ticketId, { rejectWithValue }) => {
    try {
      await api.delete(`/tickets/${ticketId}`);
      return ticketId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete ticket');
    }
  }
);

// Ticket slice definition
const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    clearTickets: (state) => {
      state.tickets = [];
      state.error = null;
    },
    clearTicketError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch tickets
    builder.addCase(fetchTicketsByProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTicketsByProject.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    });
    builder.addCase(fetchTicketsByProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create ticket
    builder.addCase(createTicket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets.unshift(action.payload);
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update ticket
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      const index = state.tickets.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    });

    // Delete ticket
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.tickets = state.tickets.filter((t) => t._id !== action.payload);
    });
  },
});

export const { clearTickets, clearTicketError } = ticketSlice.actions;

export default ticketSlice.reducer;
