import { Separator } from '@/components/ui/separator';
import { Info } from './_components/Info';
import { BoardList } from './_components/board-list';
import { Suspense } from 'react';

const Page = async () => {
  return (
    <div className="w-full pb-16 space-y-6">
      <Info />
      <Separator className="bg-[var(--landing-line)]" />
      <div>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;