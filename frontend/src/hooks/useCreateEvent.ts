import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';

interface CreateEventParams {
  title: string;
  description: string;
  date: string | null;
  location: string | null;
  review: string;
  imageBytes: Uint8Array<ArrayBuffer>;
}

export function useCreateEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateEventParams) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      // Generate a unique ID for the event
      const id = `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      // Create ExternalBlob from bytes
      const imageBlob = ExternalBlob.fromBytes(params.imageBytes);

      await actor.createEvent(
        id,
        params.title,
        params.description,
        params.date,
        params.location,
        imageBlob,
        params.review
      );
    },
    onSuccess: () => {
      // Invalidate and refetch events query
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
