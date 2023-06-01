export class InvalidFormException extends Error {
    constructor(msg = ""){
        super(msg);
        this.name = InvalidFormException.name;
    }
}