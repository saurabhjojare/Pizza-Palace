export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email_address: string;
}

export interface CustomerListProps {
  customers: Customer[];
  onDelete: (customerId: number) => void;
  title?: string;
}
