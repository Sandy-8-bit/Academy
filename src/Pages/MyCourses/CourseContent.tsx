import {
  useFetchTierContents,
  useFetchVideoPlayUrl,
} from "@/queries/contentQuery";
import type { TierContentItem, VideoContent } from "@/types/courseContent";
import {
  Video,
  FileText,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type QuizAnswer = {
  [questionId: string]: string[];
};

export const CourseContentPage = () => {
  const { tierId } = useParams<{ tierId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchTierContents(tierId);

  const [weeks, setWeeks] = useState<
    Record<string, Record<string, TierContentItem[]>>
  >({});
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoContent | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>(
    undefined
  );
  const [activeQuiz, setActiveQuiz] = useState<TierContentItem | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const { data: videoPlayData, isLoading: isVideoLoading } =
    useFetchVideoPlayUrl(selectedVideoId);

  useEffect(() => {
    if (!data?.weeks) return;

    setWeeks(data.weeks);

    const weekKeys = Object.keys(data.weeks);
    if (weekKeys.length > 0) {
      const firstWeek = weekKeys[0];
      setExpandedWeeks(new Set([firstWeek]));
      if (!selectedWeek) {
        setSelectedWeek(firstWeek);
        const dayKeys = Object.keys(data.weeks[firstWeek] ?? {});
        if (dayKeys.length > 0) {
          setSelectedDay(dayKeys[0]);
        }
      }
    }
  }, [data, selectedWeek]);

  const weeksList = useMemo(() => Object.keys(weeks), [weeks]);

  const contents = useMemo<TierContentItem[]>(() => {
    if (!selectedWeek || !selectedDay) return [];
    return weeks[selectedWeek]?.[selectedDay] ?? [];
  }, [weeks, selectedWeek, selectedDay]);

  useEffect(() => {
    if (previewVideo || activeQuiz || contents.length === 0) return;

    const firstVideo = contents.find(
      (c): c is Extract<TierContentItem, { module_type: "video" }> =>
        c.module_type === "video"
    );

    if (firstVideo) {
      setPreviewVideo(firstVideo.video);
      setSelectedVideoId(firstVideo.id);
    }
  }, [contents, previewVideo, activeQuiz]);

  const progress = useMemo(() => {
    const total = data?.total || 0;
    const completed = completedItems.size;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [completedItems, data?.total]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleComplete = (itemId: string) => {
    setCompletedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleWeek = (week: string) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(week)) {
        newSet.delete(week);
      } else {
        newSet.add(week);
      }
      return newSet;
    });
  };

const handleVideoSelect = (
  video: VideoContent,
  contentId: string
) => {
  setPreviewVideo(video);
  setSelectedVideoId(contentId); // ✅ SAME AS INITIAL LOAD
  setActiveQuiz(null);
  setQuizSubmitted(false);
  setSidebarOpen(false);
};


  const handleQuizSelect = (item: TierContentItem) => {
    setActiveQuiz(item);
    setPreviewVideo(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setSidebarOpen(false);
  };

  const handleQuizAnswer = (
    questionId: string,
    choice: string,
    isMulti: boolean
  ) => {
    setQuizAnswers((prev) => {
      if (isMulti) {
        const current = prev[questionId] || [];
        const newAnswers = current.includes(choice)
          ? current.filter((c) => c !== choice)
          : [...current, choice];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [choice] };
      }
    });
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (activeQuiz) {
      toggleComplete(activeQuiz.id);
    }
  };

  const calculateQuizScore = () => {
    if (!activeQuiz || activeQuiz.module_type !== "test")
      return { correct: 0, total: 0 };

    let correct = 0;
    const total = activeQuiz.test.quizzes.length;

    activeQuiz.test.quizzes.forEach((quiz) => {
      const userAnswer = quizAnswers[quiz.id] || [];
      const correctAnswer = quiz.answer;

      if (
        userAnswer.length === correctAnswer.length &&
        userAnswer.every((ans) => correctAnswer.includes(ans))
      ) {
        correct++;
      }
    });

    return { correct, total };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-blue-900 font-medium">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center space-y-4 p-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto border-2 border-red-200">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Failed to load content
          </h2>
          <p className="text-gray-600">Please try again later</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const score = calculateQuizScore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full">
        {/* Curriculum and Content Section */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          {/* Sidebar - Curriculum Section */}
          <div
            className={`fixed md:relative md:w-72 lg:w-80 inset-y-0 left-0 z-50 md:z-auto bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
         <div className="h-screen md:h-auto flex flex-col bg-white border-r border-gray-200">
  {/* Header */}
  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 shrink-0">
    <div className="flex items-center gap-2">
      <BookOpen className="w-5 h-5 text-blue-900" />
      <h3 className="text-sm font-semibold text-gray-900">Curriculum</h3>
    </div>
    <button
      onClick={() => setSidebarOpen(false)}
      className="md:hidden p-1 rounded-md hover:bg-gray-100"
    >
      <X className="w-5 h-5 text-gray-600" />
    </button>
  </div>

  {/* Content */}
  <div className="flex-1 overflow-y-auto p-3 space-y-3">
    {weeksList.map((week, weekIdx) => {
      const isExpanded = expandedWeeks.has(week);
      const dayKeys = Object.keys(weeks[week] ?? {});

      return (
        <div key={week} className="rounded-lg border border-gray-200">
          {/* Week Header */}
          <button
            onClick={() => toggleWeek(week)}
            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-t-lg"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-blue-900">
                {weekIdx + 1}.
              </span>
              <span className="text-sm font-semibold capitalize truncate text-gray-900">
                {week.replace("-", " ")}
              </span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Days */}
          {isExpanded && (
            <div className="border-t border-gray-200 divide-y">
              {dayKeys.map((day) => {
                const dayContents = weeks[week]?.[day] || [];
                const completedCount = dayContents.filter((item) =>
                  completedItems.has(item.id)
                ).length;
                const isSelected =
                  selectedWeek === week && selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedWeek(week);
                      setSelectedDay(day);
                      setPreviewVideo(null);
                      setActiveQuiz(null);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full px-4 py-2 text-left text-sm flex items-center justify-between
                      transition-all
                      ${
                        isSelected
                          ? "bg-blue-50 text-blue-900 border-l-4 border-blue-900"
                          : "hover:bg-gray-50 text-gray-700"
                      }
                    `}
                  >
                    <span className="capitalize truncate">
                      {day.replace("-", " ")}
                    </span>

                    {completedCount > 0 && (
                      <span className="text-xs font-medium text-gray-500">
                        {completedCount}/{dayContents.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-3 lg:gap-4 w-full overflow-hidden">
            {/* Top Bar with Menu & Progress */}
            <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 flex items-center justify-between md:hidden">
              <div>
                <h2 className="font-bold text-gray-900 text-sm">
                  {selectedWeek && selectedDay
                    ? `${selectedDay.replace("-", " ")}`
                    : "Select a lesson"}
                </h2>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>

           
            {/* Video/Quiz Content Area */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex-1">
              {activeQuiz && activeQuiz.module_type === "test" ? (
                <div className="p-3 sm:p-4 md:p-6 overflow-y-auto h-full">
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
                            {activeQuiz.test.title}
                          </h2>
                          <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                            <span>{activeQuiz.test.quiz_count} questions</span>
                            <span>•</span>
                            <span>
                              {Math.floor(activeQuiz.test.test_duration / 60)}{" "}
                              minutes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {activeQuiz.test.quizzes.map((quiz, idx) => {
                        const userAnswer = quizAnswers[quiz.id] || [];

                        return (
                          <div
                            key={quiz.id}
                            className="bg-gray-50  p-3 md:p-4 border border-gray-200"
                          >
                            <div className="flex gap-3 mb-3">
                              <div className="shrink-0 w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                                  {quiz.question}
                                </p>
                                {quiz.isMultiChoice && (
                                  <p className="text-xs text-gray-500">
                                    (Multiple answers allowed)
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2 ml-10">
                              {quiz.choices.map((choice) => {
                                const isSelected = userAnswer.includes(choice);
                                const isCorrectAnswer =
                                  quiz.answer.includes(choice);
                                const showCorrect =
                                  quizSubmitted && isCorrectAnswer;
                                const showIncorrect =
                                  quizSubmitted &&
                                  isSelected &&
                                  !isCorrectAnswer;

                                return (
                                  <button
                                    key={choice}
                                    onClick={() =>
                                      !quizSubmitted &&
                                      handleQuizAnswer(
                                        quiz.id,
                                        choice,
                                        quiz.isMultiChoice
                                      )
                                    }
                                    disabled={quizSubmitted}
                                    className={`
                                    w-full text-left px-3 py-2 rounded-lg border-2 transition-all text-xs md:text-sm
                                    ${
                                      showCorrect
                                        ? "border-green-500 bg-green-50"
                                        : showIncorrect
                                        ? "border-red-500 bg-red-50"
                                        : isSelected
                                        ? "border-blue-900 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                    }
                                    ${
                                      quizSubmitted
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                    }
                                  `}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`
                                        w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                                        ${
                                          showCorrect
                                            ? "border-green-500 bg-green-500"
                                            : showIncorrect
                                            ? "border-red-500 bg-red-500"
                                            : isSelected
                                            ? "border-blue-900 bg-blue-900"
                                            : "border-gray-300"
                                        }
                                      `}
                                      >
                                        {(isSelected || showCorrect) && (
                                          <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                        )}
                                        {showIncorrect && (
                                          <X className="w-2.5 h-2.5 text-white" />
                                        )}
                                      </div>
                                      <span
                                        className={`
                                        ${
                                          showCorrect
                                            ? "text-green-900 font-medium"
                                            : showIncorrect
                                            ? "text-red-900"
                                            : isSelected
                                            ? "text-blue-900 font-medium"
                                            : "text-gray-700"
                                        }
                                      `}
                                      >
                                        {choice}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        className="mt-6 w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <div className="mt-6 p-4 bg-blue-900 text-white rounded-lg">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold mb-1">
                              Quiz Completed!
                            </h3>
                            <p className="text-sm text-blue-200">
                              You scored {score.correct} out of {score.total}{" "}
                              questions correctly
                            </p>
                          </div>
                          <div className="text-2xl md:text-3xl font-bold shrink-0">
                            {Math.round((score.correct / score.total) * 100)}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : previewVideo ? (
                <div className="flex flex-col h-full">
                  <div className="relative bg-black aspect-video">
                    {isVideoLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                      </div>
                    ) : (
                      <video
                        src={videoPlayData?.video_url || previewVideo.video_url}
                        controls
                        className="w-full h-full"
                        poster={previewVideo.thumbnail_url}
                        key={selectedVideoId}
                      />
                    )}
                  </div>

                  <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {previewVideo.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      {previewVideo.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-900 rounded-lg text-xs md:text-sm">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="font-semibold">
                          {formatDuration(previewVideo.duration)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-900 rounded-lg text-xs md:text-sm">
                        <PlayCircle className="w-4 h-4 shrink-0" />
                        <span className="font-semibold">Video Lesson</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 md:py-20 flex items-center justify-center h-full">
                  <div className="text-center space-y-4 max-w-md px-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        Ready to Learn?
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Select a lesson from the curriculum to begin
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Today's Lessons */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">
                  Today's Lessons & Tests
                </h3>
                <div className="grid gap-3 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max overflow-y-auto max-h-48">
                  {contents.length > 0 ? (
                    contents.map((item, idx) => {
                      const isCompleted = completedItems.has(item.id);

                      if (item.module_type === "video") {
                        const isActive = previewVideo?.id === item.video.id;

                        return (
                          <div
                            key={item.id}
                            className={`
                            group relative rounded-lg border-2 transition-all overflow-hidden
                            ${
                              isActive
                                ? "border-blue-900 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }
                          `}
                          >
                            <button
                              onClick={() =>
                                handleVideoSelect(item.video, item.id)
                              }
                              className="w-full p-3 text-left"
                            >
                              <div className="flex items-start gap-2">
                                <div className="relative shrink-0">
                                  <div
                                    className={`
                                    w-10 h-10 rounded-lg flex items-center justify-center
                                    ${isActive ? "bg-blue-900" : "bg-gray-100"}
                                  `}
                                  >
                                    <Video
                                      className={`w-5 h-5 ${
                                        isActive
                                          ? "text-white"
                                          : "text-gray-600"
                                      }`}
                                    />
                                  </div>
                                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4
                                    className={`font-bold text-xs md:text-sm mb-1 line-clamp-2 ${
                                      isActive
                                        ? "text-blue-900"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {item.video.title}
                                  </h4>
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Clock className="w-3 h-3 shrink-0" />
                                    <span className="truncate">
                                      {Math.floor(item.video.duration / 60)}{" "}
                                      min
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>

                            <button
                              onClick={() => toggleComplete(item.id)}
                              className={`
                              absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center
                              transition-all shrink-0
                              ${
                                isCompleted
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                              }
                            `}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={item.id}
                          className="group relative rounded-lg border-2 border-gray-200 bg-white hover:border-orange-300 transition-all overflow-hidden"
                        >
                          <button
                            onClick={() => handleQuizSelect(item)}
                            className="w-full p-3 text-left"
                          >
                            <div className="flex items-start gap-2">
                              <div className="relative shrink-0">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="absolute -top-1 -left-1 w-5 h-5 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                  {idx + 1}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-xs md:text-sm text-gray-900 mb-1 line-clamp-2">
                                  {item.test.title}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-gray-600 flex-wrap">
                                  <span>{item.test.quiz_count} Q</span>
                                  <span>•</span>
                                  <span>
                                    {Math.floor(
                                      item.test.test_duration / 60
                                    )}{" "}
                                    min
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => toggleComplete(item.id)}
                            className={`
                            absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center
                            transition-all shrink-0
                            ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }
                          `}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-8 text-gray-500 text-sm">
                      No lessons for this day
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
