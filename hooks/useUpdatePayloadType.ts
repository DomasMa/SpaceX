import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePayloadType } from '@/lib/api'
import { launchesChannel } from '@/lib/broadcast'
import { storeChange } from '@/lib/storage'
import { LaunchesQueryData } from '@/types/launches'

interface UpdatePayloadParams {
  payloadId: string
  type: string
}

export const useUpdatePayloadType = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayloadParams, { previousData?: LaunchesQueryData }>({
    mutationFn: updatePayloadType,
    onMutate: async ({ payloadId, type }) => {
      await queryClient.cancelQueries({ queryKey: ['launches'] })
      const previousData = queryClient.getQueryData<LaunchesQueryData>(['launches'])

      queryClient.setQueryData<LaunchesQueryData>(['launches'], (currentData) => {
        if (!currentData) return currentData

        const updatedLaunches = currentData.launches.map((launch) => {
          if (launch.payload_id === payloadId) {
            return {
              ...launch,
              payload_type: type,
              satellite_count: type === 'Satellite' ? 1 : 0,
            }
          }
          return launch
        })

        return {
          launches: updatedLaunches,
          totalCost: currentData.totalCost,
        }
      })

      //save to localStorage.
      storeChange('payloadTypes', payloadId, type)

      // Broadcast the payload update to other tabs.
      launchesChannel.postMessage({
        type: 'PAYLOAD_UPDATE',
        payloadId,
        payloadType: type,
      })

      return { previousData }
    },
    onError: (error, variables, context) => {
      if (confirm('Failed to update payload type. Do you want to revert the changes?')) {
        if (context?.previousData) {
          queryClient.setQueryData(['launches'], context.previousData)
          const previousLaunch = context.previousData.launches.find(
            (launch) => launch.payload_id === variables.payloadId
          )
          const previousType = previousLaunch?.payload_type

          if (previousType !== undefined) {
            launchesChannel.postMessage({
              type: 'PAYLOAD_UPDATE',
              payloadId: variables.payloadId,
              payloadType: previousType,
            })
          }
        }
      }
    },
  })
}
