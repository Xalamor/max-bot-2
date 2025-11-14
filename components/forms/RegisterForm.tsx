'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@/lib/store/slices/authSlice'
import { RootState, AppDispatch } from '@/lib/store/store'

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const [formData, setFormData] = useState({
    inviteCode: '',
    fullName: 'Иванов Алексей Сергеевич' // Предзаполненное имя для тестирования
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div style={{ 
      padding: '16px', 
      maxWidth: '400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        padding: '24px', 
        background: '#fff', 
        borderRadius: '12px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
          🎓 Регистрация
        </h2>

        {/* Подсказка с тестовыми кодами */}
        <div style={{ 
          background: '#e6f7ff', 
          padding: '12px', 
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          <strong>Тестовые коды:</strong>
          <div>Студент: D4E5F6, STUDENT102, STUDENT201</div>
          <div>Админ: ADMIN123, SUPERADMIN</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Код приглашения *
              </label>
              <input
                type="text"
                placeholder="Введите код приглашения"
                value={formData.inviteCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleChange('inviteCode', e.target.value)
                }
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Полное имя *
              </label>
              <input
                type="text"
                placeholder="Иванов Алексей Сергеевич"
                value={formData.fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleChange('fullName', e.target.value)
                }
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            {error && (
              <div style={{ 
                color: '#ff4d4f', 
                textAlign: 'center', 
                padding: '8px',
                background: '#fff2f0',
                borderRadius: '4px',
                border: '1px solid #ffccc7'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px',
                background: loading ? '#ccc' : '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}