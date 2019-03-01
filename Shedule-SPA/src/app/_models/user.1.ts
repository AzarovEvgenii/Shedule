import { Photo } from './photo';

export interface Problem {
  id: number;
  type: string;
  description: string;
  knownAs: string;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  photos?: Photo[];
}
