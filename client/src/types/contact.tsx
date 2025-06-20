export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  agreement: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactResponse {
  doc: Contact;
  message: string;
}

// Type for creating a new contact
export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreement: boolean;
}
