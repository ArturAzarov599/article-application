import { IAuth } from "src/interfaces/auth.interface";

export interface IExtendedAuth extends IAuth {
  username: string;
}
