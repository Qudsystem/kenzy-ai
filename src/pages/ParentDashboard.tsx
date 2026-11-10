import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Book, Clock, Trophy, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [selectedChild] = useState("أحمد");

  const stats = {
    totalReadingTime: "2 ساعة و 45 دقيقة",
    booksCompleted: 12,
    currentStreak: 7,
    totalPoints: 850
  };

  const recentBooks = [
    { title: "الأرنب الذكي", progress: 100, date: "اليوم" },
    { title: "رحلة إلى الفضاء", progress: 60, date: "أمس" },
    { title: "الصديقان الوفيان", progress: 100, date: "منذ يومين" }
  ];

  const weeklyActivity = [
    { day: "الأحد", minutes: 25 },
    { day: "الاثنين", minutes: 30 },
    { day: "الثلاثاء", minutes: 20 },
    { day: "الأربعاء", minutes: 35 },
    { day: "الخميس", minutes: 40 },
    { day: "الجمعة", minutes: 28 },
    { day: "السبت", minutes: 32 }
  ];

  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">لوحة تحكم الآباء</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Child Selector */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl text-primary-foreground">
                أ
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedChild}</h2>
                <p className="text-sm text-muted-foreground">7 سنوات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalReadingTime}</p>
                  <p className="text-xs text-muted-foreground">وقت القراءة هذا الأسبوع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Book className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.booksCompleted}</p>
                  <p className="text-xs text-muted-foreground">كتاب مكتمل</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.currentStreak} أيام</p>
                  <p className="text-xs text-muted-foreground">سلسلة القراءة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPoints}</p>
                  <p className="text-xs text-muted-foreground">نقطة إجمالية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="activity">النشاط</TabsTrigger>
            <TabsTrigger value="books">الكتب</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-6">
            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  النشاط الأسبوعي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-primary rounded-t-lg transition-all duration-500"
                          style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-foreground">{day.minutes}د</p>
                        <p className="text-xs text-muted-foreground">{day.day}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            {/* Recent Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  الكتب الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{book.title}</p>
                      <span className="text-sm text-muted-foreground">{book.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={book.progress} className="flex-1" />
                      <span className="text-sm font-medium text-foreground">{book.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;
