import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import VideoBackground from "@/components/VideoBackground";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <VideoBackground
      videoUrl="https://cdn.pixabay.com/video/2022/12/19/143685-781554768_large.mp4"
      fallbackImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      overlay={true}
      overlayOpacity={0.4}
    >
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Plan Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Adventure
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Welcome to TripPlanner, your personal travel companion. Create and
              organize your trips with ease, keeping all your travel plans in one
              place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            {session ? (
              <Link
                href="/trips"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
              >
                View My Trips
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30 font-semibold text-lg shadow-2xl hover:scale-105 transform"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Features highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Plan Anywhere</h3>
              <p className="text-gray-300">Create detailed itineraries for any destination</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Stay Organized</h3>
              <p className="text-gray-300">Keep all your travel plans in one place</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Save Time</h3>
              <p className="text-gray-300">Quick access to all your trip details</p>
            </div>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}
