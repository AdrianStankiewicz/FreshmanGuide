import { Consultation } from "./consultation";

export interface Professor {
  id: number;
  organisation: string;
  name: string;
  room: string;
  email: string;
  best_contact: string;
  typeOfPass: string;
  availabilityOfMaterials: string;
  note: string;
  consultations: Consultation[];
}
