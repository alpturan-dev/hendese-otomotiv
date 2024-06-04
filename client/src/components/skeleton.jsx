import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-[200px] rounded-xl bg-slate-200" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[200px] bg-slate-200" />
            </div>
        </div>
    )
}
