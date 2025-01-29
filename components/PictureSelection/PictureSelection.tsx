import React, { useState } from 'react'
import { useForm, UseFormSetValue } from 'react-hook-form';
import toast from 'react-hot-toast';

type FileTypes = {
    file: FileList;
};
type UserDataType = {
    picUrl: string,
    name: string,
    email: string,
    password: string
}
async function uploadFile(file: FileTypes, setValue: UseFormSetValue<UserDataType>, setPicUrl: React.Dispatch<React.SetStateAction<string>>) {

    const formData = new FormData();
    formData.append("file", file.file[0]);

    try {
        const response = await fetch("/api/upload-picture", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.status === 200) {
            toast.success("Picure Uploaded Successfully");
            setValue("picUrl", data.message);
            setPicUrl(data.message);
        } else {
            toast.error("Error Uploading File");
        }
    } catch (error) {
        console.error(error);
    }
}
function PictureSelection({ setValue, picUrl, setPicUrl }: { setValue: UseFormSetValue<UserDataType>, picUrl: string, setPicUrl: React.Dispatch<React.SetStateAction<string>> }) {
    const form = useForm<FileTypes>();
    const { register, handleSubmit, formState: { errors } } = form;
    return (
        <div className='grid justify-center items-center'>
            {picUrl !== "" &&
                <img
                    src={picUrl !== "" ? picUrl : "#"}
                    alt="profile-pic"
                    className='w-[100px] h-[100px] m-auto' />
            }
            <form
                onSubmit={handleSubmit((file) => uploadFile(file, setValue, setPicUrl))}
                className='grid gap-y-5'>
                <input type="file" {...register("file")} />
                <button
                    type='submit'
                    className='border-2 border-gray-500 w-fit h-fit py-1 px-4 m-auto rounded-[5px]'>Upload</button>
            </form>
        </div>
    )
}

export default PictureSelection