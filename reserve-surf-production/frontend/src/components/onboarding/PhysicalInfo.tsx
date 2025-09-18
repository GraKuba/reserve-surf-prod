import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Ruler, Weight, Footprints, Waves, Info } from 'lucide-react'
import type { PhysicalInfo as PhysicalInfoType } from '@/types/onboarding'

interface PhysicalInfoProps {
  value?: PhysicalInfoType
  onChange: (info: PhysicalInfoType) => void
}

export default function PhysicalInfo({ value = {}, onChange }: PhysicalInfoProps) {
  const [height, setHeight] = useState(value.height || 170)
  const [weight, setWeight] = useState(value.weight || 70)
  const [shoeSize, setShoeSize] = useState(value.shoeSize || '')
  const [wetsuitSize, setWetsuitSize] = useState(value.wetsuitSize || '')

  const handleHeightChange = (newHeight: number[]) => {
    setHeight(newHeight[0])
    onChange({ ...value, height: newHeight[0] })
  }

  const handleWeightChange = (newWeight: number[]) => {
    setWeight(newWeight[0])
    onChange({ ...value, weight: newWeight[0] })
  }

  const handleShoeSizeChange = (size: string) => {
    setShoeSize(size)
    onChange({ ...value, shoeSize: size })
  }

  const handleWetsuitSizeChange = (size: string) => {
    setWetsuitSize(size)
    onChange({ ...value, wetsuitSize: size })
  }

  const shoeSizes = [
    'US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 
    'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5',
    'US 11', 'US 11.5', 'US 12', 'US 12.5', 'US 13'
  ]

  const wetsuitSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  // Convert height to feet and inches for display
  const heightInFeet = Math.floor(height / 30.48)
  const heightInInches = Math.round((height % 30.48) / 2.54)
  const heightDisplay = `${heightInFeet}'${heightInInches}" (${height}cm)`

  // Convert weight to pounds for display
  const weightInLbs = Math.round(weight * 2.20462)
  const weightDisplay = `${weight}kg (${weightInLbs}lbs)`

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Physical Information</h2>
        <p className="text-muted-foreground">Help us prepare the right equipment for you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Height Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Ruler className="w-5 h-5 text-primary" />
              Height
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-2">
              <div className="text-3xl font-bold text-primary">{heightDisplay}</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>140cm</span>
                <span>220cm</span>
              </div>
              <Slider
                value={[height]}
                onValueChange={handleHeightChange}
                min={140}
                max={220}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Weight Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Weight className="w-5 h-5 text-primary" />
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-2">
              <div className="text-3xl font-bold text-primary">{weightDisplay}</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>40kg</span>
                <span>150kg</span>
              </div>
              <Slider
                value={[weight]}
                onValueChange={handleWeightChange}
                min={40}
                max={150}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Shoe Size Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Footprints className="w-5 h-5 text-primary" />
              Shoe Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={shoeSize} onValueChange={handleShoeSizeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your shoe size" />
              </SelectTrigger>
              <SelectContent>
                {shoeSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              For reef booties and fins
            </p>
          </CardContent>
        </Card>

        {/* Wetsuit Size Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Waves className="w-5 h-5 text-primary" />
              Wetsuit Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={wetsuitSize} onValueChange={handleWetsuitSizeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your wetsuit size" />
              </SelectTrigger>
              <SelectContent>
                {wetsuitSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              If unsure, we'll help you find the right fit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-muted/50">
        <CardContent className="flex items-start gap-3 pt-6">
          <Info className="w-5 h-5 text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Why we ask for this information</p>
            <p className="text-sm text-muted-foreground">
              This helps us prepare the right equipment for your lesson. 
              We have a range of sizes available and will make adjustments on the day if needed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Selection Summary */}
      {(height || weight || shoeSize || wetsuitSize) && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-3">Your Information:</p>
            <div className="flex flex-wrap gap-2">
              {height && (
                <Badge variant="secondary">
                  Height: {heightDisplay}
                </Badge>
              )}
              {weight && (
                <Badge variant="secondary">
                  Weight: {weightDisplay}
                </Badge>
              )}
              {shoeSize && (
                <Badge variant="secondary">
                  Shoe: {shoeSize}
                </Badge>
              )}
              {wetsuitSize && (
                <Badge variant="secondary">
                  Wetsuit: {wetsuitSize}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}