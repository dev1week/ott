import { describe, expect, it, vi } from "vitest";

vi.mock("axios", () => ({
  default: {
    request: vi.fn(),
  },
}));

const getStoreValue = (store) =>
  new Promise((resolve) => {
    const unsubscribe = store.subscribe((value) => {
      resolve(value);
      unsubscribe();
    });
  });

describe("store.js", () => {
  it("creates TMDB stores with expected responses", async () => {
    vi.stubEnv("VITE_TMDB_API_KEY", "test-key");

    const axios = (await import("axios")).default;
    axios.request.mockImplementation(async (options) => ({
      status: 200,
      data: {
        results: [`results:${options.url}`],
        genres: [`genres:${options.url}`],
      },
    }));

    const storeModule = await import("./store.js");

    expect(axios.request).toHaveBeenCalledTimes(9);
    const nowCall = axios.request.mock.calls.find(([opts]) =>
      opts.url.includes("/now_playing")
    );
    expect(nowCall[0].params.api_key).toBe("test-key");

    const nowPromise = await getStoreValue(storeModule.nowPromise);
    const nowResponse = await nowPromise;
    expect(nowResponse.status).toBe(200);

    const nowsPromise = await getStoreValue(storeModule.nows);
    const nowsData = await nowsPromise;
    expect(nowsData).toEqual([
      "results:https://api.themoviedb.org/3/movie/now_playing",
    ]);

    const genresPromise = await getStoreValue(storeModule.genres);
    const genresData = await genresPromise;
    expect(genresData).toEqual([
      "genres:https://api.themoviedb.org/3/genre/movie/list",
    ]);
  });
});
