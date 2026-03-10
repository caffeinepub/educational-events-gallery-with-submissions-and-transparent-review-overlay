import { SubmitEventForm } from '../components/events/SubmitEventForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SubmitEventPageProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function SubmitEventPage({ onSuccess, onCancel }: SubmitEventPageProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Submit an Event</CardTitle>
            <CardDescription>
              Share an educational or useful event with the community. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubmitEventForm onSuccess={onSuccess} onCancel={onCancel} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
