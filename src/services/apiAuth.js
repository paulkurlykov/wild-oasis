import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
    console.log("apiAuth is run...");

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    console.log(data);
    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    // console.log(session.session);
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    // console.log(data);

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function logOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}

export async function signUp({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update passwrod OR fullName
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };
    const { data, error } = await supabase.auth.updateUser(updateData);
    
    if(error) throw new Error(error.message);
    if(!avatar) return data;
    
    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const {error: avatarUploadError} = await supabase.storage.from('avatars').upload(fileName, avatar);


    // 3. Update avatar in the user
    const {data: updatedUser, error: updateAvatarError} = await supabase.auth.updateUser({data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }})

    if(updateAvatarError) throw new Error(error.message);


    return updatedUser;
}
