export interface HttpError<T> extends Response {
  data: T;
}
