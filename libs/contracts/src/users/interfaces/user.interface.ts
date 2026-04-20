import { Role } from '@app/contracts/auth';

export interface User {
  id: number;
  email: string;
  role: Role;
}
