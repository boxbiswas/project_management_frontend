import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Fetch all projects current user belongs to
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects');
      return response.data.projects;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

// Fetch single project by ID
export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

// Update project metadata
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/projects/${projectId}`, data);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
  }
);

// Delete project
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${projectId}`);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
  }
);

// Add team member to project
export const addProjectMember = createAsyncThunk(
  'projects/addProjectMember',
  async ({ projectId, memberData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/projects/${projectId}/members`, memberData);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add member');
    }
  }
);

// Remove team member from project
export const removeProjectMember = createAsyncThunk(
  'projects/removeProjectMember',
  async ({ projectId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/projects/${projectId}/members/${userId}`);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove member');
    }
  }
);

// Project slice and reducers
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch single project
    builder.addCase(fetchProjectById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProject = action.payload;
    });
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create project
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.unshift(action.payload);
      state.currentProject = action.payload;
    });

    // Update project
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const index = state.projects.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
      if (state.currentProject && state.currentProject._id === action.payload._id) {
        state.currentProject = action.payload;
      }
    });

    // Delete project
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter((p) => p._id !== action.payload);
      if (state.currentProject && state.currentProject._id === action.payload) {
        state.currentProject = null;
      }
    });

    // Member updates
    builder.addCase(addProjectMember.fulfilled, (state, action) => {
      state.currentProject = action.payload;
      const index = state.projects.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    });
    builder.addCase(removeProjectMember.fulfilled, (state, action) => {
      state.currentProject = action.payload;
      const index = state.projects.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    });
  },
});

export const { clearCurrentProject, clearProjectError } = projectSlice.actions;

export default projectSlice.reducer;
