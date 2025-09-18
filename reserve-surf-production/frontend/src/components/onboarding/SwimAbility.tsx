import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Waves, AlertTriangle, Shield, Heart, Info, Star } from 'lucide-react'

interface SwimAbilityProps {
  swimLevel?: number
  medicalConditions?: string[]
  specialRequirements?: string
  onChange: (data: {
    swimAbility?: number
    medicalConditions?: string[]
    specialRequirements?: string
  }) => void
}

export default function SwimAbility({ 
  swimLevel = 0, 
  medicalConditions = [], 
  specialRequirements = '',
  onChange 
}: SwimAbilityProps) {
  const [selectedLevel, setSelectedLevel] = useState(swimLevel)
  const [selectedConditions, setSelectedConditions] = useState<string[]>(medicalConditions)
  const [requirements, setRequirements] = useState(specialRequirements)

  const swimLevels = [
    {
      level: 1,
      title: "Non-swimmer",
      description: "I cannot swim or have very limited swimming ability",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-red-500 to-orange-500",
      recommendation: "We'll provide extra flotation and stay in shallow water"
    },
    {
      level: 2,
      title: "Basic",
      description: "I can float and do basic strokes in a pool",
      icon: <Waves className="w-6 h-6" />,
      color: "from-orange-500 to-yellow-500",
      recommendation: "We'll focus on building water confidence"
    },
    {
      level: 3,
      title: "Comfortable",
      description: "I can swim confidently in a pool for 10+ minutes",
      icon: <Waves className="w-6 h-6" />,
      color: "from-yellow-500 to-green-500",
      recommendation: "Good foundation for ocean activities"
    },
    {
      level: 4,
      title: "Strong",
      description: "I'm comfortable swimming in open water and waves",
      icon: <Shield className="w-6 h-6" />,
      color: "from-green-500 to-blue-500",
      recommendation: "Ready for most ocean conditions"
    },
    {
      level: 5,
      title: "Expert",
      description: "I'm a strong ocean swimmer with experience in surf",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500",
      recommendation: "Can handle challenging conditions"
    }
  ]

  const medicalOptions = [
    "Asthma",
    "Heart condition",
    "Epilepsy",
    "Diabetes",
    "Recent surgery",
    "Back/neck problems",
    "Ear problems",
    "Pregnancy",
    "Anxiety/panic disorders",
    "None of the above"
  ]

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level)
    onChange({ 
      swimAbility: level, 
      medicalConditions: selectedConditions,
      specialRequirements: requirements
    })
  }

  const handleConditionToggle = (condition: string) => {
    let newConditions: string[]
    
    if (condition === "None of the above") {
      newConditions = selectedConditions.includes(condition) ? [] : ["None of the above"]
    } else {
      newConditions = selectedConditions.includes(condition)
        ? selectedConditions.filter(c => c !== condition)
        : [...selectedConditions.filter(c => c !== "None of the above"), condition]
    }
    
    setSelectedConditions(newConditions)
    onChange({ 
      swimAbility: selectedLevel,
      medicalConditions: newConditions,
      specialRequirements: requirements
    })
  }

  const handleRequirementsChange = (value: string) => {
    setRequirements(value)
    onChange({ 
      swimAbility: selectedLevel,
      medicalConditions: selectedConditions,
      specialRequirements: value
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Swimming Ability & Health</h2>
        <p className="text-muted-foreground">Help us ensure your safety and comfort in the water</p>
      </div>

      {/* Swimming Level Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">How would you rate your swimming ability?</Label>
        <div className="space-y-3">
          {swimLevels.map((level) => (
            <Card
              key={level.level}
              className={cn(
                "relative overflow-hidden cursor-pointer transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-1",
                selectedLevel === level.level && "ring-2 ring-primary"
              )}
              onClick={() => handleLevelSelect(level.level)}
            >
              <div className={cn(
                "absolute inset-0 opacity-10 bg-gradient-to-r",
                level.color
              )} />
              
              <CardContent className="relative p-4">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-lg text-white bg-gradient-to-br",
                    level.color
                  )}>
                    {level.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{level.title}</h3>
                      {selectedLevel === level.level && (
                        <Badge className="bg-primary text-primary-foreground">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                    <p className="text-xs text-primary mt-2">{level.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Medical Considerations
          </CardTitle>
          <CardDescription>
            Please select any conditions that apply (this information is kept confidential)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {medicalOptions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={selectedConditions.includes(condition)}
                  onCheckedChange={() => handleConditionToggle(condition)}
                  disabled={
                    condition !== "None of the above" && 
                    selectedConditions.includes("None of the above")
                  }
                />
                <Label
                  htmlFor={condition}
                  className="text-sm font-normal cursor-pointer"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requirements or Concerns</CardTitle>
          <CardDescription>
            Anything else we should know to make your experience better?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="E.g., fear of deep water, recent injuries, dietary restrictions for snacks, etc."
            value={requirements}
            onChange={(e) => handleRequirementsChange(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Safety Info */}
      <Card className="bg-muted/50 border-primary/20">
        <CardContent className="flex items-start gap-3 pt-6">
          <Info className="w-5 h-5 text-primary mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Safety is Our Priority</p>
            <p className="text-sm text-muted-foreground">
              All our instructors are certified in water safety and first aid. 
              We'll adapt the lesson to your comfort level and provide appropriate safety equipment. 
              If you have any medical conditions, we may ask for a doctor's clearance before your lesson.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {(selectedLevel > 0 || selectedConditions.length > 0 || requirements) && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-3">Your Information Summary:</p>
            <div className="space-y-2">
              {selectedLevel > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    Swimming Level: {swimLevels[selectedLevel - 1].title}
                  </Badge>
                </div>
              )}
              {selectedConditions.length > 0 && selectedConditions[0] !== "None of the above" && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Medical:</span>
                  {selectedConditions.map(condition => (
                    <Badge key={condition} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              )}
              {requirements && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Special notes: </span>
                  <span className="italic">{requirements}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}