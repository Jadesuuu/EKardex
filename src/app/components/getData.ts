'use server'
import Styles from './page.module.css'
import {promises as fs} from 'fs'

export interface Patient {
  id: number;
  ward: string;
  roomNumber: string;
  lastName: string;
  givenName: string;
  middleName: string;
  age: number;
  sex: string;
  patientNumber: number;
  updated_at: Date;
  updated_by: string;
  datetime_admitted: Date;
  religion: string;
  doctor: string;
  chiefComplaint: string;
  diagnosis: string;
  diet: string;
  operation: string;
  activity: string;
  allergies: string;
  weightAndHeight: string;
  bloodType: string;
  phic: boolean;
  others: string;
  referral: string;
  dateOfBirth: Date;
  diagnosticTests: { [key: string]: { diagnosticTest: string; date: string; date_done: string } };
  ivFluidBloodTransMedsIncorporated: { [key: string]: { ivfbtic: string; date: string; time_hooked: string } };
  mainMedications: { [key: string]: { mainMedication: string; date: string; time: string } };
  prnMedications: { [key: string]: { prnMedication: string; date: string; time: string } };
  treatments: { [key: string]: { treatment: string; date: string; time: string } };
}

interface PatientRes {
  patients: Patient[]
}

export async function page(): Promise<PatientRes> {
  const file = await fs.readFile('./src/app/data/patient.json', 'utf-8');
  const data: Promise<PatientRes> = JSON.parse(file);
  return data
}
