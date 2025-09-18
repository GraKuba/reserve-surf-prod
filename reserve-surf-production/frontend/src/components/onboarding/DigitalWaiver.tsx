import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FileText, PenTool, Check, AlertCircle, Eraser, Eye } from 'lucide-react'
import type { WaiverData } from '@/types/onboarding'

interface DigitalWaiverProps {
  value?: WaiverData
  onChange: (data: WaiverData) => void
}

const WAIVER_CONTENT = `
ASSUMPTION OF RISK, WAIVER AND RELEASE OF LIABILITY

In consideration of being allowed to participate in surfing/kitesurfing lessons and related activities (the "Activities") provided by ReserveSurf and its instructors, I acknowledge, agree, and represent that:

1. ACKNOWLEDGMENT OF RISKS
I understand that participating in water sports activities involves inherent risks including, but not limited to:
- Drowning or near-drowning incidents
- Injuries from surfboards, kites, or other equipment
- Marine life encounters
- Weather-related hazards
- Physical exertion and fatigue
- Cuts, bruises, broken bones, or other injuries

2. ASSUMPTION OF RISK
I voluntarily assume full responsibility for any risks of loss, property damage, or personal injury that may be sustained by me as a result of participating in the Activities.

3. RELEASE AND WAIVER
I hereby release, waive, discharge, and covenant not to sue ReserveSurf, its owners, officers, employees, instructors, and agents from any and all liability, claims, demands, actions, and causes of action whatsoever arising out of or related to any loss, damage, or injury that may be sustained by me while participating in the Activities.

4. MEDICAL FITNESS
I attest that I am physically fit and have no medical conditions that would prevent my full participation in the Activities. I have disclosed any relevant medical conditions to ReserveSurf.

5. SWIMMING ABILITY
I confirm that I have accurately represented my swimming ability and understand that ocean conditions can be unpredictable and challenging.

6. EQUIPMENT USE
I agree to use all provided equipment responsibly and will immediately report any equipment issues to my instructor.

7. INSTRUCTION COMPLIANCE
I agree to follow all safety instructions and guidelines provided by ReserveSurf instructors and staff.

8. PHOTO/VIDEO RELEASE
I grant ReserveSurf permission to use photos or videos taken during the Activities for promotional purposes.

9. INDEMNIFICATION
I agree to indemnify and hold harmless ReserveSurf from any claims, actions, suits, procedures, costs, expenses, damages, and liabilities brought as a result of my involvement in the Activities.

10. SEVERABILITY
If any provision of this agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

BY SIGNING BELOW, I ACKNOWLEDGE THAT I HAVE READ AND UNDERSTOOD ALL OF THE TERMS OF THIS AGREEMENT AND THAT I AM VOLUNTARILY GIVING UP SUBSTANTIAL LEGAL RIGHTS.
`

export default function DigitalWaiver({ value = { agreed: false }, onChange }: DigitalWaiverProps) {
  const [agreed, setAgreed] = useState(value.agreed || false)
  const [signedName, setSignedName] = useState(value.signedName || '')
  const [isDrawing, setIsDrawing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasSignature, setHasSignature] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Set drawing styles
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Load existing signature if available
    if (value.signature) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        setHasSignature(true)
      }
      img.src = value.signature
    }
  }, [value.signature])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY

    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    saveSignature()
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    
    onChange({
      ...value,
      signature: undefined
    })
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const signature = canvas.toDataURL('image/png')
    
    onChange({
      ...value,
      signature,
      signedDate: new Date().toISOString()
    })
  }

  const handleAgree = (checked: boolean) => {
    setAgreed(checked)
    onChange({
      ...value,
      agreed: checked
    })
  }

  const handleNameChange = (name: string) => {
    setSignedName(name)
    onChange({
      ...value,
      signedName: name
    })
  }

  const isComplete = agreed && signedName && hasSignature

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Liability Waiver & Release</h2>
        <p className="text-muted-foreground">Please review and sign our safety agreement</p>
      </div>

      {/* Waiver Document */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Safety Agreement & Liability Waiver
          </CardTitle>
          <CardDescription>
            Please read this document carefully before signing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Document Preview */}
          <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/20">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {WAIVER_CONTENT}
            </pre>
          </ScrollArea>

          {/* View Full Document Button */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Full Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Full Waiver Document</DialogTitle>
                <DialogDescription>
                  Assumption of Risk, Waiver and Release of Liability
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh] w-full">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed p-4">
                  {WAIVER_CONTENT}
                </pre>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Agreement Checkbox */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={handleAgree}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="agree" className="cursor-pointer">
                I have read, understood, and agree to the terms
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you acknowledge that you have read the entire waiver, 
                understand its contents, and voluntarily agree to its terms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typed Name */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Name</CardTitle>
          <CardDescription>
            Please type your full legal name as it appears on official documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter your full legal name"
            value={signedName}
            onChange={(e) => handleNameChange(e.target.value)}
            className="font-serif text-lg"
          />
        </CardContent>
      </Card>

      {/* Electronic Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-primary" />
            Electronic Signature
          </CardTitle>
          <CardDescription>
            Please sign in the box below using your mouse or finger
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className={cn(
                "w-full h-40 border-2 rounded-md bg-white cursor-crosshair",
                "touch-none", // Prevent default touch behavior
                hasSignature ? "border-primary" : "border-dashed"
              )}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            {!hasSignature && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-muted-foreground/50 text-sm">Sign here</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={clearSignature}
              disabled={!hasSignature}
              className="flex-1"
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear Signature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Completion Status */}
      <Card className={cn(
        "border-2",
        isComplete ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-muted"
      )}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            {isComplete ? (
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
            )}
            <div className="space-y-2 flex-1">
              <p className={cn(
                "font-medium",
                isComplete ? "text-green-700 dark:text-green-400" : "text-muted-foreground"
              )}>
                {isComplete ? "Waiver Complete" : "Waiver Incomplete"}
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  {agreed ? (
                    <Badge variant="default" className="text-xs">✓ Agreed</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">Agreement required</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {signedName ? (
                    <Badge variant="default" className="text-xs">✓ Name: {signedName}</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">Name required</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {hasSignature ? (
                    <Badge variant="default" className="text-xs">✓ Signed</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">Signature required</Badge>
                  )}
                </div>
              </div>
              {isComplete && value.signedDate && (
                <p className="text-xs text-muted-foreground">
                  Signed on: {new Date(value.signedDate).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}