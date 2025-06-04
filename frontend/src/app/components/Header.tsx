import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#8761a7] w-full sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div className="relative h-32 w-32 md:h-40 md:w-40">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-md text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-4 md:space-x-6">
            <button className="text-white text-sm hover:text-gray-200">
              Sign in
            </button>
            <button className="text-white text-sm hover:text-gray-200">
              Create account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
