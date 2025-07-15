export default function BannerSkeleton() {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200 animate-pulse rounded-lg">
      <div className="w-20 h-20 bg-gray-300 rounded-full" />
    </div>
  );
}
