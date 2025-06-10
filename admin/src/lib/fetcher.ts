import dotenv from 'dotenv';

dotenv.config();

export const fetcher = {
  async request<T>(url: string): Promise<Result<T, string>> {
    try {
      const res = await fetch(url, {
        method: `POST`,
        headers: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          'X-SuperAdminToken': process.env.SUPER_ADMIN_TOKEN!,
        },
      });
      const json = (await res.json()) as T;
      return {
        case: `ok`,
        data: json,
      };
    } catch (err) {
      return {
        case: `error`,
        error: String(err),
      };
    }
  },
};
