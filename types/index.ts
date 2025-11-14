// User types
export interface User {
  userId: string
  fullName: string
  role: 'student' | 'admin' | 'moderator'
  universityId: string
  groupId: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  user: User
  token: string
}

export interface MeResponse {
  user: User
}

// Schedule types
export interface Subject {
  name: string
  time: string
  teacher?: string
  classroom?: string
}

export interface DaySchedule {
  groupId: string
  weekType: 'even' | 'odd'
  day: number
  subjects: Subject[]
}

export interface ScheduleResponse {
  success: boolean
  schedule: {
    groupId: string
    weekType: 'even' | 'odd'
    days: {
      [key: string]: DaySchedule
    }
  }
  weekType: 'even' | 'odd'
  groupName: string
  userGroup: string
}

// Form types
export interface RegisterFormData {
  inviteCode: string
  fullName: string
}

export interface CreateGroupData {
  name: string
  degree_level: 'bachelor' | 'master'
}

export interface CreateInviteCodeData {
  groupId: string
  activations: number
}

// API Error type
export interface ApiError {
  error: string
  success?: boolean
}

// Redux state types
export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface ScheduleState {
  schedule: ScheduleResponse['schedule'] | null
  weekType: 'even' | 'odd' | 'current' | null
  loading: boolean
  error: string | null
}

export interface AdminState {
  groups: any[]
  inviteCodes: any[]
  loading: boolean
  error: string | null
}

export interface RootState {
  auth: AuthState
  schedule: ScheduleState
  //admin: AdminState
}

// Добавьте эти интерфейсы если их нет
export interface AdminState {
  groups: any[]
  inviteCodes: any[]
  loading: boolean
  error: string | null
}

export interface CreateGroupData {
  name: string
  degree_level: 'bachelor' | 'master'
}

export interface CreateInviteCodeData {
  groupId: string
  activations: number
}