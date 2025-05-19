import { Task } from './Task';

export const TASKS: Task[] = [
  {
    id: 1,
    text: 'Doctors Appointment',
    dueDate: "May 5, 2025",
    dateAdded: "Feb 3, 2025",
    time: "10:00 AM",
    priority: "High",
    isCompleted: true

  },
  {
    id: 2,
    text: 'Meeting at School',
    dueDate: "March 10, 2025",
    dateAdded: "Feb 1, 2025",
    time: "1:00 PM",
    priority: "Mid",
    isCompleted: false
  },
  {
    id: 3,
    text: 'Food Shopping',
    dueDate: "March 1, 2025",
    dateAdded: "Feb 2, 2025",
    time: "10:00 AM",
    priority: "Low",
    isCompleted: false
  },
];
