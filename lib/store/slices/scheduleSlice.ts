import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { scheduleAPI } from '@/lib/api/schedule'
import { ScheduleState, ScheduleResponse } from '@/types'

const initialState: ScheduleState = {
  schedule: null,
  weekType: null,
  loading: false,
  error: null
}

export const getSchedule = createAsyncThunk<
  ScheduleResponse,
  string,
  { rejectValue: string }
>(
  'schedule/getSchedule',
  async (weekType, { rejectWithValue }) => {
    try {
      return await scheduleAPI.getSchedule(weekType)
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка загрузки расписания')
    }
  }
)

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearScheduleError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSchedule.fulfilled, (state, action: PayloadAction<ScheduleResponse>) => {
        state.loading = false
        state.schedule = action.payload.schedule
        state.weekType = action.payload.weekType
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Неизвестная ошибка'
      })
  }
})

export const { clearScheduleError } = scheduleSlice.actions
export default scheduleSlice.reducer