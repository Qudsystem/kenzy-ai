import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface StoryPage {
  id: number;
  text: string;
  image: string;
}

const storyPages: StoryPage[] = [
  {
    id: 1,
    text: "في غابة جميلة، كان يعيش أرنب ذكي اسمه فهد. كان فهد يحب أن يساعد أصدقاءه من الحيوانات.",
    image: "from-green-400 to-emerald-500"
  },
  {
    id: 2,
    text: "في يوم من الأيام، رأى فهد صديقه الثعلب حزيناً. سأله: ما الذي يحزنك يا صديقي؟",
    image: "from-blue-400 to-cyan-500"
  },
  {
    id: 3,
    text: "قال الثعلب: لقد فقدت طريقي إلى بيتي. ساعدني من فضلك! فكر فهد بذكاء وقال: سأساعدك!",
    image: "from-orange-400 to-amber-500"
  },
  {
    id: 4,
    text: "استخدم فهد ذكاءه وتتبع آثار الأقدام حتى وجد بيت الثعلب. فرح الثعلب كثيراً وشكر صديقه فهد.",
    image: "from-purple-400 to-pink-500"
  },
  {
    id: 5,
    text: "تعلم الثعلب أن الصديق الحقيقي هو من يساعد في الأوقات الصعبة. وعاشا صديقين للأبد.",
    image: "from-rose-400 to-red-500"
  }
];

const Reader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<number>(-1);
  const [points, setPoints] = useState(0);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const progress = ((currentPage + 1) / storyPages.length) * 100;
  const currentStory = storyPages[currentPage];

  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!currentStory) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        const utterance = new SpeechSynthesisUtterance(currentStory.text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.8;
        
        const words = currentStory.text.split(' ');
        let wordIndex = 0;

        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            setHighlightedWord(wordIndex);
            wordIndex++;
          }
        };

        utterance.onend = () => {
          setIsPlaying(false);
          setHighlightedWord(-1);
          if (currentPage < storyPages.length - 1) {
            setTimeout(() => {
              setCurrentPage(prev => prev + 1);
              setPoints(prev => prev + 10);
            }, 1000);
          } else {
            toast.success("🎉 أحسنت! لقد أنهيت القصة!", {
              description: `حصلت على ${points + 50} نقطة!`
            });
            setPoints(prev => prev + 50);
          }
        };

        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < storyPages.length - 1) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setHighlightedWord(-1);
      setCurrentPage(prev => prev + 1);
      setPoints(prev => prev + 5);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setHighlightedWord(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const renderTextWithHighlight = () => {
    const words = currentStory.text.split(' ');
    return (
      <div className="text-xl leading-relaxed">
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block mx-1 transition-all duration-300 ${
              index === highlightedWord
                ? 'bg-secondary text-secondary-foreground px-2 py-1 rounded-md scale-110'
                : ''
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/library')}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-secondary" />
              <span className="font-bold text-lg">{points} نقطة</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-4">
        <Progress value={progress} className="h-2" />
        <p className="text-center text-sm text-muted-foreground mt-2">
          صفحة {currentPage + 1} من {storyPages.length}
        </p>
      </div>

      {/* Story Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 shadow-elegant">
          {/* Story Image */}
          <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${currentStory.image} mb-6 flex items-center justify-center`}>
            <div className="text-white text-6xl">📖</div>
          </div>

          {/* Story Text */}
          <div className="text-center mb-8">
            {renderTextWithHighlight()}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            <Button
              size="lg"
              onClick={handleSpeak}
              className="gradient-primary"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 ml-2" />
                  إيقاف
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 ml-2" />
                  استمع
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === storyPages.length - 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>

          {/* Page Navigation Dots */}
          <div className="flex items-center justify-center gap-2">
            {storyPages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                  setHighlightedWord(-1);
                  setCurrentPage(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reader;
