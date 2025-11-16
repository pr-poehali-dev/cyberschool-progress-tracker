import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

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

const mockStudents: Student[] = [
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

const mockSchedule: ScheduleItem[] = [
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === '22' && password === '22') {
      setIsLoggedIn(true);
    }
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
          <Button
            variant="outline"
            onClick={() => setIsLoggedIn(false)}
            className="border-primary/20 hover:bg-primary/10"
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
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
                  <div className="text-3xl font-bold text-primary">{mockStudents.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">2 группы</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
                  <Icon name="TrendingUp" size={20} className="text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">
                    {(mockStudents.reduce((acc, s) => acc + s.avgGrade, 0) / mockStudents.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">По всем предметам</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Занятий сегодня</CardTitle>
                  <Icon name="Calendar" size={20} className="text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">2</div>
                  <p className="text-xs text-muted-foreground mt-1">3 домашних задания</p>
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
                  {mockStudents
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
                  {mockSchedule.slice(0, 3).map((item) => (
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
                {mockStudents.map((student) => (
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
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 text-lg px-4 py-1">
                        {student.avgGrade.toFixed(1)}
                      </Badge>
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CalendarDays" size={22} className="text-primary" />
                  Расписание занятий и домашние задания
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSchedule.map((item) => (
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
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20 max-w-md">
                        <Icon name="BookCheck" size={20} className="text-secondary mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-secondary mb-1">ДОМАШНЕЕ ЗАДАНИЕ</div>
                          <p className="text-sm">{item.homework}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GraduationCap" size={22} className="text-primary" />
                  Список участников
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockStudents.map((student) => (
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
                      <div className="space-y-2">
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
