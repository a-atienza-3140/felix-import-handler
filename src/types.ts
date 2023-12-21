export type Address = {
  street: string;
  zipcode: string;
  city: string;
  house_number: number;
  house_extension?: string;
  // house_extension: string; // add house_number + house_extension PROPERTY
};

export type Property = {
  age_information: Date;
  cadastral_designation?: string;
  object?: string;
  bag_id?: string;
  description?: string;
  purchase_price?: number;
  purchase_year?: number;
  obtained_with_more_real_estate?: string;

  cadaster_surface?: number;
  bag_surface?: number;
  measured_surface?: number;
  owner_lives_here?: string; // string true or false PROPERTY
};

export type Owner = {
  owner_name?: string; // this is full_name on supabase
  owner_phone?: string;
  owner_mail?: string;
};

export type Company = {
  name_director?: string;
  company?: string; // this is name on supabase
  contact_company?: string;
};

export type Individual = {
  salutation?: string;
  initials?: string;
  infix?: string; // infix
  surname?: string;
  date_of_birth?: Date;
  age?: number;
};

export type ExcelPropertyTemplate = Address &
  Property &
  Individual &
  Company &
  Owner;

export type ExcelPropertyTemplateWithAddressId = ExcelPropertyTemplate & {
  address_id: number;
};
