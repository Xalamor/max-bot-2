'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSchedule } from '@/lib/store/slices/scheduleSlice'
import { logout } from '@/lib/store/slices/authSlice'
import { RootState, AppDispatch } from '@/lib/store/store'
import { Button, Flex, Panel, Spinner } from '@maxhub/max-ui'

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

export default function ScheduleView() {
  const dispatch = useDispatch<AppDispatch>()
  const { schedule, loading, weekType } = useSelector((state: RootState) => state.schedule)
  const { user } = useSelector((state: RootState) => state.auth)
  const [currentWeekType, setCurrentWeekType] = useState<'current' | 'even' | 'odd'>('current')

  useEffect(() => {
    if (user?.role === 'student') {
      dispatch(getSchedule(currentWeekType))
    }
  }, [dispatch, user, currentWeekType])

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  }

  if (loading) {
    return (
      <Flex justify="center" style={{ padding: '20px' }}>
        <Spinner size={32} />
      </Flex>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      {/* Кнопка выхода в правом верхнем углу */}
      <Flex justify="end" style={{ marginBottom: '16px' }}>
        <Button
          type="button"
          onClick={handleLogout}
          style={{
            background: '#ff4d4f',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Выйти
        </Button>
      </Flex>

      {/* Отладочная информация */}
      <div style={{ 
        background: '#fff3cd', 
        padding: '10px', 
        marginBottom: '16px',
        border: '1px solid #ffeaa7',
        borderRadius: '4px'
      }}>
        <strong>Отладка:</strong> user = {user ? JSON.stringify(user) : 'null'}
      </div>

      <Flex direction="column" gap="large">
        {/* Информация о пользователе */}
        {user && (
          <Panel style={{ padding: '16px', background: '#f8f9fa' }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Профиль</h4>
            <p style={{ margin: '4px 0', fontSize: '14px' }}>
              <strong>Имя:</strong> {user.fullName}
            </p>
            <p style={{ margin: '4px 0', fontSize: '14px' }}>
              <strong>Роль:</strong> {user.role}
            </p>
          </Panel>
        )}

        {/* Переключатель недель */}
        <Flex gap="small" justify="center">
          <Button
            type="button"
            style={{ 
              background: currentWeekType === 'current' ? '#1890ff' : '#f5f5f5',
              color: currentWeekType === 'current' ? 'white' : 'black'
            }}
            onClick={() => setCurrentWeekType('current')}
          >
            Текущая
          </Button>
          <Button
            type="button"
            style={{ 
              background: currentWeekType === 'even' ? '#1890ff' : '#f5f5f5',
              color: currentWeekType === 'even' ? 'white' : 'black'
            }}
            onClick={() => setCurrentWeekType('even')}
          >
            Четная
          </Button>
          <Button
            type="button"
            style={{ 
              background: currentWeekType === 'odd' ? '#1890ff' : '#f5f5f5',
              color: currentWeekType === 'odd' ? 'white' : 'black'
            }}
            onClick={() => setCurrentWeekType('odd')}
          >
            Нечетная
          </Button>
        </Flex>

        {/* Расписание */}
        {schedule?.days && (
          <Flex direction="column" gap="medium">
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              margin: 0
            }}>
              Расписание {schedule.groupId} ({weekType === 'even' ? 'Четная' : 'Нечетная'} неделя)
            </h3>
            
            {daysOfWeek.map((dayName, index) => {
              const dayNumber = (index + 1).toString()
              const daySchedule = schedule.days[dayNumber]
              
              return (
                <Panel key={dayNumber} style={{ padding: '16px' }}>
                  <div style={{ 
                    marginBottom: '12px', 
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>
                    {dayName}
                  </div>
                  
                  {daySchedule?.subjects?.length > 0 ? (
                    <Flex direction="column" gap="small">
                      {daySchedule.subjects.map((subject, idx) => (
                        <div key={idx} style={{ 
                          padding: '12px', 
                          background: '#f8f9fa',
                          borderRadius: '8px'
                        }}>
                          <div style={{ 
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}>
                            {subject.name}
                          </div>
                          <div style={{ 
                            display: 'block', 
                            color: '#666',
                            fontSize: '12px',
                            marginTop: '4px'
                          }}>
                            ⏰ {subject.time} | 🏫 {subject.classroom} | 👨‍🏫 {subject.teacher}
                          </div>
                        </div>
                      ))}
                    </Flex>
                  ) : (
                    <div style={{ 
                      color: '#999',
                      fontStyle: 'italic'
                    }}>
                      Занятий нет
                    </div>
                  )}
                </Panel>
              )
            })}
          </Flex>
        )}
      </Flex>
    </div>
  )
}