import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Waves, Wind, Check } from 'lucide-react'

interface SportSelectionProps {
  value?: 'surfing' | 'kitesurfing' | 'both'
  onChange: (value: 'surfing' | 'kitesurfing' | 'both') => void
}

export default function SportSelection({ value, onChange }: SportSelectionProps) {
  const options = [
    {
      id: 'surfing',
      title: 'Surfing',
      icon: <Waves className="w-12 h-12" />,
      description: 'Master the waves with traditional surfing',
      features: ['Board provided', 'Wetsuit included', 'Small groups'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'kitesurfing',
      title: 'Kitesurfing',
      icon: <Wind className="w-12 h-12" />,
      description: 'Harness the wind and ride with power',
      features: ['Kite & board provided', 'Safety gear', 'Wind conditions monitored'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'both',
      title: 'Both Sports',
      icon: (
        <div className="flex items-center gap-2">
          <Waves className="w-8 h-8" />
          <Wind className="w-8 h-8" />
        </div>
      ),
      description: 'Learn both surfing and kitesurfing',
      features: ['All equipment provided', 'Flexible scheduling', 'Multi-sport discount'],
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Your Adventure</h2>
        <p className="text-muted-foreground">What would you like to learn?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-1",
              value === option.id && "ring-2 ring-primary"
            )}
            onClick={() => onChange(option.id as 'surfing' | 'kitesurfing' | 'both')}
          >
            {/* Selected indicator */}
            {value === option.id && (
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-primary text-primary-foreground">
                  <Check className="w-3 h-3 mr-1" />
                  Selected
                </Badge>
              </div>
            )}

            {/* Gradient background */}
            <div
              className={cn(
                "absolute inset-0 opacity-10 bg-gradient-to-br",
                option.color
              )}
            />

            <CardContent className="relative p-6 space-y-4">
              <div className="flex justify-center text-primary">
                {option.icon}
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>

              <div className="space-y-2">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}