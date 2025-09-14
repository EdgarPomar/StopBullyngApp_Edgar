export type Usuario = {
  $id: string;
  userId: string;
  name: string;
  email: string;
  role?: string;
  hashedpassword: string;
  labels?: string[];
};