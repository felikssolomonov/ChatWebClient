export interface RegistrationProps {
  email: String;
  name: String;
  password: String;
}

export interface RegistrConfirmProps {
  email: String;
  hashPassword: String;
}

export interface LogInProps {
  email: String;
  password: String;
}
