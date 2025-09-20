import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CalendarIntegrationProps {
  classDetails: {
    what: string;
    when: string;
    where: string;
    instructor: string;
  };
  bookingCode: string;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ 
  classDetails, 
  bookingCode 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateCalendarEvent = () => {
    // Parse the date/time from classDetails.when
    // This is a simplified version - in production, use proper date parsing
    const startDate = new Date();
    startDate.setHours(14, 0, 0, 0); // 2:00 PM
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 90);

    return {
      title: `Surf Lesson - ${classDetails.what}`,
      description: `Booking Code: ${bookingCode}\nInstructor: ${classDetails.instructor}\n\nWhat to bring:\n- Swimwear\n- Towel\n- Sunscreen\n- Water`,
      location: classDetails.where,
      startDate,
      endDate
    };
  };

  const addToGoogleCalendar = () => {
    const event = generateCalendarEvent();
    const startDateStr = event.startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDateStr = event.endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.title);
    url.searchParams.append('dates', `${startDateStr}/${endDateStr}`);
    url.searchParams.append('details', event.description);
    url.searchParams.append('location', event.location);
    
    window.open(url.toString(), '_blank');
  };

  const addToOutlookCalendar = () => {
    const event = generateCalendarEvent();
    const startDateStr = event.startDate.toISOString();
    const endDateStr = event.endDate.toISOString();
    
    const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
    url.searchParams.append('subject', event.title);
    url.searchParams.append('startdt', startDateStr);
    url.searchParams.append('enddt', endDateStr);
    url.searchParams.append('body', event.description);
    url.searchParams.append('location', event.location);
    
    window.open(url.toString(), '_blank');
  };

  const downloadICS = () => {
    const event = generateCalendarEvent();
    const startDateStr = event.startDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDateStr = event.endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `DTSTART:${startDateStr}`,
      `DTEND:${endDateStr}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      `UID:${bookingCode}@reservesurf.com`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `surf-lesson-${bookingCode}.ics`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={addToGoogleCalendar}>
          Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addToOutlookCalendar}>
          Outlook Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadICS}>
          Download .ics file (Apple Calendar)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarIntegration;