import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import scheduleSlice from './slices/scheduleSlice'
// import adminSlice from './slices/adminSlice' // временно закомментировать

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      schedule: scheduleSlice,
      // admin: adminSlice, // временно закомментировать
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  })
}

export const store = makeStore()

// Экспортируем типы после создания store
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']