"use server"
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js';

export const POST = async (req: NextRequest) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_PROJECT_URL!, process.env.NEXT_PUBLIC_ANON_PUBLIC!);
    const formData = await req.formData();
    const file = formData.get("file");
    const time = new Date();
    if (file && file instanceof File) {
        const { data, error } = await supabase
            .storage
            .from('profile_picture')
            .upload(`uploads/${file.name+time}`, file);

        if (error) {
            console.log("Error uploading file:- ", error);
            return NextResponse.json({ status: 400, message: "Error uploading file" });
        } else {

            const { data: signedUrlData } = await supabase.storage
            .from("profile_picture")
            .createSignedUrl(`uploads/${file.name+time}`, 315360000);

            if (signedUrlData) {
                return NextResponse.json({ status: 200, message: signedUrlData.signedUrl });
            } else {
                console.log("Error creating signed URL");
                return NextResponse.json({ status: 500, message: "Error creating signed URL" });
            }

        }
    } else {
        return NextResponse.json({ status: 404, message: "No file received or file is empty" });
    }
}


