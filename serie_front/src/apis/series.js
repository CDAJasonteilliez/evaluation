export async function getSeries() {
    try {
        const response = await fetch(
          "http://localhost:8000/api/series/getSeries"
        );
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error recuperation series");
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function addSerie(values) {
    try {
        const response = await fetch("http://localhost:8000/api/series/addSerie", {
          method: "POST",
          body: values,
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error add serie");
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export async function updateSerie(values) {
    try {
        const response = await fetch("http://localhost:8000/api/series/updateSerie", {
          method: "PUT",
          body: values,
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error add serie");
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSerie(values) {
    console.log(values);
    try{
        const response = await fetch(`http://localhost:8000/api/series/deleteSerie/${values}`, {
          method: "DELETE",
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error delete serie");
            }
        }
    } catch (error) {
        console.error(error);
    }
}