import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface Event {
  name: string;
  date: string;
  location: string;
  description: string;
}

export function getAllEvents(): Event[] {
  const filePath = path.join(process.cwd(), 'data', 'events.csv');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContents, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  
  return records as Event[];
}

export function getUpcomingEvents(): Event[] {
  const allEvents = getAllEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for fair comparison
  
  return allEvents
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    })
    .sort((a, b) => {
      // Sort by date, earliest first
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
