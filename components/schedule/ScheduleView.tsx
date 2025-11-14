'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSchedule } from '@/lib/store/slices/scheduleSlice'
import { RootState, AppDispatch } from '@/lib/store/store'

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

export default function ScheduleView() {
  const dispatch = useDispatch<AppDispatch>()
  const { schedule, loading, weekType, error } = useSelector((state: RootState) => state.schedule)
  const { user } = useSelector((state: RootState) => state.auth)
  const [currentWeekType, setCurrentWeekType] = useState<'current' | 'even' | 'odd'>('current')

  useEffect(() => {
    if (user?.role === 'student') {
      dispatch(getSchedule(currentWeekType))
    }
  }, [dispatch, user, currentWeekType])

  const getWeekTypeText = (type: string | null) => {
    switch (type) {
      case 'even': return 'Четная'
      case 'odd': return 'Нечетная'
      default: return 'Текущая'
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px',
        height: '200px',
        color: 'white',
        fontSize: '20px'
      }}>
        <div>Загрузка расписания...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        padding: '16px', 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{ 
          background: '#fff2f0', 
          padding: '16px', 
          borderRadius: '8px',
          border: '1px solid #ffccc7'
        }}>
          <h3 style={{ color: '#ff4d4f', marginTop: 0 }}>Ошибка загрузки расписания</h3>
          <p style={{ color: '#666' }}>{error}</p>
          <button
            onClick={() => dispatch(getSchedule(currentWeekType))}
            style={{
              padding: '8px 16px',
              background: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Заголовок и информация о пользователе */}
        <div style={{ 
          padding: '16px', 
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h2 style={{ marginBottom: '8px', marginTop: 0 }}>
            📚 Расписание
          </h2>
          <p style={{ color: '#666', margin: 0 }}>
            Добро пожаловать, {user?.fullName} ({user?.role})
          </p>
          {user?.groupId && (
            <p style={{ color: '#666', margin: '4px 0 0 0' }}>
              Группа: {user.groupId}
            </p>
          )}
        </div>

        {/* Переключатель недель */}
        <div style={{ 
          padding: '16px', 
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => setCurrentWeekType('current')}
              style={{
                padding: '8px 16px',
                background: currentWeekType === 'current' ? '#1890ff' : 'transparent',
                color: currentWeekType === 'current' ? 'white' : '#1890ff',
                border: '1px solid #1890ff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Текущая
            </button>
            <button
              onClick={() => setCurrentWeekType('even')}
              style={{
                padding: '8px 16px',
                background: currentWeekType === 'even' ? '#1890ff' : 'transparent',
                color: currentWeekType === 'even' ? 'white' : '#1890ff',
                border: '1px solid #1890ff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Четная
            </button>
            <button
              onClick={() => setCurrentWeekType('odd')}
              style={{
                padding: '8px 16px',
                background: currentWeekType === 'odd' ? '#1890ff' : 'transparent',
                color: currentWeekType === 'odd' ? 'white' : '#1890ff',
                border: '1px solid #1890ff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Нечетная
            </button>
          </div>
        </div>

        {/* Расписание */}
        {schedule?.days ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ 
              padding: '16px', 
              background: '#e6f7ff',
              borderRadius: '8px'
            }}>
              <h3 style={{ margin: 0 }}>
                {schedule.groupId} - {getWeekTypeText(weekType)} неделя
              </h3>
            </div>
            
            {daysOfWeek.map((dayName, index) => {
              const dayNumber = (index + 1).toString()
              const daySchedule = schedule.days[dayNumber]
              
              return (
                <div key={dayNumber} style={{ 
                  padding: '16px', 
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <strong style={{ 
                    marginBottom: '12px', 
                    display: 'block', 
                    fontSize: '16px' 
                  }}>
                    {dayName}
                  </strong>
                  
                  {daySchedule?.subjects && daySchedule.subjects.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {daySchedule.subjects.map((subject, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            padding: '12px', 
                            background: '#f8f9fa',
                            borderLeft: '4px solid #1890ff',
                            borderRadius: '4px'
                          }}
                        >
                          <strong style={{ display: 'block', marginBottom: '4px' }}>
                            {subject.name}
                          </strong>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: '2px' }}>
                            ⏰ {subject.time}
                          </div>
                          {subject.classroom && (
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '2px' }}>
                              🏫 {subject.classroom}
                            </div>
                          )}
                          {subject.teacher && (
                            <div style={{ fontSize: '14px', color: '#666' }}>
                              👨‍🏫 {subject.teacher}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: '#666', fontStyle: 'italic' }}>
                      Занятий нет
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ 
            padding: '24px', 
            textAlign: 'center',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ color: '#666' }}>
              Расписание не найдено
            </div>
          </div>
        )}
      </div>
    </div>
  )
}