

export interface AuthResponse{
  id: number,
  status: string,
  ok: boolean,
  name: string,
  surname: string,
  email: string,
  role: number;

}


export interface Usuario{
  email: string;
  name: string;
  surname: string;
  role: number;
}

export interface EmailsResponse{
  resp: boolean;
}


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
