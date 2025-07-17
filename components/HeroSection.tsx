import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Credit card in the front.
                <br />
                Home equity in the back.
              </h1>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-lg">7.49 – 14.99% Var. APR¹</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-lg">2% Unlimited Cash Back¹</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-lg">Up To $250,000 Limit</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-lg">Starting at $0 To Get A Card</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-lg">As Fast As 15 Minutes</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 max-w-md">
              <Input
                type="tel"
                placeholder="Mobile Number"
                className="h-12 text-lg"
              />
              <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 text-lg">
                Check your offer
              </Button>
              <Button variant="outline" className="w-full h-12 text-lg">
                Have an invite code?
              </Button>

              <p className="text-sm text-gray-600">
                Checking your offer will <strong>NOT</strong> affect your credit
                score.
              </p>

              <p className="text-xs text-gray-500 leading-relaxed">
                By providing your number, you consent to automated or manual
                marketing messages & to Aven's Terms of Service and Privacy
                Policy. Msg freq may vary. Msg&data rates may apply. Reply HELP
                for help or STOP to opt-out. Consent to marketing messages is
                not required for any purchase.
              </p>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-green-600 text-white hover:bg-green-600"
              >
                Excellent
              </Badge>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-green-600"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                4.9 out of 5 based on 5,053 reviews
              </span>
              <span className="text-sm text-green-600 font-semibold">
                Trustpilot
              </span>
            </div>
          </div>

          {/* Right Content - Credit Card Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-48 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl transform rotate-12">
                <div className="absolute top-6 left-6 text-white">
                  <div className="text-lg font-bold">Aven</div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="text-white text-sm opacity-80">VISA</div>
                </div>
              </div>
              <div className="w-80 h-48 bg-white rounded-2xl shadow-lg absolute -top-4 -left-4 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
