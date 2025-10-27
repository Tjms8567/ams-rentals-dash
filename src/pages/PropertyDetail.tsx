import { useParams, Link } from "react-router-dom";
import { properties } from "@/data/properties";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  ArrowLeft,
  MessageCircle,
  Check,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState } from "react";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Property not found</h1>
            <Link to="/">
              <Button className="bg-gradient-accent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    const message = `Hi, I'm interested in ${property.title} at ${property.location}. I'd like to book from ${dateRange.from?.toLocaleDateString()} to ${dateRange.to?.toLocaleDateString()}`;
    const phoneNumber = "8801778288017";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-lg px-4 py-2">
                {property.propertyType}
              </Badge>
            </div>

            {/* Property Info */}
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground text-lg">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center gap-8 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <Bed className="w-6 h-6 text-primary" />
                    <span className="text-lg">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-6 h-6 text-primary" />
                    <span className="text-lg">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-6 h-6 text-primary" />
                    <span className="text-lg">{property.area}m²</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">Available From</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    {new Date(property.availableFrom).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="text-center pb-6 border-b border-border">
                  <div className="text-5xl font-bold text-primary mb-2">
                    €{property.price}
                  </div>
                  <div className="text-muted-foreground">per month</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Rental Period</h3>
                  <div className="bg-background/50 rounded-lg p-4">
                    <Calendar
                      mode="range"
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) =>
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        })
                      }
                      className="rounded-md"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleWhatsAppContact}
                  className="w-full h-14 text-lg bg-gradient-accent hover:opacity-90 transition-all"
                  disabled={!dateRange.from || !dateRange.to}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact via WhatsApp
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Contact us on WhatsApp</p>
                  <p className="font-semibold text-primary">+880 1778-288017</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
