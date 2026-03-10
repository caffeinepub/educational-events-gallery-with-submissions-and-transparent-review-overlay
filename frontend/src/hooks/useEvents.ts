import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type Event } from '../backend';

export function useEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      if (!actor) return [];
      const events = await actor.listEvents();
      // Sort by createdAt descending (newest first)
      return events.sort((a, b) => Number(b.createdAt - a.createdAt));
    },
    enabled: !!actor && !isFetching,
  });
}
