import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Phone, User, Heart, AlertTriangle, Info, UserPlus, Shield, Check } from 'lucide-react'
import type { EmergencyContact as EmergencyContactType } from '@/types/onboarding'

interface EmergencyContactProps {
  value?: EmergencyContactType
  onChange: (data: EmergencyContactType) => void
  onSkip?: () => void
}

export default function EmergencyContact({ 
  value = {}, 
  onChange,
  onSkip 
}: EmergencyContactProps) {
  const [name, setName] = useState(value.name || '')
  const [phone, setPhone] = useState(value.phone || '')
  const [relationship, setRelationship] = useState(value.relationship || '')
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const [skipConfirmed, setSkipConfirmed] = useState(false)

  const relationships = [
    'Parent',
    'Spouse',
    'Sibling',
    'Child',
    'Friend',
    'Partner',
    'Relative',
    'Guardian',
    'Other'
  ]

  const handleNameChange = (newName: string) => {
    setName(newName)
    onChange({ ...value, name: newName })
  }

  const handlePhoneChange = (newPhone: string) => {
    // Format phone number as user types
    const cleaned = newPhone.replace(/\D/g, '')
    let formatted = cleaned
    
    if (cleaned.length >= 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    } else if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    }
    
    setPhone(formatted)
    onChange({ ...value, phone: formatted })
  }

  const handleRelationshipChange = (newRelationship: string) => {
    setRelationship(newRelationship)
    onChange({ ...value, relationship: newRelationship })
  }

  const handleSkip = () => {
    if (!skipConfirmed) {
      setShowSkipWarning(true)
      return
    }
    
    if (onSkip) {
      onSkip()
    }
  }

  const isComplete = name && phone && relationship
  const hasPartialData = name || phone || relationship

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Emergency Contact</h2>
        <p className="text-muted-foreground">Who should we contact in case of emergency?</p>
      </div>

      {/* Why We Need This Info */}
      <Alert className="border-primary/20 bg-primary/5">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>Your Safety is Our Priority</AlertTitle>
        <AlertDescription>
          This information is only used in emergency situations and is kept strictly confidential. 
          We recommend providing a contact who can be reached during your lesson time.
        </AlertDescription>
      </Alert>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Emergency Contact Details
          </CardTitle>
          <CardDescription>
            Please provide someone we can contact if needed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Contact Name
            </Label>
            <Input
              id="contact-name"
              placeholder="e.g., Jane Doe"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={cn(
                name && "border-primary"
              )}
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="555-123-4567"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              maxLength={12}
              className={cn(
                phone && "border-primary"
              )}
            />
            <p className="text-xs text-muted-foreground">
              Include country code for international numbers
            </p>
          </div>

          {/* Relationship Field */}
          <div className="space-y-2">
            <Label htmlFor="relationship" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Relationship
            </Label>
            <Select value={relationship} onValueChange={handleRelationshipChange}>
              <SelectTrigger 
                id="relationship"
                className={cn(
                  relationship && "border-primary"
                )}
              >
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationships.map((rel) => (
                  <SelectItem key={rel} value={rel.toLowerCase()}>
                    {rel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Additional Emergency Contacts (Optional) */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Additional Contacts (Optional)</CardTitle>
          <CardDescription>
            You can add more emergency contacts after completing your booking
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Completion Status */}
      <Card className={cn(
        "border-2 transition-colors",
        isComplete ? "border-green-500 bg-green-50 dark:bg-green-950/20" : 
        hasPartialData ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" : 
        "border-muted"
      )}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            {isComplete ? (
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
            ) : hasPartialData ? (
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
            )}
            <div className="space-y-2 flex-1">
              <p className={cn(
                "font-medium",
                isComplete ? "text-green-700 dark:text-green-400" : 
                hasPartialData ? "text-yellow-700 dark:text-yellow-400" :
                "text-muted-foreground"
              )}>
                {isComplete ? "Emergency Contact Complete" : 
                 hasPartialData ? "Emergency Contact Incomplete" :
                 "No Emergency Contact Provided"}
              </p>
              
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                {name ? (
                  <Badge variant="default" className="text-xs">
                    <User className="w-3 h-3 mr-1" />
                    {name}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Name required</Badge>
                )}
                
                {phone ? (
                  <Badge variant="default" className="text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    {phone}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Phone required</Badge>
                )}
                
                {relationship ? (
                  <Badge variant="default" className="text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    {relationship}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Relationship required</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skip Warning */}
      {showSkipWarning && !isComplete && (
        <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle>Skip Emergency Contact?</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>
              We strongly recommend providing an emergency contact for your safety. 
              This information is only used in case of emergency.
            </p>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="skip-confirm"
                checked={skipConfirmed}
                onCheckedChange={(checked) => setSkipConfirmed(checked as boolean)}
              />
              <Label htmlFor="skip-confirm" className="cursor-pointer text-sm">
                I understand and want to skip this step
              </Label>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowSkipWarning(false)
                  setSkipConfirmed(false)
                }}
              >
                Go Back
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleSkip}
                disabled={!skipConfirmed}
              >
                Skip Anyway
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Skip Option (if not complete) */}
      {!isComplete && !showSkipWarning && onSkip && (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setShowSkipWarning(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip this step
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            You can add emergency contacts later
          </p>
        </div>
      )}

      {/* Privacy Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>🔒 Your emergency contact information is encrypted and stored securely.</p>
        <p>We will only use this information in case of an emergency.</p>
      </div>
    </div>
  )
}