import apiClient from './client'
import { ScheduleResponse } from '@/types'
import { mockScheduleResponse } from './mockData'

export const scheduleAPI = {
  getSchedule: async (weekType: string = 'current'): Promise<ScheduleResponse> => {
    // В разработке используем мок
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 800)) // Имитация задержки
      
      // Возвращаем моковое расписание с учетом типа недели
      return {
        ...mockScheduleResponse,
        weekType: weekType === 'odd' ? 'odd' : 'even'
      }
    }
    
    // В проде используем реальный API
    return apiClient.get(`/api/schedule?week_type=${weekType}`)
  },
}