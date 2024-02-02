export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
	entries: Array<Entry>
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare",
	employerName: string,
	sickLeave?: {
		startDate: string,
		endDate: string
	}
}
export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck",
	healthCheckRating: HealCheckRating
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital",
	discharge: {
		date: string,
		criteria: string
	}
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type Entry = OccupationalHealthcareEntry | HealthCheckEntry | HospitalEntry;