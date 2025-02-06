import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const LaunchCardSkeleton: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-64 mx-auto" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-48 mx-auto" />
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(12)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LaunchCardSkeleton
