export class JsonManagerResponse<T>{
    isSuccessful: boolean;
    message: string;
    responseObject: T;
}