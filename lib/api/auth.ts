import apiClient from './client'
import { AuthResponse, MeResponse } from '@/types'
import { mockAuthResponse, mockAdminAuthResponse, VALID_INVITE_CODES } from './mockData'

export const authAPI = {
  register: async (inviteCode: string, fullName: string): Promise<AuthResponse> => {
    // В разработке используем мок с проверкой кодов
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация задержки
      
      const codeData = VALID_INVITE_CODES[inviteCode as keyof typeof VALID_INVITE_CODES]
      
      if (!codeData) {
        throw new Error('Invalid invite code')
      }

      // Возвращаем соответствующий ответ в зависимости от роли
      if (codeData.role === 'student') {
        const response = {
          ...mockAuthResponse,
          user: {
            ...mockAuthResponse.user,
            fullName,
            groupId: codeData.groupId
          }
        }
        
        // Сохраняем пользователя для getMe
        localStorage.setItem('mockUser', JSON.stringify(response.user))
        return response
      } else {
        const response = {
          ...mockAdminAuthResponse,
          user: {
            ...mockAdminAuthResponse.user,
            fullName
          }
        }
        
        localStorage.setItem('mockUser', JSON.stringify(response.user))
        return response
      }
    }
    
    // В проде используем реальный API
    return apiClient.post('/api/auth/register', { inviteCode, fullName })
  },
    
  getMe: async (): Promise<MeResponse> => {
    if (process.env.NODE_ENV === 'development') {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token')
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // В моке возвращаем сохраненного пользователя
      const userData = localStorage.getItem('mockUser')
      if (userData) {
        return { user: JSON.parse(userData) }
      }
      throw new Error('User not found')
    }
    return apiClient.get('/api/auth/me')
  },
}