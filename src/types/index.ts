export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  points: number;
  phone: string;
  memberSince: string;
  avatar: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  points: string;
  icon: string;
}
