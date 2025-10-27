import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminSettingsManager = () => {
  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    contact_email: '',
    contact_phone: '',
    whatsapp_number: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('*');

    if (data) {
      const settingsObj: any = {};
      data.forEach(item => {
        const valueObj = item.setting_value as { value: string };
        settingsObj[item.setting_key] = valueObj.value;
      });
      setSettings(settingsObj);
    }
  };

  const handleSave = async (key: string, value: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: key,
        setting_value: { value },
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'setting_key'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Settings updated successfully"
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input
              id="hero_title"
              value={settings.hero_title}
              onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
            />
            <Button onClick={() => handleSave('hero_title', settings.hero_title)} className="mt-2" disabled={loading}>
              Save Title
            </Button>
          </div>
          <div>
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({...settings, hero_subtitle: e.target.value})}
            />
            <Button onClick={() => handleSave('hero_subtitle', settings.hero_subtitle)} className="mt-2" disabled={loading}>
              Save Subtitle
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
            />
            <Button onClick={() => handleSave('contact_email', settings.contact_email)} className="mt-2" disabled={loading}>
              Save Email
            </Button>
          </div>
          <div>
            <Label htmlFor="contact_phone">Contact Phone</Label>
            <Input
              id="contact_phone"
              value={settings.contact_phone}
              onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
            />
            <Button onClick={() => handleSave('contact_phone', settings.contact_phone)} className="mt-2" disabled={loading}>
              Save Phone
            </Button>
          </div>
          <div>
            <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
            <Input
              id="whatsapp_number"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({...settings, whatsapp_number: e.target.value})}
            />
            <Button onClick={() => handleSave('whatsapp_number', settings.whatsapp_number)} className="mt-2" disabled={loading}>
              Save WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsManager;
