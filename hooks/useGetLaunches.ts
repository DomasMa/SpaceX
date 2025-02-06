import { useQuery } from '@tanstack/react-query'
import { differenceInHours, parseISO } from 'date-fns'
import { getLaunches, getRocketCost } from '@/lib/api'
import { getStoredChanges } from '@/lib/storage'
import { Launch, LaunchWithCost } from '@/types/launches'

export const useGetLaunches = () => {
  return useQuery<{ launches: LaunchWithCost[]; totalCost: number }>({
    queryKey: ['launches'],
    queryFn: async () => {
      const launches = await getLaunches()
      const storedChanges = getStoredChanges()

      launches.sort(
        (a: Launch, b: Launch) =>
          parseISO(b.launch_date_utc).getTime() - parseISO(a.launch_date_utc).getTime()
      )

      let totalCost = 0
      const launchesWithCost = await Promise.all(
        launches.map(async (launch: Launch) => {
          let rocketCost =
            storedChanges.costs[launch.rocket.rocket_id] ||
            (await getRocketCost(launch.rocket.rocket_id))

          totalCost += rocketCost

          const payload = launch.rocket.second_stage.payloads[0] || {
            payload_id: '',
            payload_type: 'Unknown',
          }

          const payloadType = storedChanges.payloadTypes[payload.payload_id] || payload.payload_type

          // Calculate the number of payloads whose type is 'Satellite'
          const satelliteCount = launch.rocket.second_stage.payloads.reduce((count, p) => {
            const type = storedChanges.payloadTypes[p.payload_id] || p.payload_type
            return count + (type === 'Satellite' ? 1 : 0)
          }, 0)

          const timeElapsed = Math.abs(
            differenceInHours(new Date(), parseISO(launch.launch_date_utc))
          )

          return {
            mission_name: launch.mission_name,
            flight_number: launch.flight_number,
            launch_date: parseISO(launch.launch_date_utc).toLocaleString(),
            satellite_count: satelliteCount,
            time_elapsed: Math.abs(timeElapsed),
            rocket_cost: rocketCost,
            rocket_id: launch.rocket.rocket_id,
            payload_id: payload.payload_id,
            payload_type: payloadType,
          }
        })
      )

      return {
        launches: launchesWithCost,
        totalCost,
      }
    },
  })
}
