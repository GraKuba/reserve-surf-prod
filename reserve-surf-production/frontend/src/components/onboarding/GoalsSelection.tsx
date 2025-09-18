import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Target, Heart, Zap, Trophy, Users, Camera, Sparkles, TrendingUp } from 'lucide-react'

interface GoalsSelectionProps {
  value?: string[]
  onChange: (goals: string[]) => void
}

export default function GoalsSelection({ value = [], onChange }: GoalsSelectionProps) {
  const goals = [
    { id: 'fitness', label: 'Improve Fitness', icon: <Heart className="w-4 h-4" /> },
    { id: 'skills', label: 'Master New Skills', icon: <Target className="w-4 h-4" /> },
    { id: 'fun', label: 'Have Fun', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'competition', label: 'Compete', icon: <Trophy className="w-4 h-4" /> },
    { id: 'social', label: 'Meet People', icon: <Users className="w-4 h-4" /> },
    { id: 'travel', label: 'Surf Travel', icon: <Camera className="w-4 h-4" /> },
    { id: 'confidence', label: 'Build Confidence', icon: <Zap className="w-4 h-4" /> },
    { id: 'progression', label: 'Track Progress', icon: <TrendingUp className="w-4 h-4" /> },
  ]

  const toggleGoal = (goalId: string) => {
    const newGoals = value.includes(goalId)
      ? value.filter(g => g !== goalId)
      : [...value, goalId]
    onChange(newGoals)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">What Are Your Goals?</h2>
        <p className="text-muted-foreground">Select all that apply to personalize your journey</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {goals.map((goal) => (
              <Badge
                key={goal.id}
                variant={value.includes(goal.id) ? "default" : "outline"}
                className={cn(
                  "px-4 py-2 text-sm cursor-pointer transition-all duration-200",
                  "hover:-translate-y-1 hover:shadow-md",
                  value.includes(goal.id) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10"
                )}
                onClick={() => toggleGoal(goal.id)}
              >
                <span className="flex items-center gap-2">
                  {goal.icon}
                  {goal.label}
                </span>
              </Badge>
            ))}
          </div>

          {value.length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Selected Goals ({value.length}):</p>
              <div className="flex flex-wrap gap-2">
                {value.map(goalId => {
                  const goal = goals.find(g => g.id === goalId)
                  return goal ? (
                    <Badge key={goalId} variant="secondary" className="text-xs">
                      {goal.label}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}

          {value.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Please select at least one goal to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}