import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: number;
  name: string;
  group: string;
  avgGrade: number;
  subjects: { name: string; grade: number }[];
}

interface ScheduleItem {
  id: number;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  homework: string;
}

const defaultStudents: Student[] = [
  {
    id: 1,
    name: 'Александра Иванова',
    group: 'КБ-101',
    avgGrade: 4.8,
    subjects: [
      { name: 'Кибербезопасность', grade: 5 },
      { name: 'Программирование', grade: 5 },
      { name: 'Сети', grade: 4 },
    ],
  },
  {
    id: 2,
    name: 'Дмитрий Петров',
    group: 'КБ-101',
    avgGrade: 4.2,
    subjects: [
      { name: 'Кибербезопасность', grade: 4 },
      { name: 'Программирование', grade: 5 },
      { name: 'Сети', grade: 4 },
    ],
  },
  {
    id: 3,
    name: 'Мария Сидорова',
    group: 'КБ-102',
    avgGrade: 4.5,
    subjects: [
      { name: 'Кибербезопасность', grade: 5 },
      { name: 'Программирование', grade: 4 },
      { name: 'Сети', grade: 5 },
    ],
  },
];

const defaultSchedule: ScheduleItem[] = [
  {
    id: 1,
    day: 'Понедельник',
    time: '09:00',
    subject: 'Кибербезопасность',
    teacher: 'Смирнов А.В.',
    homework: 'Изучить основы шифрования',
  },
  {
    id: 2,
    day: 'Понедельник',
    time: '11:00',
    subject: 'Программирование',
    teacher: 'Козлова М.И.',
    homework: 'Решить задачи на Python',
  },
  {
    id: 3,
    day: 'Среда',
    time: '10:00',
    subject: 'Сети',
    teacher: 'Новиков И.П.',
    homework: 'Настроить виртуальную сеть',
  },
];

export default function Index() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);

  useEffect(() => {
    const savedStudents = localStorage.getItem('cyberschool_students');
    const savedSchedule = localStorage.getItem('cyberschool_schedule');
    
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      setStudents(defaultStudents);
    }
    
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    } else {
      setSchedule(defaultSchedule);
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('cyberschool_students', JSON.stringify(students));
    }
  }, [students]);

  useEffect(() => {
    if (schedule.length > 0) {
      localStorage.setItem('cyberschool_schedule', JSON.stringify(schedule));
    }
  }, [schedule]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === '22' && password === '22') {
      setIsLoggedIn(true);
    }
  };

  const calculateAvgGrade = (subjects: { name: string; grade: number }[]) => {
    if (subjects.length === 0) return 0;
    return subjects.reduce((sum, s) => sum + s.grade, 0) / subjects.length;
  };

  const handleSaveStudent = (student: Student) => {
    const avgGrade = calculateAvgGrade(student.subjects);
    const updatedStudent = { ...student, avgGrade };
    
    if (isAddingStudent) {
      setStudents([...students, updatedStudent]);
      toast({ title: 'Учащийся добавлен' });
    } else {
      setStudents(students.map(s => s.id === student.id ? updatedStudent : s));
      toast({ title: 'Данные обновлены' });
    }
    setEditingStudent(null);
    setIsAddingStudent(false);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
    toast({ title: 'Учащийся удален' });
  };

  const handleSaveSchedule = (item: ScheduleItem) => {
    if (isAddingSchedule) {
      setSchedule([...schedule, item]);
      toast({ title: 'Занятие добавлено' });
    } else {
      setSchedule(schedule.map(s => s.id === item.id ? item : s));
      toast({ title: 'Расписание обновлено' });
    }
    setEditingSchedule(null);
    setIsAddingSchedule(false);
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedule(schedule.filter(s => s.id !== id));
    toast({ title: 'Занятие удалено' });
  };

  const handleExportData = () => {
    const data = {
      students,
      schedule,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberschool_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast({ title: 'Данные экспортированы' });
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.students) setStudents(data.students);
        if (data.schedule) setSchedule(data.schedule);
        toast({ title: 'Данные импортированы успешно' });
      } catch {
        toast({ title: 'Ошибка импорта', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/10">
        <Card className="w-full max-w-md border-primary/20 shadow-2xl shadow-primary/5">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Shield" size={32} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CyberSchool
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Платформа управления учебным процессом
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Логин</Label>
                <Input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="border-primary/20 focus:border-primary"
                  placeholder="Введите логин"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/20 focus:border-primary"
                  placeholder="Введите пароль"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300"
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CyberSchool
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="border-primary/20 hover:bg-primary/10"
            >
              <Icon name="Download" size={18} className="mr-2" />
              Экспорт
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('import-file')?.click()}
              className="border-primary/20 hover:bg-primary/10"
            >
              <Icon name="Upload" size={18} className="mr-2" />
              Импорт
            </Button>
            <input
              id="import-file"
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
              className="border-primary/20 hover:bg-primary/10"
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-primary/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Успеваемость
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Calendar" size={18} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Users" size={18} className="mr-2" />
              Участники
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего учащихся</CardTitle>
                  <Icon name="Users" size={20} className="text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{students.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Set(students.map(s => s.group)).size} групп
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
                  <Icon name="TrendingUp" size={20} className="text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">
                    {students.length > 0
                      ? (students.reduce((acc, s) => acc + s.avgGrade, 0) / students.length).toFixed(1)
                      : '0.0'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">По всем предметам</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Занятий в расписании</CardTitle>
                  <Icon name="Calendar" size={20} className="text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{schedule.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Всего занятий</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" size={22} className="text-secondary" />
                    Лучшие учащиеся
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {students
                    .sort((a, b) => b.avgGrade - a.avgGrade)
                    .slice(0, 3)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-2xl font-bold text-primary/50">#{index + 1}</div>
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.group}</div>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                          {student.avgGrade.toFixed(1)}
                        </Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" size={22} className="text-primary" />
                    Ближайшие занятия
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedule.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-4 rounded-lg border border-primary/20 bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-primary">{item.subject}</h3>
                          <p className="text-sm text-muted-foreground">{item.teacher}</p>
                        </div>
                        <Badge variant="outline" className="border-primary/40 text-primary">
                          {item.time}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Icon name="BookOpen" size={16} />
                        <span>{item.homework}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={22} className="text-primary" />
                  Успеваемость учащихся
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {students.map((student) => (
                  <div key={student.id} className="space-y-3 p-4 rounded-lg border border-primary/20 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.group}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 text-lg px-4 py-1">
                          {student.avgGrade.toFixed(1)}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingStudent(student)}
                          className="border-primary/20"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {student.subjects.map((subject, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{subject.name}</span>
                            <span className="font-semibold text-primary">{subject.grade}</span>
                          </div>
                          <Progress value={subject.grade * 20} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CalendarDays" size={22} className="text-primary" />
                  Расписание занятий и домашние задания
                </CardTitle>
                <Button
                  onClick={() => {
                    setIsAddingSchedule(true);
                    setEditingSchedule({
                      id: Math.max(0, ...schedule.map(s => s.id)) + 1,
                      day: '',
                      time: '',
                      subject: '',
                      teacher: '',
                      homework: ''
                    });
                  }}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить занятие
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-lg border border-primary/20 bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-primary text-white border-0">{item.day}</Badge>
                          <Badge variant="outline" className="border-primary/40 text-primary">
                            {item.time}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-primary">{item.subject}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="User" size={16} />
                          {item.teacher}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20 max-w-md flex-1">
                        <Icon name="BookCheck" size={20} className="text-secondary mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-secondary mb-1">ДОМАШНЕЕ ЗАДАНИЕ</div>
                          <p className="text-sm">{item.homework}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsAddingSchedule(false);
                            setEditingSchedule(item);
                          }}
                          className="border-primary/20"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSchedule(item.id)}
                          className="border-destructive/20 text-destructive hover:bg-destructive/10"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GraduationCap" size={22} className="text-primary" />
                  Список участников
                </CardTitle>
                <Button
                  onClick={() => {
                    setIsAddingStudent(true);
                    setEditingStudent({
                      id: Math.max(0, ...students.map(s => s.id)) + 1,
                      name: '',
                      group: '',
                      avgGrade: 0,
                      subjects: []
                    });
                  }}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить учащегося
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="p-5 rounded-lg border border-primary/20 bg-gradient-to-br from-muted/30 to-transparent hover:from-muted/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-lg">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.group}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Средний балл</span>
                          <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                            {student.avgGrade.toFixed(1)}
                          </Badge>
                        </div>
                        <div className="pt-2 space-y-1">
                          {student.subjects.map((subject, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{subject.name}</span>
                              <span className="font-semibold text-primary">{subject.grade}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-primary/10">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsAddingStudent(false);
                            setEditingStudent(student);
                          }}
                          className="flex-1 border-primary/20"
                        >
                          <Icon name="Edit" size={16} className="mr-1" />
                          Изменить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteStudent(student.id)}
                          className="border-destructive/20 text-destructive hover:bg-destructive/10"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <StudentEditDialog
        student={editingStudent}
        isOpen={!!editingStudent}
        isAdding={isAddingStudent}
        onClose={() => {
          setEditingStudent(null);
          setIsAddingStudent(false);
        }}
        onSave={handleSaveStudent}
      />

      <ScheduleEditDialog
        item={editingSchedule}
        isOpen={!!editingSchedule}
        isAdding={isAddingSchedule}
        onClose={() => {
          setEditingSchedule(null);
          setIsAddingSchedule(false);
        }}
        onSave={handleSaveSchedule}
      />
    </div>
  );
}

function StudentEditDialog({
  student,
  isOpen,
  isAdding,
  onClose,
  onSave,
}: {
  student: Student | null;
  isOpen: boolean;
  isAdding: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
}) {
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  if (!formData) return null;

  const handleSubjectChange = (index: number, field: 'name' | 'grade', value: string | number) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', grade: 5 }]
    });
  };

  const removeSubject = (index: number) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isAdding ? 'Добавить учащегося' : 'Редактировать данные учащегося'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя и фамилия</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иванов Иван"
              />
            </div>
            <div className="space-y-2">
              <Label>Группа</Label>
              <Input
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                placeholder="КБ-101"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Предметы и оценки</Label>
              <Button size="sm" onClick={addSubject} variant="outline">
                <Icon name="Plus" size={16} className="mr-1" />
                Добавить предмет
              </Button>
            </div>
            {formData.subjects.map((subject, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(idx, 'name', e.target.value)}
                  placeholder="Название предмета"
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={subject.grade}
                  onChange={(e) => handleSubjectChange(idx, 'grade', Number(e.target.value))}
                  className="w-20"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => removeSubject(idx)}
                  className="text-destructive"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => onSave(formData)} className="flex-1 bg-gradient-to-r from-primary to-secondary">
              Сохранить
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleEditDialog({
  item,
  isOpen,
  isAdding,
  onClose,
  onSave,
}: {
  item: ScheduleItem | null;
  isOpen: boolean;
  isAdding: boolean;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
}) {
  const [formData, setFormData] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isAdding ? 'Добавить занятие' : 'Редактировать занятие'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>День недели</Label>
              <Input
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                placeholder="Понедельник"
              />
            </div>
            <div className="space-y-2">
              <Label>Время</Label>
              <Input
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="09:00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Предмет</Label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Кибербезопасность"
              />
            </div>
            <div className="space-y-2">
              <Label>Преподаватель</Label>
              <Input
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                placeholder="Иванов И.И."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Домашнее задание</Label>
            <Textarea
              value={formData.homework}
              onChange={(e) => setFormData({ ...formData, homework: e.target.value })}
              placeholder="Описание домашнего задания"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => onSave(formData)} className="flex-1 bg-gradient-to-r from-primary to-secondary">
              Сохранить
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
