import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black">Aven</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Card
          </a>
          <a
            href="/how-it-works"
            className="text-gray-700 hover:text-black transition-colors"
          >
            How It Works
          </a>
          <a
            href="/reviews"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Reviews
          </a>
          <a
            href="/support"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Support
          </a>
          <a
            href="/app"
            className="text-gray-700 hover:text-black transition-colors"
          >
            App
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Who We Are
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-700 hover:text-black">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
