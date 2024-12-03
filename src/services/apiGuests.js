import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constans";

export async function getGuests({ modalPage }) {

    // console.log(page);

    let query = supabase.from("guests").select("*", {count: "exact"});
    // let { data, error } = await supabase.from("guests").select("*");

    if (modalPage) {
        const from = PAGE_SIZE * (modalPage - 1);
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
    }

    const {count, data} = await query;
    // console.log(data);
    return {count, data};
}

export async function getGuest(id) {

// console.log("getGuest by id is run");

    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("id", id)
      .single();
  
    if (error) {
      console.error(error);
      throw new Error("Guest was not fetched");
  
  
    }
  
    // console.log(data);
  
  
  
    return data;
  }

export async function createEditGuest(newGuest, id) {
    console.log(newGuest);

    let query = supabase.from("guests");

    if (!id) {
        const { data, error } = await query.insert([{ ...newGuest }]).select().single();
        console.log(data);
        return data;
    } else {
        const { data, error } = await query
            .update([{ ...newGuest }])
            .eq("id", id)
            .select();
    }

    const { data, error } = await query.select(); // добавь .single();

    if (error) {
        console.error(error);
        throw new Error(`Couldn't add new guest because of an error during fetching!`);
    }

    // console.log(data);
}
