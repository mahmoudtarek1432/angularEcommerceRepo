
export class UserManagerResponse{ //object used to recive response for http operations
    isSuccessful:boolean;

    message:string;

    errors?:string[];

    expireDate?: string;
}