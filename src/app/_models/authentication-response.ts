export interface AuthenticationResponse {
  accessToken?: string;
  mfaEnabled?: string;
  secretImageUri?: string;
  roles ?: string[]; // Ajoutez cette ligne pour représenter les rôles de l'utilisateur

}
