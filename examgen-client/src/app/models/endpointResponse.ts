import { deletionResult } from "./deletionResult";
import { Subject } from "./subject";
import { updateResult } from "./updateResult";


export interface endpointResponse {
    status: string;
    result: string|deletionResult|updateResult|Subject[]|any[];
  }