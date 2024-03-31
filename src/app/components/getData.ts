'use server'
import { randomUUID } from 'crypto';
import Styles from './page.module.css'
import {promises as fs} from 'fs'

let nextId = 1;
let updatedDate = new Date();

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
  diagnosticTests: { id: string, diagnosticTest: string; date: string; date_done: string }[];
  ivFluidBloodTransMedsIncorporated: { id: string, ivfbtic: string; date: string; time_hooked: string; endorse: string; }[];
  mainMedications: { id: string, mainMedication: string; date: string; time: string }[];
  prnMedications: { id: string, prnMedication: string; date: string; time: string }[];
  treatments: { id: string, treatment: string; date: string; time: string }[];
}

export interface PatientRes {
  patients: Patient[]
}

export async function page(): Promise<PatientRes> {
  const file = await fs.readFile(__dirname + '/public/patient.json', 'utf-8');
  const data: Promise<PatientRes> = JSON.parse(file);
  return data
}

export async function createPatient(newPatient: Patient) {
  newPatient.updated_by = 'A2 Benner'
  const { patients } = await page()
  patients.push(newPatient)
  await setData(patients)
}

export async function setData(data: Patient[]) {
  const jsonString = JSON.stringify({ patients: data })
  await fs.writeFile('./public/patient.json', jsonString)
}

export async function deleteRow(id: string) {
  const data = await page()
  const filteredData = data.patients.filter(p => p.id !== id)
  await setData(filteredData)
}

export async function editPatient(id: string, updatedPatientData: Patient) {
  const { patients } = await page();
  const patientIndex = patients.findIndex((p) => p.id === id);

  if (patientIndex === -1) {
    throw new Error(`Patient with id ${id} not found`);
  }

  patients[patientIndex] = {
    ...patients[patientIndex],
    ...updatedPatientData,
    updated_at: new Date(),
  };

  await setData(patients);
}

export async function duplicateRow(id: string) {
  const { patients } = await page()
  const originalPatient = patients.find((p) => p.id === id)

  if (!originalPatient) {
    throw new Error(`Patient with id ${id} not found`)
  }

  const newPatient: Patient = {
    ...originalPatient, 
    id:crypto.randomUUID(),
    fileVersion: originalPatient.fileVersion + nextId,
    updated_at: new Date(),
    updated_by: originalPatient.updated_by
  }

    patients.push(newPatient);
    await setData(patients)
}
