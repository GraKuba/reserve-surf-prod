import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Baby, User, Trophy, Medal } from 'lucide-react'

interface SkillLevelProps {
  value?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  onChange: (value: 'beginner' | 'intermediate' | 'advanced' | 'expert') => void
}

export default function SkillLevel({ value, onChange }: SkillLevelProps) {
  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      icon: <Baby className="w-8 h-8" />,
      description: "I've never tried this before",
      details: [
        'No prior experience',
        'Learn basics and safety',
        'Focus on fundamentals',
        'Patient, detailed instruction'
      ],
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      icon: <User className="w-8 h-8" />,
      description: "I have some experience",
      details: [
        'Can handle basic conditions',
        'Ready for new techniques',
        'Building consistency',
        'Expanding comfort zone'
      ],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      icon: <Trophy className="w-8 h-8" />,
      description: "I'm comfortable and confident",
      details: [
        'Strong technical skills',
        'Looking for refinement',
        'Ready for challenges',
        'Style development'
      ],
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      id: 'expert',
      title: 'Expert',
      icon: <Medal className="w-8 h-8" />,
      description: "I'm highly experienced",
      details: [
        'Master techniques',
        'Competition preparation',
        'Advanced maneuvers',
        'Performance coaching'
      ],
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">What's Your Skill Level?</h2>
        <p className="text-muted-foreground">This helps us match you with the right instructor and lesson plan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {levels.map((level) => (
          <Card
            key={level.id}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-1",
              value === level.id && "ring-2 ring-primary"
            )}
            onClick={() => onChange(level.id as 'beginner' | 'intermediate' | 'advanced' | 'expert')}
          >
            <div className={cn(
              "absolute top-0 left-0 right-0 h-2",
              level.color
            )} />

            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-lg text-white",
                  level.color
                )}>
                  {level.icon}
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold">{level.title}</h3>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                  
                  <div className="pt-2 space-y-1">
                    {level.details.map((detail, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}