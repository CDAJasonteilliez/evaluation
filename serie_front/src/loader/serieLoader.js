import { getSeries } from "../apis/series";

export async function seriesLoader() {
    const series = await getSeries()
    return  series;
}