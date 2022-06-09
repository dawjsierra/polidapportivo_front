export interface Booking {
  id: number;
  date: string;
  hour: string;
  sport: string;
  id_user: number;
  created_at: string;
}

export interface User{
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: number;
  created_at?:string;
  updated_at?:string;
}

export interface BookingsUserResponse{
  bookings: Booking[];
}

export interface DateAvailableResponse{
  hours: string[];
}

export interface CrearReservaResponse{
  id_user: number,
  sport: string,
  hour: string,
  date: string,
  updated_at: string,
  created_at: string,
  id: number
}

export interface ReservaInterface{
  date: string,
  hour: string,
  sport: string,
  id_user: number
}

export interface UpdateUser{
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  role: number,
  created_at: string,
  updated_at: string,
  remember_token: null;
}

export interface FindUserResponse{
  usuarios: User[]
}

export interface DeleteUserResponse{
  "status":string
}
