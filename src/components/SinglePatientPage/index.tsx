import { Patient, Gender, Diagnosis } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface SinglePatientPageProps {
	patient: Patient | null | undefined;
	diagnoses: Array<Diagnosis> | null | undefined;
}

const SinglePatientPage = ({ patient, diagnoses } : SinglePatientPageProps) => {
	console.log(diagnoses);
	console.log(patient);
	
	return (
		<>
			<h1>
				{patient?.name}
				&ensp;
				{patient?.gender === Gender.Female 
				? <FemaleIcon />
				: <MaleIcon />
			}

			</h1> 

			<section>
				<p>ssn: {patient?.ssn}</p>
				<p>occupation: {patient?.occupation} </p>
			</section>

			<section>
				<h2>entries</h2>
			</section>
	
			{patient?.entries.map((entry) => (
				<div key={entry.id}>
					
					<p>{entry.date} {entry.description}</p>
			
					<ul>
						{entry.diagnosisCodes?.map((code) => (
							<li key={code}>
								{diagnoses?.filter(diagnosis => diagnosis.code === code).map((d) => (
									<div key={d.code}>
										{d.code}: {d.name}
									</div>
								))}
							</li>
						))}
					</ul>
				
				</div>
			))}

	

		</>
	);

};

export default SinglePatientPage;