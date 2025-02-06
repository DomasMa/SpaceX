import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLaunchCost } from '@/lib/api'
import { launchesChannel } from '@/lib/broadcast'
import { storeChange } from '@/lib/storage'
import { LaunchesQueryData } from '@/types/launches'

export const useUpdateLaunchCost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLaunchCost,
    onMutate: async ({ rocketId, cost }) => {
      await queryClient.cancelQueries({ queryKey: ['launches'] })
      const previousData = queryClient.getQueryData<LaunchesQueryData>(['launches'])

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

      //save to localStorage.
      storeChange('costs', rocketId, cost)

      // Broadcast the cost update to other tabs
      launchesChannel.postMessage({
        type: 'COST_UPDATE',
        rocketId,
        cost,
      })

      return { previousData }
    },
    onError: (error, variables: { rocketId: string; cost: number }, context) => {
      if (confirm('Failed to update cost. Do you want to revert the changes?')) {
        if (context?.previousData) {
          queryClient.setQueryData<LaunchesQueryData>(['launches'], context.previousData)
          const previousLaunch = context.previousData.launches.find(
            (launch) => launch.rocket_id === variables.rocketId
          )
          const previousCost = previousLaunch?.rocket_cost

          if (previousCost !== undefined) {
            launchesChannel.postMessage({
              type: 'COST_UPDATE',
              rocketId: variables.rocketId,
              cost: previousCost,
            })
          }
        }
      }
    },
  })
}
