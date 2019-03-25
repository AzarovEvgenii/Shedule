import { ProblemPhoto } from './problemPhoto';

export interface Problem {
  id: number;
  type: string;
  degree: number;
  description: string;
  created: Date;
  timeHappened: Date;
  city: string;
  country: string;
  address: string;
  longitude: number;
  latitude: number;
  photoUrl: string;
  userId: number;
  photos?: ProblemPhoto[];
  // only for client
  // hovered?: boolean;
}
