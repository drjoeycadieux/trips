'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
    videoUrl?: string;
    fallbackImage?: string;
    overlay?: boolean;
    overlayOpacity?: number;
    children?: React.ReactNode;
}

export default function VideoBackground({
    videoUrl = "https://player.vimeo.com/external/494917977.sd.mp4?s=7e40e94ac8bb8c70b7dbfe47a16c5d5b8df6d8f6&profile_id=164&oauth2_token_id=57447761",
    fallbackImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    overlay = true,
    overlayOpacity = 0.5,
    children
}: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Ensure video plays automatically
            video.play().catch(console.error);
        }
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Video Background */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={fallbackImage}
                onError={(e) => {
                    // Fallback to image if video fails to load
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                        fallback.style.display = 'block';
                    }
                }}
            >
                <source src={videoUrl} type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                Your browser does not support the video tag.
            </video>

            {/* Fallback Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${fallbackImage})`,
                    display: 'none'
                }}
            />

            {/* Overlay */}
            {overlay && (
                <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </div>
    );
}
