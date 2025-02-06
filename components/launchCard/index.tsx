'use client'

import React from 'react'
import { LaunchWithCost } from '@/types/launches'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUpdateLaunchCost } from '@/hooks/useUpdateLaunchCost'
import { useUpdatePayloadType } from '@/hooks/useUpdatePayloadType'
import CardRow from './cardRow'

interface LaunchCardProps {
  launch: LaunchWithCost
}

const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  const updateCost = useUpdateLaunchCost()
  const updatePayload = useUpdatePayloadType()

  const handleCostUpdate = () => {
    const newCost = launch.rocket_cost + 1000000
    updateCost.mutate({ rocketId: launch.rocket_id, cost: newCost })
  }

  const handlePayloadUpdate = () => {
    const newType = launch.payload_type === 'Satellite' ? 'Cargo' : 'Satellite'
    updatePayload.mutate({ payloadId: launch.payload_id, type: newType })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{launch.mission_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <CardRow label="Flight Number" value={launch.flight_number} />
          <CardRow label="Launch Date" value={launch.launch_date} />
          <CardRow label="Satellite Payloads" value={launch.satellite_count} />
          <CardRow label="Time Since Launch" value={`${launch.time_elapsed} hours`} />
          <CardRow
            label="Payload Type"
            value={launch.payload_type}
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={handlePayloadUpdate}
                disabled={updatePayload.isPending}
              >
                Change
              </Button>
            }
          />
          <CardRow
            label="Launch Cost"
            value={`$${launch.rocket_cost.toLocaleString()}`}
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={handleCostUpdate}
                disabled={updateCost.isPending}
              >
                +$1M
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default LaunchCard
