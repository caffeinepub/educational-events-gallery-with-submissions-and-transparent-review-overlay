import { useEvents } from '../hooks/useEvents';
import { EventCard } from '../components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EventsGalleryPageProps {
  onSubmitClick: () => void;
}

export function EventsGalleryPage({ onSubmitClick }: EventsGalleryPageProps) {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load events. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const isEmpty = !events || events.length === 0;

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Event Gallery</h2>
            <p className="text-muted-foreground mt-1">
              Discover educational and useful events from our community
            </p>
          </div>
          <Button onClick={onSubmitClick} className="gap-2 w-full md:w-auto">
            <Plus className="h-4 w-4" />
            Submit Event
          </Button>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4 py-12">
            <div className="rounded-full bg-muted p-6">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No events yet</h3>
              <p className="text-muted-foreground max-w-md">
                Be the first to submit an educational event and inspire others in the community.
              </p>
            </div>
            <Button onClick={onSubmitClick} className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Submit First Event
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
