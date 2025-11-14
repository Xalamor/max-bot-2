'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSchedule } from '@/lib/store/slices/scheduleSlice'
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

  if (loading) {
    return (
      <Flex justify="center" style={{ padding: '20px' }}>
        <Spinner size={32} />
      </Flex>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      <Flex direction="column" gap="large">
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