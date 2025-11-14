import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AdminState, CreateGroupData, CreateInviteCodeData } from '@/types'

const initialState: AdminState = {
  groups: [],
  inviteCodes: [],
  loading: false,
  error: null
}

// Заглушки для async thunks - можно реализовать позже
export const createGroup = createAsyncThunk(
  'admin/createGroup',
  async (groupData: CreateGroupData, { rejectWithValue }) => {
    try {
      // TODO: Реализовать API вызов
      return groupData
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка создания группы')
    }
  }
)

export const createInviteCode = createAsyncThunk(
  'admin/createInviteCode',
  async (codeData: CreateInviteCodeData, { rejectWithValue }) => {
    try {
      // TODO: Реализовать API вызов
      return codeData
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка создания кода')
    }
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null
    },
    setGroups: (state, action: PayloadAction<any[]>) => {
      state.groups = action.payload
    },
    setInviteCodes: (state, action: PayloadAction<any[]>) => {
      state.inviteCodes = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false
        // TODO: Добавить группу в state
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createInviteCode.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createInviteCode.fulfilled, (state, action) => {
        state.loading = false
        // TODO: Добавить код в state
      })
      .addCase(createInviteCode.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { clearAdminError, setGroups, setInviteCodes } = adminSlice.actions
export default adminSlice.reducer