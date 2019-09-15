import * as Http from "@/models/http";

export class HttpService {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error: Http.HttpError<T> = {
      status: response.status,
      data
    };

    throw error;
  }
}

export default new HttpService();
