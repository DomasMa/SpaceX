'use client'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useGetLaunches } from '@/hooks/useGetLaunches'
import LaunchCard from '@/components/launchCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LaunchCardSkeleton from '@/components/launchCard/skeleton'
import { launchesChannel, BroadcastMessage } from '@/lib/broadcast'
import { LaunchesQueryData } from '@/types/launches'

const LaunchesPage = () => {
  const { data, isLoading, error } = useGetLaunches()
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleMessage = (event: MessageEvent<BroadcastMessage>) => {
      if (event.data.type === 'COST_UPDATE') {
        const { rocketId, cost } = event.data
        queryClient.setQueryData<LaunchesQueryData>(['launches'], (currentData) => {
          if (!currentData) return currentData

          const updatedLaunches = currentData.launches.map((launch) =>
            launch.rocket_id === rocketId ? { ...launch, rocket_cost: cost } : launch
          )

          const updatedTotalCost = updatedLaunches.reduce(
            (sum, launch) => sum + launch.rocket_cost,
            0
          )

          return {
            launches: updatedLaunches,
            totalCost: updatedTotalCost,
          }
        })
      }

      if (event.data.type === 'PAYLOAD_UPDATE') {
        const { payloadId, payloadType } = event.data
        queryClient.setQueryData<LaunchesQueryData>(['launches'], (currentData) => {
          if (!currentData) return currentData

          const updatedLaunches = currentData.launches.map((launch) => {
            if (launch.payload_id === payloadId) {
              return {
                ...launch,
                payload_type: payloadType,
                satellite_count: payloadType === 'Satellite' ? 1 : 0,
              }
            }
            return launch
          })

          return {
            launches: updatedLaunches,
            totalCost: currentData.totalCost,
          }
        })
      }
    }

    launchesChannel.addEventListener('message', handleMessage)
    return () => {
      launchesChannel.removeEventListener('message', handleMessage)
    }
  }, [queryClient])

  if (isLoading) return <LaunchCardSkeleton />
  if (error) return window.alert('An error occurred: ' + error.message)
  if (!data) return null

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl text-center">SpaceX Launches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-center text-muted-foreground">
            Total Launch Cost: ${data.totalCost.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.launches.map((launch) => (
          //Cannot use flight_number as key because there's a mistake in the launch data and there are two launches with id=110
          <LaunchCard key={`${launch.flight_number}-${launch.mission_name}`} launch={launch} />
        ))}
      </div>
    </div>
  )
}

export default LaunchesPage
