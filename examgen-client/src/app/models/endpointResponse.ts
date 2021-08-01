import { deletionResult } from "./deletionResult";
import { Subject } from "./subject";


export interface endpointResponse {
    status: string;
    result: string|deletionResult|Subject[]|any[];
  }