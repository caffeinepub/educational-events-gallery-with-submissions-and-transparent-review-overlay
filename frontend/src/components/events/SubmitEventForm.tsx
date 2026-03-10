import { useState } from 'react';
import { useCreateEvent } from '../../hooks/useCreateEvent';
import { validateImageFile, readImageAsBytes } from '../../lib/imageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';

interface SubmitEventFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  description: string;
  date: string;
  location: string;
  review: string;
  image: File | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  review?: string;
  image?: string;
}

export function SubmitEventForm({ onSuccess, onCancel }: SubmitEventFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    location: '',
    review: '',
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { mutate: createEvent, isPending, isSuccess, error: mutationError } = useCreateEvent();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, image: validation.error }));
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: undefined }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.review.trim()) {
      newErrors.review = 'Review is required';
    }

    if (!formData.image) {
      newErrors.image = 'Event image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const imageBytes = await readImageAsBytes(formData.image!, (progress) => {
        setUploadProgress(progress);
      });

      createEvent(
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          date: formData.date.trim() || null,
          location: formData.location.trim() || null,
          review: formData.review.trim(),
          imageBytes,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              onSuccess();
            }, 1500);
          },
        }
      );
    } catch (error) {
      setErrors({ image: 'Failed to process image. Please try again.' });
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="rounded-full bg-primary/10 p-4">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Event Submitted Successfully!</h3>
          <p className="text-muted-foreground">
            Your event has been added to the gallery.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mutationError && (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to submit event. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">
          Event Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Web Development Workshop"
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe the event and what attendees will learn..."
          rows={4}
          disabled={isPending}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date (Optional)</Label>
          <Input
            id="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            placeholder="e.g., March 15, 2026"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g., Community Center"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">
          Review <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="review"
          value={formData.review}
          onChange={(e) => handleInputChange('review', e.target.value)}
          placeholder="Share your thoughts about this event..."
          rows={3}
          disabled={isPending}
        />
        <p className="text-xs text-muted-foreground">
          This text will appear as a transparent overlay on the event photo
        </p>
        {errors.review && (
          <p className="text-sm text-destructive">{errors.review}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">
          Event Image <span className="text-destructive">*</span>
        </Label>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={isPending}
              className="cursor-pointer"
            />
          </div>
          {imagePreview && (
            <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {errors.image && (
            <p className="text-sm text-destructive">{errors.image}</p>
          )}
        </div>
      </div>

      {isPending && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="flex-1 gap-2">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Submit Event
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
