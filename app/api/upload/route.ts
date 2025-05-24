import { Buffer } from './../../../node_modules/protobufjs/index.d';
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


    } catch (error) {
        console.error("Something happened: ", error);
    }
}