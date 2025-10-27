import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Trash2 } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  status: string;
  images: string[];
  owner_id: string;
}

const AdminPropertiesManager = ({ onUpdate }: { onUpdate: () => void }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive"
      });
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('properties')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: `Property ${status}`
      });
      fetchProperties();
      onUpdate();
    }
  };

  const deleteProperty = async (id: string) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Property deleted"
      });
      fetchProperties();
      onUpdate();
    }
  };

  if (loading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-xl font-semibold">{property.title}</h3>
                <Badge variant={property.status === 'approved' ? 'default' : property.status === 'pending' ? 'secondary' : 'destructive'}>
                  {property.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{property.city}</p>
              <p className="text-lg font-semibold text-primary mt-2">€{property.price}/month</p>
            </div>
            
            <div className="flex gap-2">
              {property.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    onClick={() => updateStatus(property.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateStatus(property.id, 'rejected')}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteProperty(property.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminPropertiesManager;
