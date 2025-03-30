import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import connectDB from '../../../lib/mongoose';
import Appointment from '../../models/Appointment';
import DoctorSchedule from '../../models/DoctorSchedule';

interface ScheduleSlot {
  startTime: string;
  endTime: string;
}

interface DoctorScheduleType {
  doctorId: string;
  schedule: { day: string; slots: ScheduleSlot[] }[];
  unavailableDates: string[]; 
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = req.nextUrl.searchParams;
    const doctorId = searchParams.get('doctorId');
    const patientId = searchParams.get('patientId');
    
    if (!doctorId && !patientId) {
      return NextResponse.json(
        { error: 'Either doctorId or patientId is required' },
        { status: 400 }
      );
    }
    
    const query = doctorId ? { doctorId } : { patientId };
    const appointments = await Appointment.find(query).sort({ date: 1, startTime: 1 });
    
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { doctorId, patientId, patientName, doctorName, date, startTime, endTime, reason } = body;
    
    if (!doctorId || !patientId || !patientName || !doctorName || !date || !startTime || !endTime || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const appointmentDate = new Date(date);
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][appointmentDate.getDay()];
    
    const doctorSchedule: DoctorScheduleType | null = await DoctorSchedule.findOne({ doctorId });
    if (!doctorSchedule) {
      return NextResponse.json(
        { error: 'Doctor schedule not found' },
        { status: 404 }
      );
    }
        
    const isValidTimeSlot = daySchedule.slots.some((slot: ScheduleSlot) => 
      slot.startTime <= startTime && slot.endTime >= endTime
    );
    if (!isValidTimeSlot) {
      return NextResponse.json(
        { error: 'Selected time is outside doctor\'s working hours' },
        { status: 400 }
      );
    }
    
    if (doctorSchedule.unavailableDates.includes(format(appointmentDate, 'yyyy-MM-dd'))) {
      return NextResponse.json(
        { error: 'Doctor is not available on this date' },
        { status: 400 }
      );
    }
    
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      patientName,
      doctorName,
      date: appointmentDate,
      startTime,
      endTime,
      reason,
      status: 'confirmed'
    });
    
    await newAppointment.save();
    
    return NextResponse.json({ 
      success: true, 
      appointment: newAppointment 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    if (error instanceof Error && error.name === 'MongoServerError' && (error as any).code === 11000) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
