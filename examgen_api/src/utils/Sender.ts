import {Response} from "express";

export class Sender {

    static ERROR_TYPE_UNAUTH = 1;
    static ERROR_TYPE_PARAMETER = 2
    static ERROR_TYPE_NOT_FOUND = 3
    private static instance: Sender | undefined;

    private constructor() {}

    public static getInstance() {
        if(!Sender.instance){
            Sender.instance = new Sender();
        }
        return Sender.instance;
    }

    public sendError(response: Response, errorType: number) {
        let status: number;
        let error: any = {"status": "error", "result": ""};
        switch (errorType) {
            case Sender.ERROR_TYPE_UNAUTH:
                status = 403;
                error.result = "The API KEY is invalid"
                break;
            case Sender.ERROR_TYPE_NOT_FOUND:
                status = 404;
                error.result = "Unknown resource"
                break;
            default /*ERROR_TYPE_PARAMETER*/:
                status = 400;
                error.result = "Invalid request's parameters!";
                break;
        }
        response.status(status).json(error);
    }

    public sendResult(response: Response, httpCode: number, result: any){
        let data: any = {"status": "success", "result": ""};
        data.result = result;
        response.status(httpCode).json(data);
    }
}