'use server'
import Styles from './page.module.css'
import {promises as fs} from 'fs'

let nextId = 1;

export interface Patient {
  id: string;
  ward: string;
  fileVersion: number;
  roomNumber: string;
  lastName: string;
  givenName: string;
  middleName: string;
  age: number;
  sex: string;
  patientNumber: string;
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
  dateOfBirth: string;
  diagnosticTests: { id: number, diagnosticTest: string; date: string; date_done: string }[];
  ivFluidBloodTransMedsIncorporated: { id: number, ivfbtic: string; date: string; time_hooked: string }[];
  mainMedications: { id: number, mainMedication: string; date: string; time: string }[];
  prnMedications: { id: number, prnMedication: string; date: string; time: string }[];
  treatments: { id: number, treatment: string; date: string; time: string }[];
}

interface PatientRes {
  patients: Patient[]
}

export async function page(): Promise<PatientRes> {
  const file = await fs.readFile('./src/app/data/patient.json', 'utf-8');
  const data: Promise<PatientRes> = JSON.parse(file);
  return data
}
