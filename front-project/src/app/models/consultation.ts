import { Professor } from './professor';

export interface Consultation {
  id: number;
  professorID: Professor;
  data: string;
}
