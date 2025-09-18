import React, { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarSkeleton } from '@/components/onboarding/skeletons/CalendarSkeleton'
import { cn } from '@/lib/utils'
import { format, addDays, isBefore, isAfter, startOfToday } from 'date-fns'
import { Clock, Users, MapPin, AlertCircle } from 'lucide-react'
import { useOnboardingBooking } from '@/store/onboarding/onboardingStore'
import type { Lesson } from '@/types/onboarding'

interface TimeSlot {
  time: string
  spotsAvailable: number
  totalSpots: number
  price?: number
}

interface BookingCalendarProps {
  lesson: Lesson
  onConfirm: () => void
  onBack?: () => void
}

export function BookingCalendar({ lesson, onConfirm, onBack }: BookingCalendarProps) {
  const { booking, updateBooking } = useOnboardingBooking()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    booking.date ? new Date(booking.date) : undefined
  )
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(booking.timeSlot)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)

  // Fetch available time slots for selected date
  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots(selectedDate)
    }
  }, [selectedDate])

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const fetchTimeSlots = async (date: Date) => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // In production, this would fetch from API
      // For now, using mock data from lesson availability
      const dateString = format(date, 'yyyy-MM-dd')
      const availability = lesson.availability?.find(a => a.date === dateString)
      
      if (availability) {
        setAvailableTimeSlots(availability.timeSlots)
      } else {
        // Generate default time slots for demo
        setAvailableTimeSlots(generateDefaultTimeSlots())
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error)
      setAvailableTimeSlots([])
    } finally {
      setLoading(false)
    }
  }

  const generateDefaultTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const times = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']
    
    times.forEach(time => {
      const spotsAvailable = Math.floor(Math.random() * 5) + 1
      slots.push({
        time,
        spotsAvailable,
        totalSpots: lesson.groupSize || 6,
        price: lesson.price
      })
    })
    
    return slots
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot(undefined) // Reset time slot when date changes
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    const slot = availableTimeSlots.find(s => s.time === timeSlot)
    
    if (selectedDate && slot) {
      updateBooking({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        instructorId: lesson.instructor.id,
        instructorName: lesson.instructor.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: timeSlot,
        duration: lesson.duration,
        price: slot.price || lesson.price,
        location: lesson.location,
        equipmentIncluded: lesson.equipmentIncluded,
        groupSize: lesson.groupSize,
        spotsAvailable: slot.spotsAvailable
      })
    }
  }

  const handleConfirm = async () => {
    if (selectedDate && selectedTimeSlot) {
      setIsConfirming(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      onConfirm()
    }
  }

  // Disable dates before today and after 3 months
  const disabledDays = (date: Date) => {
    return isBefore(date, startOfToday()) || isAfter(date, addDays(new Date(), 90))
  }

  const getTimeSlotStatus = (slot: TimeSlot) => {
    const percentage = (slot.spotsAvailable / slot.totalSpots) * 100
    if (percentage === 0) return 'full'
    if (percentage <= 25) return 'low'
    return 'available'
  }

  if (initialLoading) {
    return <CalendarSkeleton />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Date & Time</CardTitle>
          <CardDescription>
            Choose your preferred date and time for {lesson.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className="rounded-md border"
                initialFocus
              />
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="text-sm font-medium mb-3">Available Times</h3>
              {selectedDate ? (
                loading ? (
                  <div className="flex items-center justify-center h-[300px] border rounded-lg">
                    <div className="text-center space-y-2">
                      <Spinner size={32} variant="primary" />
                      <p className="text-sm text-muted-foreground">Loading available times...</p>
                    </div>
                  </div>
                ) : availableTimeSlots.length > 0 ? (
                  <ScrollArea className="h-[300px] border rounded-lg p-3">
                    <div className="space-y-2">
                      {availableTimeSlots.map((slot) => {
                        const status = getTimeSlotStatus(slot)
                        const isSelected = selectedTimeSlot === slot.time
                        const isFull = status === 'full'
                        
                        return (
                          <Button
                            key={slot.time}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "w-full justify-between",
                              isFull && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={isFull}
                            onClick={() => handleTimeSlotSelect(slot.time)}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{slot.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {status === 'low' && (
                                <Badge variant="destructive" className="text-xs">
                                  Only {slot.spotsAvailable} left
                                </Badge>
                              )}
                              {status === 'full' && (
                                <Badge variant="secondary" className="text-xs">
                                  Full
                                </Badge>
                              )}
                              {status === 'available' && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Users className="h-3 w-3" />
                                  {slot.spotsAvailable}/{slot.totalSpots}
                                </div>
                              )}
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex items-center justify-center h-[300px] border rounded-lg">
                    <div className="text-center space-y-2">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        No available time slots for this date
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Please select another date
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-[300px] border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Please select a date to view available times
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Selection Summary */}
          {selectedDate && selectedTimeSlot && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Selected Date:</span>
                    <span className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="font-medium">{lesson.duration} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span className="font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {lesson.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isConfirming}
        >
          Back
        </Button>
        <Button 
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTimeSlot || isConfirming}
        >
          {isConfirming ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Confirming...
            </>
          ) : (
            'Continue to Summary'
          )}
        </Button>
      </div>
    </div>
  )
}