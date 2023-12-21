import {
  createProperty,
  createPropertyOwner,
  getAddress,
  getOwner,
  getProperty,
} from "./queries";
import { supabaseClient } from "./supa-client";
import { ExcelPropertyTemplate } from "./types";

// if address is not in supabase, create it?

export const handler = async (data: ExcelPropertyTemplate[]) => {
  // get the first address, skip the zipcode and city in the meantime
  let arr: any;
  const start = new Date().getTime();
  try {
    arr = await Promise.all(
      data.map(async (row) => {
        const existingProperty = await getProperty(row, supabaseClient);

        if (existingProperty && existingProperty.length > 0) {
          console.error("Property already exists");
          return;
        }
        // TODO: use street +  city + zipcode as key and save address id as cache
        const address = await getAddress(row, supabaseClient);

        if (!address || address.length === 0) {
          console.error("Address doesn't exist...");
          return;
        }
        console.log("Address:", address);

        let owner = await getOwner(row, supabaseClient);
        if (!owner || owner.length === 0) {
          owner = await createPropertyOwner(row, supabaseClient);
        }

        if (owner && owner.length > 0) {
          const property = await createProperty(
            { ...row, address_id: address[0].id },
            supabaseClient,
            owner[0].id,
          );
          return property;
        }
        return;
      }),
    );
  } catch (error) {
    console.log({ MainThread: error });
  } finally {
    var end = new Date().getTime();
    var time = end - start;
    console.log("Execution time: " + time);
  }
};
