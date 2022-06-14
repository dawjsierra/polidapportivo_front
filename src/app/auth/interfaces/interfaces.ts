
//  respuesta de autenticacion
export interface AuthResponse{
  id: number,
  status: string,
  ok: boolean,
  name: string,
  surname: string,
  email: string,
  role: number;

}

//  respuesta de Usuario
export interface Usuario{
  email: string;
  name: string;
  surname: string;
  role: number;
}

//  respuesta de emails
export interface EmailsResponse{
  resp: boolean;
}


//  respuesta del registro
export interface RegisterResponse{
  email?: string,
  password?:string,
  name?: string,
  surname?: string,
  role?: number,
  updated_at?: string;
  created_at?: string;
  id?: number;

}
