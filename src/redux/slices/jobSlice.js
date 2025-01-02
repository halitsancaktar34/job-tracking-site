import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  isLoading: false,
  isError: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // Yüklenme Durumu
    setLoading: (state) => {
      state.isLoading = true;
    },
    // API'den gelen verileri state'e aktarır
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },
    // Hata durumu
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Yeni iş ekler
    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    filterBySearch: (state, action) => {
      console.log(action.payload);
      const query = action.payload.text.toLowerCase();
      const filtred = state.mainJobs.filter((job) =>
        job[action.payload.field].toLowerCase().includes(query)
      );
      state.jobs = filtred;
    },
    // Sıralama
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;
        case "Newest":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "Oldest":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
    },
    // Filtreleri Sıfırlama
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((i) => i.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setJobs,
  setError,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilters,
  deleteJob,
} = jobSlice.actions;

export default jobSlice.reducer;
