import { deletionResult } from "./deletionResult";
import { SubjectNCategory } from "./sub_cat_model";
import { updateResult } from "./updateResult";
import {Question} from "./question";


export interface endpointResponse {
    status: string;
    result: string|deletionResult|updateResult|Question|SubjectNCategory[]|Question[];
  }
