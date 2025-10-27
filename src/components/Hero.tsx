import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-rental.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Amsterdam Rental"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
              European Rental
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover exceptional rental properties in Amsterdam, Rotterdam, Utrecht, and throughout the Netherlands
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-[var(--shadow-card)] animate-slide-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter city or neighborhood"
                  className="pl-10 h-12 bg-background/50 border-border"
                />
              </div>
              <Button className="h-12 px-8 bg-gradient-accent hover:opacity-90 transition-all hover:scale-105">
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {[
              { label: "Properties", value: "500+" },
              { label: "Cities", value: "15+" },
              { label: "Happy Tenants", value: "2000+" },
              { label: "New Listings", value: "Daily" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
