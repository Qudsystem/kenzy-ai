import { useNavigate } from "react-router-dom";
import { Book, Sparkles, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Book,
      title: "مكتبة ضخمة",
      description: "مئات القصص المسلية والتعليمية",
      color: "from-pink-400 to-purple-500"
    },
    {
      icon: Sparkles,
      title: "راوي ذكي",
      description: "استمع للقصص بصوت واضح وممتع",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Trophy,
      title: "نقاط وجوائز",
      description: "اجمع النقاط واحصل على إنجازات",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Users,
      title: "لوحة الآباء",
      description: "تابع تقدم طفلك اليومي",
      color: "from-green-400 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-primary mb-6 shadow-glow">
            <Book className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            كنزي
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            عالم القصص التفاعلية للأطفال
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/library')}
              className="gradient-primary text-lg px-8 py-6 shadow-glow hover:scale-105 transition-smooth"
            >
              <Book className="w-5 h-5 ml-2" />
              ابدأ القراءة
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/parent-dashboard')}
              className="text-lg px-8 py-6 hover:scale-105 transition-smooth"
            >
              <Users className="w-5 h-5 ml-2" />
              لوحة الآباء
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transition-smooth hover:shadow-elegant hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">500+</div>
              <div className="text-sm text-muted-foreground">قصة تفاعلية</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">طفل سعيد</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">4.9</div>
              <div className="text-sm text-muted-foreground">تقييم الآباء</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-sm text-muted-foreground">محتوى آمن</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
