import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface BookType {
  id: number;
  title: string;
  author: string;
  coverColor: string;
  ageRange: string;
  duration: string;
  rating: number;
  category: string;
}

const books: BookType[] = [
  {
    id: 1,
    title: "الأرنب الذكي",
    author: "أحمد محمود",
    coverColor: "from-pink-400 to-purple-500",
    ageRange: "4-6 سنوات",
    duration: "5 دقائق",
    rating: 5,
    category: "حيوانات"
  },
  {
    id: 2,
    title: "رحلة إلى الفضاء",
    author: "سارة أحمد",
    coverColor: "from-blue-400 to-indigo-600",
    ageRange: "7-9 سنوات",
    duration: "8 دقائق",
    rating: 5,
    category: "مغامرات"
  },
  {
    id: 3,
    title: "الصديقان الوفيان",
    author: "محمد علي",
    coverColor: "from-green-400 to-teal-500",
    ageRange: "5-7 سنوات",
    duration: "6 دقائق",
    rating: 4,
    category: "صداقة"
  },
  {
    id: 4,
    title: "سر الغابة السحرية",
    author: "ليلى حسن",
    coverColor: "from-amber-400 to-orange-500",
    ageRange: "6-8 سنوات",
    duration: "10 دقائق",
    rating: 5,
    category: "خيال"
  },
  {
    id: 5,
    title: "النملة النشيطة",
    author: "فاطمة يوسف",
    coverColor: "from-rose-400 to-pink-600",
    ageRange: "4-6 سنوات",
    duration: "5 دقائق",
    rating: 4,
    category: "حيوانات"
  },
  {
    id: 6,
    title: "قصر الألوان",
    author: "خالد سعيد",
    coverColor: "from-violet-400 to-purple-600",
    ageRange: "5-8 سنوات",
    duration: "7 دقائق",
    rating: 5,
    category: "تعليمي"
  }
];

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  const categories = ["الكل", "حيوانات", "مغامرات", "صداقة", "خيال", "تعليمي"];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Book className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">مكتبة كنزي</h1>
                <p className="text-sm text-muted-foreground">اكتشف عالم القصص الممتع</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="ابحث عن كتاب أو مؤلف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap transition-smooth"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="cursor-pointer transition-smooth hover:shadow-glow hover:scale-105"
              onClick={() => navigate(`/read/${book.id}`)}
            >
              <CardContent className="p-0">
                <div className={`h-48 bg-gradient-to-br ${book.coverColor} rounded-t-lg flex items-center justify-center`}>
                  <Book className="w-20 h-20 text-white opacity-80" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-foreground mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {book.duration}
                    </span>
                    <span>{book.ageRange}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < book.rating ? "fill-secondary text-secondary" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">لم يتم العثور على كتب</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
