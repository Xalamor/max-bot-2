import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '@/lib/api/auth'
import { AuthState, User, AuthResponse, MeResponse, RegisterFormData } from '@/types'

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
}

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterFormData,
  { rejectValue: string }
>(
  'auth/register',
  async ({ inviteCode, fullName }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(inviteCode, fullName)
      localStorage.setItem('token', response.token)
      
      // Сохраняем мокового пользователя для getMe (только в development)
      if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('mockUser', JSON.stringify(response.user))
      }
      
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка регистрации')
    }
  }
)

export const getMe = createAsyncThunk<
  MeResponse,
  void,
  { rejectValue: string }
>(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Нет токена')
      return await authAPI.getMe()
    } catch (error: any) {
      localStorage.removeItem('token')
      return rejectWithValue(error.response?.data?.error || 'Ошибка авторизации')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      if (process.env.NODE_ENV === 'development') {
        localStorage.removeItem('mockUser')
      }
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Неизвестная ошибка'
      })
      // GetMe
      .addCase(getMe.pending, (state) => {
        state.loading = true
      })
      .addCase(getMe.fulfilled, (state, action: PayloadAction<MeResponse>) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Неизвестная ошибка'
        state.user = null
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer