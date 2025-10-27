import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const handleWhatsAppContact = () => {
    const message = `Hi, I'm interested in ${property.title} at ${property.location}`;
    const phoneNumber = "8801778288017";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)]">
      <Link to={`/property/${property.id}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            {property.propertyType}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-6 space-y-4">
        <div>
          <Link to={`/property/${property.id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-y border-border">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-primary" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-primary" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-4 h-4 text-primary" />
              {property.area}m²
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">
              €{property.price}
            </div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          <Button
            onClick={handleWhatsAppContact}
            className="bg-gradient-accent hover:opacity-90 transition-all"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
