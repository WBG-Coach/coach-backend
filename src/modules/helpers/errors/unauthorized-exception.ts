export default class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedException';
  }
}
