export const mockAuthResponse = {
  success: true,
  user: {
    userId: "test_student_001",
    fullName: "Тестовый Студент",
    role: "student" as const,
    universityId: "1",
    groupId: "1",
    createdAt: new Date().toISOString()
  },
  token: "mock_jwt_token_12345"
}

export const mockAdminAuthResponse = {
  success: true,
  user: {
    userId: "test_admin_001",
    fullName: "Тестовый Админ",
    role: "admin" as const,
    universityId: "1",
    groupId: "",
    createdAt: new Date().toISOString()
  },
  token: "mock_jwt_admin_token_12345"
}

export const mockScheduleResponse = {
  success: true,
  schedule: {
    groupId: "1",
    weekType: "even" as const,
    days: {
      "1": {
        groupId: "1",
        weekType: "even" as const,
        day: 1,
        subjects: [
          {
            name: "Математика",
            time: "09:00-10:30",
            teacher: "Иванов И.И.",
            classroom: "А-101"
          },
          {
            name: "Физика",
            time: "11:00-12:30",
            teacher: "Петров П.П.",
            classroom: "Б-202"
          }
        ]
      },
      "2": {
        groupId: "1",
        weekType: "even" as const,
        day: 2,
        subjects: [
          {
            name: "Программирование",
            time: "10:00-11:30",
            teacher: "Сидоров С.С.",
            classroom: "А-105"
          }
        ]
      },
      "3": {
        groupId: "1",
        weekType: "even" as const,
        day: 3,
        subjects: [
          {
            name: "Базы данных",
            time: "13:00-14:30",
            teacher: "Кузнецов К.К.",
            classroom: "В-301"
          }
        ]
      },
      "4": {
        groupId: "1",
        weekType: "even" as const,
        day: 4,
        subjects: [] // Нет занятий
      },
      "5": {
        groupId: "1",
        weekType: "even" as const,
        day: 5,
        subjects: [
          {
            name: "Веб-разработка",
            time: "15:00-16:30",
            teacher: "Смирнов С.С.",
            classroom: "А-201"
          }
        ]
      },
      "6": {
        groupId: "1",
        weekType: "even" as const,
        day: 6,
        subjects: [] // Нет занятий
      }
    }
  },
  weekType: "even" as const,
  groupName: "ИТ-101",
  userGroup: "1"
}

// Валидные тестовые коды из документации
export const VALID_INVITE_CODES = {
  'D4E5F6': { role: 'student', groupId: '1' },
  'STUDENT102': { role: 'student', groupId: '2' },
  'STUDENT201': { role: 'student', groupId: '3' },
  'ADMIN123': { role: 'admin', groupId: '' },
  'SUPERADMIN': { role: 'admin', groupId: '' }
}