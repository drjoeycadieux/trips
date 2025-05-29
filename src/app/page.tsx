import Image from "next/image";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Plan Your Next Adventure
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to TripPlanner, your personal travel companion. Create and
          organize your trips with ease, keeping all your travel plans in one
          place.
        </p>
        <div className="flex justify-center gap-4">
          {session ? (
            <Link
              href="/trips"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View My Trips
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-blue-500"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
