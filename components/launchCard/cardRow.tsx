'use client'
import React from 'react'

interface CardRowProps {
  label: string
  value: string | number
  action?: React.ReactNode
}

const CardRow: React.FC<CardRowProps> = ({ label, value, action }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        {action}
      </div>
    </div>
  )
}

export default CardRow
