import { Skeleton } from '@/components/ui/skeleton';

export const FormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Form fields */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
      ))}

      {/* Submit button */}
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
};

export const QuizStepSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Question */}
      <Skeleton className="h-8 w-3/4 mx-auto" />

      {/* Options */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};