import { ChangeEvent } from "react";
import { GetString } from "./UploadFileModel";
import { xml2json } from "xml-js";

type Contents = {
    Key: string,
    LastModified: Date,
    ETag: string,
    Size: number,
    StorageClass: string
}

type ListBucketResponse = {
    ListBucketResult: {
        Name: string,
        Prefix: string,
        KeyCount: number,
        MaxKeys: number,
        IsTruncated: boolean,
        Contents: Contents[]
    }
}

const options = {
    compact: true
};

interface IUploadFileControls {
    uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<string>
    abortFileUpload: (reason?: any) => void
    getFilename: GetString
}

class UploadFileControls implements IUploadFileControls {
    controller = new AbortController()

    baseUrl: string;

    constructor(baseUrl: string) { this.baseUrl = baseUrl }

    async uploadFile(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files === null) {
            new Error(`No file to upload`)
        }

        const formData = new FormData();
        const file = files![0]

        formData.append('file', file);

        const response = await this.getFilenameRequest()

        if (response.status !== 200) {
            throw new Error(`Upload file status: ${response.status}`)
        }

        return file.name
    }

    abortFileUpload(reason?: any) {
        this.controller.abort(reason)
    }

    async getFilename() {

        const response = await this.getFilenameRequest()

        if (response.status !== 200) {
            throw new Error("Unable to list bucket objects")
        }

        const xmlStr = await response.text()

        const listObj = JSON.parse(xml2json(xmlStr, options)) as ListBucketResponse
        let contents = listObj.ListBucketResult.Contents;
        if (!Array.isArray(contents)) {
            contents = [contents]
        }

        return contents[0].Key
    }

    getFilenameRequest = async () => {
        if (import.meta.env.DEV) {
            return await this.getFilenameRequestDev()
        }

        return await this.getFilenameRequestProd()
    }

    getFilenameRequestDev = async () => {

        await new Promise(r => setTimeout(r, 2000));

        const successOpts = {
            status: 200,
            satusText: "Init complete"
        }

        const successResponse = new Response("Init filename", successOpts)

        return successResponse
    }

    getFilenameRequestProd = async () => {

        return await fetch(this.baseUrl, {
            method: "GET",
            mode: "cors",
            signal: this.controller.signal
        })

    }


    uploadFileRequest = async (formData: FormData) => {
        if (import.meta.env.DEV) {
            return await this.uploadFileRequestDev()
        }

        return await this.uploadFileRequestProd(formData)
    }

    uploadFileRequestDev = async () => {

        await new Promise(r => setTimeout(r, 2000));

        const failOpts = {
            status: 400,
            statusText: "Error"
        }

        const successOpts = {
            status: 200,
            satusText: "Upload complete"
        }

        const failResponse = new Response("", failOpts)

        const successResponse = new Response("Uploaded file name", successOpts)

        const rnd = Math.random()

        if (rnd > 0.5) {
            return failResponse
        }

        return successResponse
    }

    uploadFileRequestProd = async (formData: FormData) => {

        await fetch(this.baseUrl,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                mode: "cors",
                signal: this.controller.signal,
                body: formData
            }
        )
    }

}

export default UploadFileControls
