import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Shield, Clock, MessageCircle, Home, Users, Heart, KeyRound } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <Home className="absolute top-20 left-10 w-16 h-16 text-primary animate-float" />
        <Building2 className="absolute top-40 right-20 w-20 h-20 text-accent animate-float" style={{ animationDelay: '1s' }} />
        <Users className="absolute bottom-60 left-1/4 w-14 h-14 text-secondary animate-float" style={{ animationDelay: '2s' }} />
        <Heart className="absolute top-1/3 right-1/3 w-12 h-12 text-primary animate-float" style={{ animationDelay: '1.5s' }} />
        <KeyRound className="absolute bottom-40 right-1/4 w-16 h-16 text-accent animate-float" style={{ animationDelay: '0.5s' }} />
        <Home className="absolute top-2/3 left-1/3 w-18 h-18 text-secondary animate-float" style={{ animationDelay: '2.5s' }} />
        <Building2 className="absolute bottom-20 left-20 w-14 h-14 text-primary animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <Header />
      <Hero />

      {/* Properties Section */}
      <section id="properties" className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <KeyRound className="absolute top-10 right-10 w-12 h-12 text-accent animate-float" />
          <Heart className="absolute bottom-20 left-10 w-16 h-16 text-primary animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selection of premium rental properties across the Netherlands
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {properties.map((property, idx) => (
              <div key={property.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-gradient-accent hover:opacity-90 transition-all px-8 py-6 text-lg">
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-card/30 backdrop-blur-sm relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Users className="absolute top-10 left-10 w-14 h-14 text-secondary animate-float" />
          <Home className="absolute bottom-10 right-10 w-16 h-16 text-accent animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground">
              We make finding your perfect rental simple and secure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Premium Properties",
                description: "Carefully vetted properties in prime locations across the Netherlands"
              },
              {
                icon: Shield,
                title: "Secure Process",
                description: "Safe and transparent rental process with verified landlords"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Our team is always available to help you with any questions"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Heart className="absolute top-20 left-1/4 w-12 h-12 text-primary animate-float" />
          <Building2 className="absolute bottom-20 right-1/4 w-14 h-14 text-secondary animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-muted-foreground">
                Have questions? We're here to help
              </p>
            </div>

            <div className="bg-gradient-card border border-border rounded-2xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Your Name" className="h-12 bg-background/50" />
                <Input placeholder="Your Email" type="email" className="h-12 bg-background/50" />
              </div>
              <Input placeholder="Subject" className="h-12 bg-background/50" />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 h-12 bg-gradient-accent hover:opacity-90">
                  Send Message
                </Button>
                <Button
                  className="flex-1 h-12 bg-secondary hover:opacity-90"
                  onClick={() => {
                    window.open("https://wa.me/8801778288017", "_blank");
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-2">© 2025 Rentals in Europe. All rights reserved.</p>
            <p>Contact: +880 1778-288017</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
