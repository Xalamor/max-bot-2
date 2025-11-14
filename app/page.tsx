'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '@/lib/store/slices/authSlice'
import { RootState, AppDispatch } from '@/lib/store/store'
import RegisterForm from '@/components/forms/RegisterForm'
import ScheduleView from '@/components/schedule/ScheduleView'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Загрузка...</div>
      </div>
    )
  }

  return (
    <main>
      {!user ? <RegisterForm /> : <ScheduleView />}
    </main>
  )
}