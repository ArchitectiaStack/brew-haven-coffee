export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'food' | 'pastries';
  image?: string;
  rating?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface RewardItem {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  category: 'coffee' | 'discount' | 'pastry';
  isRedeemed?: boolean;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
}
