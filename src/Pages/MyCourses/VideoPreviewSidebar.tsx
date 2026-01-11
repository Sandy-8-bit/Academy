import { useFetchVideoPlayUrl } from "@/queries/courseQuery";
import type { VideoContent } from "@/types/courseContent";
import { X, Volume2, Maximize, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPreviewSidebarProps {
  open: boolean;
  video: VideoContent;
  contentId: string;
  onClose: () => void;
}

export const VideoPreviewSidebar = ({
  open,
  video,
  onClose,
}: VideoPreviewSidebarProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // GET - Fetch video play URL
  const { data: playData, isLoading, isError } = useFetchVideoPlayUrl(video.id);

  const videoUrl = playData?.video_url || video.video_url;

  useEffect(() => {
    if (open && videoRef.current && videoUrl) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [open, videoUrl]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 rounded-lg">
      <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#d1d3d9]">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1f2937]">{video.title}</h3>
            <p className="text-sm text-[#6b7280] mt-0.5">{video.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors"
            aria-label="Close video player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black aspect-video flex items-center justify-center group">
          {isLoading ? (
            <div className="text-white text-center">
              <p className="mb-2">Loading video...</p>
            </div>
          ) : isError || !videoUrl ? (
            <div className="text-white text-center">
              <p className="mb-2">Failed to load video</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                controls
                poster={video.thumbnail_url}
              />
              {/* Custom controls overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <button
                  onClick={handlePlayPause}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm"
                >
                  <Play size={18} />
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm">
                    <Volume2 size={18} />
                  </button>
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm">
                    <Maximize size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Video Info Footer */}
        <div className="p-4 bg-[#f8f9fa] border-t border-[#d1d3d9]">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#6b7280] font-medium">Duration</p>
              <p className="text-[#1f2937] font-semibold">
                {Math.floor(video.duration / 60)}m {video.duration % 60}s
              </p>
            </div>
            <div>
              <p className="text-[#6b7280] font-medium">Type</p>
              <p className="text-[#3ecf8e] font-semibold">
                Video Content
              </p>
            </div>
            <div>
              <p className="text-[#6b7280] font-medium">Status</p>
              <p className="text-[#3ecf8e] font-semibold">
                Ready to play
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
