import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

const initialState = {
  commentsByTicket: {},
  loading: false,
  submitting: false,
  error: null,
};

// Fetch all comments for a ticket
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tickets/${ticketId}/comments`);
      return { ticketId, comments: response.data.comments || [] };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

// Add a comment to a ticket
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ ticketId, text }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/tickets/${ticketId}/comments`, { text });
      return { ticketId, comment: response.data.comment };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to post comment');
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ ticketId, commentId }, { rejectWithValue }) => {
    try {
      await api.delete(`/tickets/${ticketId}/comments/${commentId}`);
      return { ticketId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

// Comment slice management
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearCommentError: (state) => {
      state.error = null;
    },
    clearTicketComments: (state, action) => {
      const ticketId = action.payload;
      if (ticketId) {
        delete state.commentsByTicket[ticketId];
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch comments
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      const { ticketId, comments } = action.payload;
      state.commentsByTicket[ticketId] = comments;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add comment
    builder.addCase(addComment.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.submitting = false;
      const { ticketId, comment } = action.payload;
      if (!state.commentsByTicket[ticketId]) {
        state.commentsByTicket[ticketId] = [];
      }
      state.commentsByTicket[ticketId].push(comment);
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    });

    // Delete comment
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { ticketId, commentId } = action.payload;
      if (state.commentsByTicket[ticketId]) {
        state.commentsByTicket[ticketId] = state.commentsByTicket[ticketId].filter(
          (c) => c._id !== commentId
        );
      }
    });
  },
});

export const { clearCommentError, clearTicketComments } = commentSlice.actions;

export default commentSlice.reducer;
