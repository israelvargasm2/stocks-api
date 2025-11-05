export class UserEntity {
    constructor(
        public readonly id: number,
        public email: string,
        public name: string,
        public provider: string,
        public picture?: string
    ) { }
}
