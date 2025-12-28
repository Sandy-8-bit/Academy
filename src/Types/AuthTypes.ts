export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  role: string;
  email: string;
}
