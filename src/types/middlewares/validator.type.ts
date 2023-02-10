import { Request } from "express";

export interface IValidatorHandlerRequest extends Request {
  [property: string]: any;
}
