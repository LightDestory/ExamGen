import { deletionResult } from "./deletionResult";
import { SubjectNCategory } from "./sub_cat_model";
import { updateResult } from "./updateResult";


export interface endpointResponse {
    status: string;
    result: string|deletionResult|updateResult|SubjectNCategory[]|any[];
  }
