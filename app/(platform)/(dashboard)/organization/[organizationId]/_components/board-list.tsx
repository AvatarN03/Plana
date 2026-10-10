import { FormPopover } from '@/components/forms/form-popover';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';
import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Activity, ArrowRight, HelpCircle, LayoutGrid, Layers, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ActivityItem } from '@/components/activity-item';

const MAX_FREE_BOARDS = 5;

export const BoardList = async () => {
    const { orgId } = await auth();

    if (!orgId) {
        redirect('/select-org');
    }

    const [boards, recentLogs] = await Promise.all([
        db.board.findMany({
            where: {
                orgId,
            },
            include: {
                lists: {
                    select: {
                        _count: {
                            select: { cards: true },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        db.auditLog.findMany({
            where: {
                orgId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        }),
    ]);

    const remaining = Math.max(0, MAX_FREE_BOARDS - boards.length);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-sm bg-[var(--landing-orange-soft)] text-[var(--landing-orange)]">
                        <LayoutGrid className="w-4 h-4" />
                    </div>
                    <h2 className="font-semibold text-lg text-[var(--landing-text)]">
                        Your Boards
                    </h2>
                    <span className="text-xs font-mono text-[var(--landing-muted)] px-2 py-0.5 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)]">
                        {boards.length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {boards.map((board) => {
                    const listCount = board.lists.length;
                    const cardCount = board.lists.reduce((acc, list) => acc + list._count.cards, 0);

                    return (
                        <Link
                            key={board.id}
                            href={`/board/${board.id}`}
                            className="group relative aspect-video rounded-sm overflow-hidden border border-[var(--landing-line)] hover:border-[var(--landing-orange)] shadow-2xs transition-all flex flex-col justify-between p-3.5"
                        >
                            <div 
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                                style={{ backgroundImage: `url(${board.imageUrl})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 group-hover:from-black/90 transition-colors" />

                            <div className="relative z-10">
                                <h3 className="text-white font-semibold text-sm line-clamp-1 drop-shadow-xs">
                                    {board.title}
                                </h3>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-2">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/90 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
                                    <Layers className="w-3 h-3 text-[var(--landing-orange)]" />
                                    {listCount} {listCount === 1 ? "list" : "lists"} • {cardCount} {cardCount === 1 ? "card" : "cards"}
                                </span>
                                <span className="text-[11px] font-medium text-white/75 group-hover:text-white group-hover:translate-x-0.5 transition-all flex items-center gap-0.5">
                                    Open →
                                </span>
                            </div>
                        </Link>
                    );
                })}

                <FormPopover align="center" side="right">
                    <div
                        role="button"
                        className="aspect-video rounded-sm flex flex-col gap-y-2 bg-[var(--landing-panel)] hover:bg-[var(--landing-panel-strong)] border border-dashed border-[var(--landing-line)] hover:border-[var(--landing-orange)] w-full h-full relative justify-center transition items-center cursor-pointer p-4 text-center group"
                    >
                        <div className="w-8 h-8 rounded-sm bg-[var(--landing-panel-strong)] group-hover:bg-[var(--landing-orange-soft)] border border-[var(--landing-line)] group-hover:border-[var(--landing-orange)] shadow-2xs flex items-center justify-center transition-colors">
                            <Plus className="w-4 h-4 text-[var(--landing-orange)]" />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-xs font-semibold text-[var(--landing-text)]">Create a board</p>
                            <p className="text-[10px] text-[var(--landing-muted)] font-mono">{remaining} free slots left</p>
                        </div>
                        <Hint
                            sideOffSet={40}
                            description={`Free workspaces include up to ${MAX_FREE_BOARDS} active boards.`}
                        >
                            <HelpCircle className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 text-[var(--landing-muted)] hover:text-[var(--landing-text)] transition" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>

            {boards.length === 0 && (
                <div className="p-8 text-center rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)]">
                    <div className="w-10 h-10 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] flex items-center justify-center mx-auto mb-3 text-[var(--landing-orange)]">
                        <LayoutGrid className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--landing-text)]">No boards created yet</p>
                    <p className="text-xs text-[var(--landing-muted)] mt-1 max-w-sm mx-auto">
                        Launch your first workflow by clicking &quot;Create a board&quot; above or choose from our templates.
                    </p>
                </div>
            )}

            {recentLogs.length > 0 && (
                <div className="pt-6 border-t border-[var(--landing-line)] space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[var(--landing-orange)]" />
                            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--landing-muted)]">
                                Recent Workspace Activity
                            </h3>
                        </div>
                        <Link
                            href={`/organization/${orgId}/activity`}
                            className="text-xs font-medium text-[var(--landing-orange)] hover:underline inline-flex items-center gap-1"
                        >
                            View all
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4">
                        <ol className="space-y-3">
                            {recentLogs.map((log) => (
                                <ActivityItem key={log.id} data={log} />
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

BoardList.Skeleton = function BoardListSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-32 rounded-sm" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Skeleton className="aspect-video w-full rounded-sm border border-[var(--landing-line)]" />
                <Skeleton className="aspect-video w-full rounded-sm border border-[var(--landing-line)]" />
                <Skeleton className="aspect-video w-full rounded-sm border border-[var(--landing-line)]" />
                <Skeleton className="aspect-video w-full rounded-sm border border-[var(--landing-line)]" />
            </div>
        </div>
    );
};
