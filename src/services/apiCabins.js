import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error(`Couldn't load cabins data for some reason`);
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted!");
    }
}

export async function createEditCabin(newCabin, id) {
    console.log(newCabin);
    const hasImagePath = typeof newCabin.image === "string";

    // Create file name and file path
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Create a new cabin

    let query = supabase.from("cabins");

    if (!id) {
        const { data, error } = await query.insert([{ ...newCabin, image: imagePath }]);
    } else {
        const { data, error } = await query
            .update([{ ...newCabin, image: imagePath }])
            .eq("id", id)
            .select();
    }

    const { data, error } = await query.select(); // добавь .single();

    if (error) {
        console.error(error);
        throw new Error(`Couldn't add new cabin because of an error!`);
    }

    // Upload an image

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);
    if (storageError) {
        console.error(`Couldn't upload image to the storage, ${storageError.message}`);
        await supabase.from("cabins").delete().eq("id", data.id);
    }
}

export async function getCabin(id) {

    // console.log("getCabin by id is run");
    
        const { data, error } = await supabase
          .from("cabins")
          .select("*")
          .eq("id", id)
          .single();
      
        if (error) {
          console.error(error);
          throw new Error("Cabin was not fetched");
      
      
        }
      
        // console.log(data);
      
      
      
        return data;
      }
