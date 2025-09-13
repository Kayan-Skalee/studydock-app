'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { 
  BookOpen, 
  Clock, 
  Calendar as CalendarIcon, 
  Brain, 
  FolderOpen, 
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Check,
  X,
  Edit,
  Trash2,
  Star,
  Target,
  Award,
  User,
  LogOut,
  Settings,
  Shield,
  FileText,
  AlertTriangle
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface User {
  email: string
  name: string
  isNewUser: boolean
}

interface TaskManagerProps {
  user: User
  onLogout: () => void
}

interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
  subject?: string
}

interface PomodoroSession {
  id: string
  duration: number
  type: 'focus' | 'break'
  completedAt: string
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  description?: string
}

interface Flashcard {
  id: string
  question: string
  answer: string
  subject: string
  correctCount: number
  totalReviews: number
  lastReviewed?: string
}

interface Subject {
  id: string
  name: string
  color: string
  notes: string
  createdAt: string
}

export default function TaskManager({ user, onLogout }: TaskManagerProps) {
  // Estados principais
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tasks, setTasks] = useState<Task[]>([])
  const [pomodoroSessions, setPomodoroSessions] = useState<PomodoroSession[]>([])
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [userPoints, setUserPoints] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  
  // Estados do Pomodoro
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  
  // Estados dos formulários
  const [newTask, setNewTask] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newEvent, setNewEvent] = useState({ title: '', time: '', description: '' })
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '', subject: '' })
  const [newSubject, setNewSubject] = useState({ name: '', color: '#3B82F6', notes: '' })
  const [reviewingCard, setReviewingCard] = useState<Flashcard | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  // Carregar dados do localStorage
  useEffect(() => {
    const loadData = () => {
      setTasks(JSON.parse(localStorage.getItem('studydock_tasks') || '[]'))
      setPomodoroSessions(JSON.parse(localStorage.getItem('studydock_pomodoro_stats') || '[]'))
      setCalendarEvents(JSON.parse(localStorage.getItem('studydock_calendar_events') || '[]'))
      setFlashcards(JSON.parse(localStorage.getItem('studydock_flashcards') || '[]'))
      setSubjects(JSON.parse(localStorage.getItem('studydock_subjects') || '[]'))
      setUserPoints(parseInt(localStorage.getItem('studydock_user_points') || '0'))
    }
    
    loadData()
  }, [])

  // Timer do Pomodoro
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1)
      }, 1000)
    } else if (pomodoroTime === 0) {
      // Sessão completada
      const session: PomodoroSession = {
        id: Date.now().toString(),
        duration: isBreak ? breakTime : focusTime,
        type: isBreak ? 'break' : 'focus',
        completedAt: new Date().toISOString()
      }
      
      const newSessions = [...pomodoroSessions, session]
      setPomodoroSessions(newSessions)
      localStorage.setItem('studydock_pomodoro_stats', JSON.stringify(newSessions))
      
      if (!isBreak) {
        // Adicionar pontos apenas para sessões de foco
        const newPoints = userPoints + 10
        setUserPoints(newPoints)
        localStorage.setItem('studydock_user_points', newPoints.toString())
      }
      
      setIsRunning(false)
      setIsBreak(!isBreak)
      setPomodoroTime(isBreak ? focusTime * 60 : breakTime * 60)
    }
    
    return () => clearInterval(interval)
  }, [isRunning, pomodoroTime, isBreak, focusTime, breakTime, pomodoroSessions, userPoints])

  // Funções do Pomodoro
  const startPomodoro = () => setIsRunning(true)
  const pausePomodoro = () => setIsRunning(false)
  const resetPomodoro = () => {
    setIsRunning(false)
    setPomodoroTime(isBreak ? breakTime * 60 : focusTime * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Funções das tarefas
  const addTask = () => {
    if (!newTask.trim()) return
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    const updatedTasks = [...tasks, task]
    setTasks(updatedTasks)
    localStorage.setItem('studydock_tasks', JSON.stringify(updatedTasks))
    setNewTask('')
  }

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    localStorage.setItem('studydock_tasks', JSON.stringify(updatedTasks))
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
    localStorage.setItem('studydock_tasks', JSON.stringify(updatedTasks))
  }

  // Funções do calendário
  const addEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return
    
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate.toISOString(),
      time: newEvent.time,
      description: newEvent.description
    }
    
    const updatedEvents = [...calendarEvents, event]
    setCalendarEvents(updatedEvents)
    localStorage.setItem('studydock_calendar_events', JSON.stringify(updatedEvents))
    setNewEvent({ title: '', time: '', description: '' })
  }

  const deleteEvent = (id: string) => {
    const updatedEvents = calendarEvents.filter(event => event.id !== id)
    setCalendarEvents(updatedEvents)
    localStorage.setItem('studydock_calendar_events', JSON.stringify(updatedEvents))
  }

  // Funções dos flashcards
  const addFlashcard = () => {
    if (!newFlashcard.question.trim() || !newFlashcard.answer.trim()) return
    
    const flashcard: Flashcard = {
      id: Date.now().toString(),
      question: newFlashcard.question,
      answer: newFlashcard.answer,
      subject: newFlashcard.subject || 'Geral',
      correctCount: 0,
      totalReviews: 0
    }
    
    const updatedFlashcards = [...flashcards, flashcard]
    setFlashcards(updatedFlashcards)
    localStorage.setItem('studydock_flashcards', JSON.stringify(updatedFlashcards))
    setNewFlashcard({ question: '', answer: '', subject: '' })
  }

  const deleteFlashcard = (id: string) => {
    const updatedFlashcards = flashcards.filter(card => card.id !== id)
    setFlashcards(updatedFlashcards)
    localStorage.setItem('studydock_flashcards', JSON.stringify(updatedFlashcards))
    
    // Se estava revisando este card, parar a revisão
    if (reviewingCard?.id === id) {
      setReviewingCard(null)
      setShowAnswer(false)
    }
  }

  const reviewFlashcard = (correct: boolean) => {
    if (!reviewingCard) return
    
    const updatedFlashcards = flashcards.map(card => 
      card.id === reviewingCard.id 
        ? {
            ...card,
            correctCount: correct ? card.correctCount + 1 : card.correctCount,
            totalReviews: card.totalReviews + 1,
            lastReviewed: new Date().toISOString()
          }
        : card
    )
    
    setFlashcards(updatedFlashcards)
    localStorage.setItem('studydock_flashcards', JSON.stringify(updatedFlashcards))
    setReviewingCard(null)
    setShowAnswer(false)
  }

  // Funções das matérias
  const addSubject = () => {
    if (!newSubject.name.trim()) return
    
    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      color: newSubject.color,
      notes: newSubject.notes,
      createdAt: new Date().toISOString()
    }
    
    const updatedSubjects = [...subjects, subject]
    setSubjects(updatedSubjects)
    localStorage.setItem('studydock_subjects', JSON.stringify(updatedSubjects))
    setNewSubject({ name: '', color: '#3B82F6', notes: '' })
  }

  const deleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== id)
    setSubjects(updatedSubjects)
    localStorage.setItem('studydock_subjects', JSON.stringify(updatedSubjects))
  }

  // Função para limpar todos os dados
  const clearAllData = () => {
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
    
    // Resetar estados
    setTasks([])
    setPomodoroSessions([])
    setCalendarEvents([])
    setFlashcards([])
    setSubjects([])
    setUserPoints(0)
    setReviewingCard(null)
    setShowAnswer(false)
  }

  // Estatísticas
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt).toDateString()
    const today = new Date().toDateString()
    return taskDate === today
  })

  const completedTasks = todayTasks.filter(task => task.completed)
  const completionRate = todayTasks.length > 0 ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0

  const todaySessions = pomodoroSessions.filter(session => {
    const sessionDate = new Date(session.completedAt).toDateString()
    const today = new Date().toDateString()
    return sessionDate === today && session.type === 'focus'
  })

  const todayEvents = calendarEvents.filter(event => {
    const eventDate = new Date(event.date).toDateString()
    const today = new Date().toDateString()
    return eventDate === today
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">StudyDock</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">{userPoints} pontos</span>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="end">
                  <div className="space-y-2">
                    <div className="px-2 py-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <hr />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-red-600 hover:text-red-700"
                      onClick={onLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Configurações */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </DialogTitle>
            <DialogDescription>
              Gerencie seus dados e configurações da conta
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Dados da Conta</h4>
              <div className="text-sm text-gray-600">
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Pontos:</strong> {userPoints}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Estatísticas</h4>
              <div className="text-sm text-gray-600">
                <p><strong>Tarefas:</strong> {tasks.length}</p>
                <p><strong>Flashcards:</strong> {flashcards.length}</p>
                <p><strong>Matérias:</strong> {subjects.length}</p>
                <p><strong>Eventos:</strong> {calendarEvents.length}</p>
                <p><strong>Sessões Pomodoro:</strong> {pomodoroSessions.length}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Limpar Todos os Dados
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação irá remover permanentemente todos os seus dados: tarefas, flashcards, 
                      matérias, eventos do calendário, sessões Pomodoro e pontos. Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => {
                        clearAllData()
                        setShowSettings(false)
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Sim, limpar tudo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto p-1">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 py-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="pomodoro" className="flex items-center space-x-2 py-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Pomodoro</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2 py-2">
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Calendário</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center space-x-2 py-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center space-x-2 py-2">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Matérias</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ciclos Hoje</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todaySessions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {todaySessions.length * focusTime} min de foco
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tarefas</CardTitle>
                  <Check className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedTasks.length}/{todayTasks.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {completionRate}% concluídas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eventos Hoje</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayEvents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    agendados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pontos</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userPoints}</div>
                  <p className="text-xs text-muted-foreground">
                    total acumulado
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tarefas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Tarefas de Hoje</CardTitle>
                <CardDescription>Adicione e gerencie suas tarefas diárias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nova tarefa..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    className="flex-1"
                  />
                  <Button onClick={addTask}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {todayTasks.map(task => (
                    <div key={task.id} className="flex items-center space-x-2 p-2 rounded-lg border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTask(task.id)}
                        className={task.completed ? 'text-green-600' : 'text-gray-400'}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {todayTasks.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Nenhuma tarefa para hoje</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pomodoro */}
          <TabsContent value="pomodoro" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Timer Pomodoro</CardTitle>
                  <CardDescription>
                    {isBreak ? 'Tempo de descanso' : 'Tempo de foco'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button
                        onClick={isRunning ? pausePomodoro : startPomodoro}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isRunning ? 'Pausar' : 'Iniciar'}
                      </Button>
                      <Button variant="outline" onClick={resetPomodoro}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="focus-time">Foco (min)</Label>
                      <Input
                        id="focus-time"
                        type="number"
                        value={focusTime}
                        onChange={(e) => setFocusTime(parseInt(e.target.value) || 25)}
                        disabled={isRunning}
                        min="1"
                        max="60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="break-time">Descanso (min)</Label>
                      <Input
                        id="break-time"
                        type="number"
                        value={breakTime}
                        onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                        disabled={isRunning}
                        min="1"
                        max="30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                  <CardDescription>Seu progresso de hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Ciclos completados:</span>
                      <Badge variant="secondary">{todaySessions.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tempo de foco:</span>
                      <Badge variant="secondary">{todaySessions.length * focusTime} min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pontos ganhos:</span>
                      <Badge variant="secondary">{todaySessions.length * 10}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendário */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendário</CardTitle>
                  <CardDescription>Selecione uma data para ver eventos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={ptBR}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Novo Evento</CardTitle>
                  <CardDescription>Adicione um evento ao seu calendário</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Título</Label>
                    <Input
                      id="event-title"
                      placeholder="Título do evento"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-time">Horário</Label>
                    <Input
                      id="event-time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-description">Descrição</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Descrição opcional"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addEvent} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Eventos do dia selecionado */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Eventos - {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {calendarEvents
                      .filter(event => {
                        const eventDate = new Date(event.date).toDateString()
                        const selected = selectedDate.toDateString()
                        return eventDate === selected
                      })
                      .map(event => (
                        <div key={event.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{event.title}</h4>
                              {event.time && (
                                <p className="text-sm text-gray-500">{event.time}</p>
                              )}
                              {event.description && (
                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEvent(event.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    {calendarEvents.filter(event => {
                      const eventDate = new Date(event.date).toDateString()
                      const selected = selectedDate.toDateString()
                      return eventDate === selected
                    }).length === 0 && (
                      <p className="text-center text-gray-500 py-4">Nenhum evento nesta data</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Flashcards */}
          <TabsContent value="flashcards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Novo Flashcard</CardTitle>
                  <CardDescription>Crie um novo cartão de estudo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="card-question">Pergunta</Label>
                    <Textarea
                      id="card-question"
                      placeholder="Digite a pergunta..."
                      value={newFlashcard.question}
                      onChange={(e) => setNewFlashcard(prev => ({ ...prev, question: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-answer">Resposta</Label>
                    <Textarea
                      id="card-answer"
                      placeholder="Digite a resposta..."
                      value={newFlashcard.answer}
                      onChange={(e) => setNewFlashcard(prev => ({ ...prev, answer: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-subject">Matéria</Label>
                    <Input
                      id="card-subject"
                      placeholder="Ex: Matemática, História..."
                      value={newFlashcard.subject}
                      onChange={(e) => setNewFlashcard(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addFlashcard} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Flashcard
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revisão</CardTitle>
                  <CardDescription>Pratique com seus flashcards</CardDescription>
                </CardHeader>
                <CardContent>
                  {!reviewingCard ? (
                    <div className="space-y-4">
                      <p className="text-center text-gray-600">
                        Você tem {flashcards.length} flashcard(s) disponível(is)
                      </p>
                      <Button
                        onClick={() => {
                          const randomCard = flashcards[Math.floor(Math.random() * flashcards.length)]
                          setReviewingCard(randomCard)
                          setShowAnswer(false)
                        }}
                        disabled={flashcards.length === 0}
                        className="w-full"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Iniciar Revisão
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg min-h-32 flex items-center justify-center">
                        <p className="text-center">
                          {showAnswer ? reviewingCard.answer : reviewingCard.question}
                        </p>
                      </div>
                      
                      {!showAnswer ? (
                        <Button
                          onClick={() => setShowAnswer(true)}
                          className="w-full"
                        >
                          Mostrar Resposta
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => reviewFlashcard(false)}
                            variant="outline"
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Errei
                          </Button>
                          <Button
                            onClick={() => reviewFlashcard(true)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Acertei
                          </Button>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setReviewingCard(null)
                          setShowAnswer(false)
                        }}
                        className="w-full"
                      >
                        Parar Revisão
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Lista de Flashcards */}
            <Card>
              <CardHeader>
                <CardTitle>Meus Flashcards</CardTitle>
                <CardDescription>Gerencie seus cartões de estudo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {flashcards.map(card => (
                    <div key={card.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium">{card.question}</p>
                          <p className="text-sm text-gray-600 mt-1">{card.subject}</p>
                          {card.totalReviews > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Acertos: {card.correctCount}/{card.totalReviews} ({Math.round((card.correctCount / card.totalReviews) * 100)}%)
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFlashcard(card.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {flashcards.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Nenhum flashcard criado ainda</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matérias */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nova Matéria</CardTitle>
                  <CardDescription>Organize seus estudos por matéria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject-name">Nome da Matéria</Label>
                    <Input
                      id="subject-name"
                      placeholder="Ex: Matemática, História..."
                      value={newSubject.name}
                      onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject-color">Cor</Label>
                    <Input
                      id="subject-color"
                      type="color"
                      value={newSubject.color}
                      onChange={(e) => setNewSubject(prev => ({ ...prev, color: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject-notes">Anotações</Label>
                    <Textarea
                      id="subject-notes"
                      placeholder="Anotações sobre a matéria..."
                      value={newSubject.notes}
                      onChange={(e) => setNewSubject(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                  <Button onClick={addSubject} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Matéria
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                  <CardDescription>Resumo dos seus estudos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total de matérias:</span>
                      <Badge variant="secondary">{subjects.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total de flashcards:</span>
                      <Badge variant="secondary">{flashcards.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Eventos agendados:</span>
                      <Badge variant="secondary">{calendarEvents.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Matérias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map(subject => (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        />
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSubject(subject.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {subject.notes && (
                      <p className="text-sm text-gray-600 mb-3">{subject.notes}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      Criado em {format(new Date(subject.createdAt), "dd/MM/yyyy")}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {subjects.length === 0 && (
                <div className="col-span-full">
                  <p className="text-center text-gray-500 py-8">Nenhuma matéria criada ainda</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}