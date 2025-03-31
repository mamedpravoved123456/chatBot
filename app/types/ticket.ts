interface Ticket {
  id: string;
  type: string;
  description: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: Date;
  address?: string;
  contactInfo: {
    name: string;
    phone: string;
    email?: string;
  };
} 