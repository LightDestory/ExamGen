import { Response } from "express";

export class Sender {

    static ERROR_TYPE_UNAUTH = 1;
    static ERROR_TYPE_PARAMETER = 2
    static ERROR_TYPE_NOT_FOUND = 3
    static ERROR_TYPE_NOT_ENOUGH = 4
    static ERROR_TYPE_PDF_GEN = 5
    static ERROR_TYPE_RENAME = 6
    private static instance: Sender | undefined;

    private constructor() { }

    public static getInstance() {
        if (!Sender.instance) {
            Sender.instance = new Sender();
        }
        return Sender.instance;
    }

    public sendError(response: Response, errorType: number) {
        let status: number;
        let error: any = { "status": "error", "result": "" };
        switch (errorType) {
            case Sender.ERROR_TYPE_UNAUTH:
                status = 403;
                error.result = "The API KEY is invalid"
                break;
            case Sender.ERROR_TYPE_NOT_FOUND:
                status = 404;
                error.result = "Unknown resource"
                break;
            case Sender.ERROR_TYPE_NOT_ENOUGH:
                status = 404;
                error.result = "Your creation set is not possible with the current question database!"
                break;
            case Sender.ERROR_TYPE_RENAME:
                status = 409;
                error.result = "Unable to rename due to an already existing resource!"
                break;
            case Sender.ERROR_TYPE_PDF_GEN:
                status = 500;
                error.result = "Unable to process the pdf generation, server issue!"
                break;
            default /*ERROR_TYPE_PARAMETER*/:
                status = 400;
                error.result = "Invalid request's parameters!";
                break;
        }
        response.status(status).json(error);
    }

    public sendResult(response: Response, httpCode: number, result: any) {
        let data: any = { "status": "success", "result": "" };
        data.result = result;
        response.status(httpCode).json(data);
    }

    public sendFile(response: Response, httpCode: number, stream: Buffer) {
        response
            .writeHead(httpCode, {
                'Content-Length': Buffer.byteLength(stream),
                'Content-Type': 'application/pdf',
                'Content-disposition': 'attachment;filename=exam.pdf',
            })
            .end(stream);
    }
}