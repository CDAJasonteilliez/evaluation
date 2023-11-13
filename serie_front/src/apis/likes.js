export async function changeLikes(values) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/likes/changeLikes",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error change likes");
      }
    }
  } catch (error) {
    console.error(error);
  }
}
