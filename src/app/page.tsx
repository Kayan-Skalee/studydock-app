'use client'

import { useState, useEffect } from 'react'
import AuthForm from '@/components/AuthForm'
import TaskManager from '@/components/TaskManager'

interface User {
  email: string
  name: string
  isNewUser: boolean
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se usuário está logado
    const savedUser = localStorage.getItem('studydock_current_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('studydock_current_user', JSON.stringify(userData))
    
    // Se for um novo usuário, limpar todos os dados salvos
    if (userData.isNewUser) {
      const keysToRemove = [
        'studydock_tasks',
        'studydock_pomodoro_stats',
        'studydock_calendar_events',
        'studydock_flashcards',
        'studydock_subjects',
        'studydock_user_points',
        'studydock_badges',
        'studydock_focus_sessions'
      ]
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
      })
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('studydock_current_user')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm onLogin={handleLogin} />
  }

  return <TaskManager user={user} onLogout={handleLogout} />
}