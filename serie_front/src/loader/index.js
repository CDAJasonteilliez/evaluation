import { seriesLoader } from "./serieLoader";
import { userLoader } from "./userLoader";

export async function indexLoader() {
    const serieLoad = await seriesLoader();
    const userLoad = await userLoader();
    return { serieLoad, userLoad }
}