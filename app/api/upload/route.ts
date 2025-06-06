import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MAX_FILE_SIZE } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File

        if(!file){
            return NextResponse.json({
                message: 'No file found',
                status: 400
            })
        }
        //Validate file type
        if(file.type !== 'application/pdf'){
            return NextResponse.json({
                message: 'Only pdf files are allowed',
                status: 400
            })
        }
        //Validate file size
        if(file.size > MAX_FILE_SIZE){
            return NextResponse.json({
                message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB`,
                status: 400
            })
        }

        //Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        //Generate unique filename
        const timeStamp = Date.now()
        const fileName = `${timeStamp}_${file.name.replace(/\s+/g, '-')}`

        //Create a reference to the file in firebase storage
        const storageRef = ref(storage, `pdfs/${fileName}`)

        //Upload the file to firebase storage
        await uploadBytes(storageRef, buffer)

        //Get the download URL of the uploaded file
        const fileURL = await getDownloadURL(storageRef)

        return NextResponse.json({
            message: 'File uploaded successfully',
            fileURL
        },{status:200})


    } catch (error) {
        console.error("Something happened: ", error);
        return NextResponse.json({
            message: 'Error uploading file',
            status: 500
        })
    }
}