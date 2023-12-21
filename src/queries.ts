import { SupabaseClient } from "@supabase/supabase-js";
import {
  ExcelPropertyTemplate,
  ExcelPropertyTemplateWithAddressId,
} from "./types";

export const getAddress = async (
  row: ExcelPropertyTemplate,
  supabaseClient: SupabaseClient,
) => {
  const { data, error } = await supabaseClient
    .from("address")
    .select("id, street")
    .eq("street", row.street)
    .limit(1);

  if (error) {
    console.error("Error:", getAddress.name, error);
    return;
  }
  return data;
};

export const getOwner = async (
  row: ExcelPropertyTemplate,
  supabaseClient: SupabaseClient,
) => {
  const { data, error } = await supabaseClient
    .from("property_owners")
    .select("id")
    .eq("full_name", row.owner_name)
    .limit(1);

  if (error) {
    console.error("Error:", getOwner.name, error);
    return;
  }

  if (data && data.length > 0) {
    console.log("Owner found...", data[0].id);
  }

  return data;
};

export const getOrCreateCompany = async (
  row: ExcelPropertyTemplate,
  supabase: SupabaseClient,
): Promise<undefined | { id: number }> => {
  const { data, error } = await supabase
    .from("company")
    .select("id")
    .eq("name", row.company)
    .eq("name_director", row.name_director)
    .eq("contact_company", row.contact_company)
    .limit(1);

  if (error) {
    console.error("Error:", getOrCreateCompany.name, error);
    return;
  }

  if (data && data.length > 0) {
    console.log("Found company...", data[0].id);
  } else {
    const { data: newlyCreatedCompany } = await supabase
      .from("company")
      .insert({
        name: row.company,
        name_director: row.name_director,
        contact_company: row.contact_company,
      })
      .select();

    if (newlyCreatedCompany && newlyCreatedCompany.length > 0) {
      console.log("Created company...", newlyCreatedCompany[0].id);
      return newlyCreatedCompany[0];
    }

    return;
  }

  return data[0];
};

export const getOrCreateIndividual = async (
  row: ExcelPropertyTemplate,
  supabase: SupabaseClient,
): Promise<undefined | { id: number }> => {
  const { data, error } = await supabase
    .from("individual")
    .select("id")
    .eq("surname", row.surname)
    .eq("infix", row.infix)
    .eq("initials", row.initials)
    .eq("salutation", row.salutation)
    .is("age", row.age ?? null)
    .limit(1);

  if (error) {
    console.error("Error:", getOrCreateIndividual.name, error);
    return;
  }

  if (data && data.length === 0) {
    const { data: newlyCreatedIndividual, error } = await supabase
      .from("individual")
      .insert({
        surname: row.surname,
        infix: row.infix,
        initials: row.initials,
        salutation: row.salutation,
        date_of_birth: row.date_of_birth,
        age: row.age ?? null,
      })
      .select();

    if (error) {
      console.error("Error:", getOrCreateIndividual.name, "creation", error);
      return;
    }

    console.log("Individual created...", newlyCreatedIndividual[0].id);

    return newlyCreatedIndividual[0];
  }

  return data[0];
};

export const getIndividualOrCompany = async (
  row: ExcelPropertyTemplate,
  supabaseClient: SupabaseClient,
) => {
  let company: { id: number } | undefined;
  let individual: { id: number } | undefined;

  if (row.company) {
    company = await getOrCreateCompany(row, supabaseClient);
  }

  if (row.surname) {
    individual = await getOrCreateIndividual(row, supabaseClient);
  }

  return { individual, company };
};

export const createPropertyOwner = async (
  row: ExcelPropertyTemplate,
  supabaseClient: SupabaseClient,
) => {
  const { individual, company } = await getIndividualOrCompany(
    row,
    supabaseClient,
  );

  const { data: property_owner, error } = await supabaseClient
    .from("property_owners")
    .insert({
      full_name: row.owner_name || row.company,
      owner_phone: row.owner_phone,
      owner_mail: row.owner_mail,
      individual_id: individual?.id,
      company_id: company?.id,
    })
    .select();

  if (!property_owner && error) {
    console.error("Error:", createPropertyOwner.name, error);
    return;
  }

  console.log("Owner created...", property_owner[0].id);
  return property_owner;
};

/**
 * if age_information is newer, return undefined
 */
export const getProperty = async (
  row: ExcelPropertyTemplate,
  supabaseClient: SupabaseClient,
) => {
  const formattedDate = new Date(row.age_information)
    .toISOString()
    .slice(0, 10);
  const { data, error } = await supabaseClient
    .from("property")
    .select("id, age_information")
    .eq("age_information", formattedDate)
    .limit(1);

  if (error) {
    console.error("Error:", getProperty.name, error);
    return;
  }

  if (data && data.length > 0) {
    console.log("Property found...", data[0].id);
    if (new Date(data[0].age_information) < new Date(row.age_information)) {
      return;
    }
  }

  return data;
};

export const createPropertyAction = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("property_actions")
    .insert([{}])
    .select("id")
    .limit(1)
    .single();

  if (error) {
    console.error("Error:", createPropertyAction.name, error);
    return;
  }

  return data;
};

export const createPropertyDetails = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("property_details")
    .insert([{}])
    .select("id")
    .limit(1)
    .single();

  if (error) {
    console.error("Error:", createPropertyDetails.name, error);
    return;
  }

  return data;
};

export const createProperty = async (
  row: ExcelPropertyTemplateWithAddressId,
  supabaseClient: SupabaseClient,
  owner_id: number,
) => {
  console.log("Creating property...");
  const propertyAction = await createPropertyAction(supabaseClient);
  const propertyDetails = await createPropertyDetails(supabaseClient);

  const { data, error } = await supabaseClient
    .from("property")
    .insert({
      age_information: row.age_information,
      cadastral_designation: row.cadastral_designation,
      object: row.object,
      bag_id: row.bag_id,
      description: row.description,
      purchase_price: row.purchase_price,
      purchase_year: row.purchase_year ?? null,
      obtained_with_more_real_estate:
        row.obtained_with_more_real_estate?.toLowerCase(),
      cadaster_surface: row.cadaster_surface,
      bag_surface: row.bag_surface,
      measured_surface: row.measured_surface,
      owner_lives_here: row.owner_lives_here?.toLowerCase(),
      address_id: row.address_id,
      owner_id: owner_id,
      property_action_id: propertyAction?.id,
      property_details_id: propertyDetails?.id,
    })
    .select();

  if (error) {
    console.error("Error:", createProperty.name, error);
    return;
  }
  console.log("Property created...", data[0].id);
  return data;
};
