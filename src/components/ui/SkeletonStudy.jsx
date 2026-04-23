const SkeletonStudy = () => {
  return (
    <div class="mx-auto w-full h-full max-w-sm rounded-xl border border-white/5 bg-[#141b2b] p-8">
      <div class="flex animate-pulse space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 rounded bg-[#1c253a]"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 rounded bg-[#1c253a]"></div>
              <div class="col-span-1 h-2 rounded bg-[#1c253a]"></div>
            </div>
            <div class="h-2 rounded bg-[#1c253a]"></div>
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 rounded bg-[#1c253a]"></div>
              <div class="col-span-1 h-2 rounded bg-[#1c253a]"></div>
            </div>
            <div class="h-2 rounded bg-[#1c253a]"></div>
            <div class="h-2 rounded bg-[#1c253a]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonStudy;
