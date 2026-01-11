import ButtonSm from "@/ui/Common/Button";
import { useFetchTierContents } from "@/queries/contentQuery";
import type {
  TierContentItem,
  VideoContent,
} from "@/types/courseContent";
import { ArrowLeft, NotebookIcon, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CourseContentPage = () => {
  const { tierId } = useParams<{ tierId: string }>();
  const navigate = useNavigate();

  /** API */
  const { data, isLoading, isError } = useFetchTierContents(tierId);

  /** State */
  const [weeks, setWeeks] = useState<
    Record<string, Record<string, TierContentItem[]>>
  >({});
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoContent | null>(null);

  /** Load weeks */
  useEffect(() => {
    if (!data?.weeks) return;

    setWeeks(data.weeks);

    const weekKeys = Object.keys(data.weeks);
    if (!selectedWeek && weekKeys.length > 0) {
      const firstWeek = weekKeys[0];
      setSelectedWeek(firstWeek);

      const dayKeys = Object.keys(data.weeks[firstWeek] ?? {});
      if (dayKeys.length > 0) {
        setSelectedDay(dayKeys[0]);
      }
    }
  }, [data, selectedWeek]);

  /** Derived data */
  const weeksList = useMemo(() => Object.keys(weeks), [weeks]);

  const daysList = useMemo(() => {
    if (!selectedWeek) return [];
    return Object.keys(weeks[selectedWeek] ?? {});
  }, [weeks, selectedWeek]);

  const contents = useMemo<TierContentItem[]>(() => {
    if (!selectedWeek || !selectedDay) return [];
    return weeks[selectedWeek]?.[selectedDay] ?? [];
  }, [weeks, selectedWeek, selectedDay]);

  /** Auto select first video */
  useEffect(() => {
    if (previewVideo || contents.length === 0) return;

    const firstVideo = contents.find(
      (c): c is Extract<TierContentItem, { module_type: "video" }> =>
        c.module_type === "video"
    );

    if (firstVideo) {
      setPreviewVideo(firstVideo.video);
    }
  }, [contents, previewVideo]);

  /** Loading / Error */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-sm">
        Loading course content...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-sm">
        Failed to load content
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1f2937]">
      {/* Header */}
      <header className="bg-white border-b border-[#d1d3d9] px-4 py-2">
        <div className="flex items-center gap-3">
          <ButtonSm
            state="outline"
            onClick={() => navigate(-1)}
            className="border-none px-0 py-0"
          >
            <ArrowLeft size={20} />
          </ButtonSm>
          <h1 className="text-md font-medium">Course Library</h1>
        </div>
      </header>

      {/* Body */}
      <div className="flex h-[calc(100vh-52px)]">
        {/* Weeks */}
        <aside className="w-64 bg-white border-r border-[#d1d3d9] overflow-y-auto">
          <div className="px-4 py-3 border-b text-xs font-semibold text-[#6b7280]">
            Weeks
          </div>

          {weeksList.map((week) => (
            <button
              key={week}
              onClick={() => {
                setSelectedWeek(week);
                const days = Object.keys(weeks[week] ?? {});
                setSelectedDay(days[0] ?? null);
                setPreviewVideo(null);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition ${
                week === selectedWeek
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {week}
            </button>
          ))}
        </aside>

        {/* Days */}
        <aside className="w-64 bg-[#fafafa] border-r border-[#d1d3d9] overflow-y-auto">
          <div className="px-4 py-3 border-b text-xs font-semibold text-[#6b7280]">
            Days
          </div>

          {daysList.map((day) => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setPreviewVideo(null);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition ${
                day === selectedDay
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {day}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 grid grid-cols-[1.6fr_1fr] bg-[#f8f9fa]">
          {/* Video Preview */}
          <section className="bg-white border-r border-[#d1d3d9] flex flex-col">
            {previewVideo ? (
              <>
                <div className="aspect-video bg-black">
                  <video
                    src={previewVideo.video_url}
                    controls
                    className="w-full h-full"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-semibold">
                    {previewVideo.title}
                  </h2>
                  <p className="text-sm text-[#6b7280] mt-2">
                    {previewVideo.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-[#6b7280]">
                Select a video to preview
              </div>
            )}
          </section>

          {/* Chapters */}
          <section className="overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-3 text-sm font-semibold">
              Class Chapter
            </div>

            <div className="p-4 space-y-2">
              {contents.map((item) => {
                if (item.module_type === "video") {
                  const active =
                    previewVideo?.id === item.video.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setPreviewVideo(item.video)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded border text-left ${
                        active
                          ? "bg-[#ecfeff] border-[#06b6d4]"
                          : "bg-white border-[#e5e7eb] hover:bg-gray-50"
                      }`}
                    >
                      <Video className="w-4 h-4 text-[#06b6d4]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.video.title}
                        </p>
                        <p className="text-xs text-[#6b7280]">
                          {Math.floor(item.video.duration / 60)} min
                        </p>
                      </div>
                    </button>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded border bg-white"
                  >
                    <NotebookIcon className="w-4 h-4 text-[#f97316]" />
                    <div>
                      <p className="text-sm font-medium">
                        {item.test.title}
                      </p>
                      <p className="text-xs text-[#6b7280]">
                        {item.test.quiz_count} questions
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
