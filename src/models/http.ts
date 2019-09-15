export interface HttpError<T> {
  status: number;
  data: T;
}
