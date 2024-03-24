'use server'
import Styles from './page.module.css'
import {promises as fs} from 'fs'

export interface Patient {
  roomNumber: number;
  lastName: string;
  givenName: string;
  middleName?: string;
  age: number;
  sex: string;
  patientNumber: number;
  diagnosis: string;
}

interface PatientRes {
  patients: Patient[]
}

export async function page(): Promise<PatientRes> {
  const file = await fs.readFile('./src/app/data/patient.json', 'utf-8');
  const data: Promise<PatientRes> = JSON.parse(file);
  return data
}
