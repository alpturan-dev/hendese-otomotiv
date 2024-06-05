import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-[200px] rounded-xl bg-slate-200" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[200px] bg-slate-200" />
            </div>
        </div>
    )
}

export const ProductPageSkeleton = () => {
    return (
        <div className="container py-6 px-auto w-full lg:w-3/4 max-w-[1000px]">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
                <div className="grid gap-4">
                    <Skeleton className="h-[500px] w-[500px] bg-slate-200" />
                </div>
                <div className="grid gap-4 md:gap-10 items-start pl-20">
                    <div className="grid gap-4">
                        <Skeleton className="h-[300px] w-[300px] bg-slate-200" />
                    </div>
                    <div className="grid gap-4">
                        <Skeleton className="h-[100px] w-[300px] bg-slate-200" />
                    </div>
                </div>
            </div>
        </div>
    )
}