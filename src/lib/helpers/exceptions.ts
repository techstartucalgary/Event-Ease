export class InvalidEmailError extends Error {
    constructor (message = `The email you provided is invalid`) {
        super(message);
        this.name = 'InvalidEmailError'
    }
}

export class NameEmptyError extends Error {
    constructor (message = `Name can't be empty`) {
        super(message);
        this.name = 'NameEmptyError'
    }
}

export class NameNotAllowedError extends Error {
    constructor (message = `Name not allowed`) {
        super(message);
        this.name = 'NameNotAllowedError'
    }
}

export class UnknownError extends Error {
    constructor (message = `An unknown error occurred`) {
        super(message);
        this.name = 'UnknownError'
    }
}

export class UserNotFoundError extends Error {
    constructor (message = `Sorry could not find user`) {
        super(message);
        this.name = 'UserNotFoundError'
    }
}