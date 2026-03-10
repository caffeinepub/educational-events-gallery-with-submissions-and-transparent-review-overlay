import { type Event } from '../../backend';
import { EventImage } from './EventImage';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-soft transition-shadow duration-300 animate-fade-in">
      <div className="relative aspect-[4/3] overflow-hidden">
        <EventImage image={event.image} alt={event.title} />
        
        {/* Transparent text overlay */}
        <div className="absolute inset-0 flex items-end p-6">
          <div className="w-full">
            <p 
              className="text-lg md:text-xl font-semibold leading-relaxed"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.9)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(1px)'
              }}
            >
              {event.review}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        
        <div className="flex flex-wrap gap-3 pt-2 text-xs text-muted-foreground">
          {event.date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
