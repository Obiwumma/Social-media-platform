import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
          Social<span className="text-gray-900">App</span>
        </Link>

        {/* YOUR CHALLENGE: Navigation Links */}
        <div className="flex gap-6 font-medium text-gray-600">
          {/* Write a Next.js <Link> here that points to "/" and says "Home" */}
          <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
          Home
        </Link>
          {/* Write a Next.js <Link> here that points to "/profile" and says "Profile" */}
          <Link href="/profile" className="text-xl font-bold text-blue-600 tracking-tight">
          Profile
        </Link>
        </div>

      </div>
    </nav>
  );
}