export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roles: string[]; // Modifier role en roles et définir le type comme un tableau de chaînes
  gender?: string;
  departmentName?: string;
  dateOfBirth?: string; // Vous pouvez utiliser un type approprié pour la date de naissance, par exemple 'Date'
  profilePicture?: string;
}
