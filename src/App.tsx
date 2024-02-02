import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import SinglePatientPage from "./components/SinglePatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnosis] = useState<Diagnosis[]>([]);

	const match = useMatch('/patients/:id');
	const patient = match
		? patients.find((p) => p.id === match.params.id)
		: null;
			
	const matchingDiagnoses = patient
		? diagnoses.filter(diagnosis => patient?.entries.some(entry => entry.diagnosisCodes?.includes(diagnosis.code)))
		: null;


  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
		const fetchDiagnosisList = async () => {
			const diagnoses = await diagnosesService.getAll();
			setDiagnosis(diagnoses);
		};
    void fetchPatientList();
		void fetchDiagnosisList();
  }, []);

		
  
  return (
    <div className="App">
  
			<Container>

				<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
					Patientor
				</Typography>

				<Button component={Link} to="/" variant="contained" color="primary">
					Home
				</Button>

				<Divider hidden />

				<Routes>
					<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
					<Route path="/patients/:id" element={<SinglePatientPage patient={patient} diagnoses={matchingDiagnoses} />} />
				</Routes>
			
			</Container>
    </div>
  );
};

export default App;
