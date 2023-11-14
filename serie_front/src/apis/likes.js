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

export async function changeMaNote(values) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/likes/changeMaNote",
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
        throw new Error("Error change ma note");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function changeEnCours(values) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/likes/changeEnCours",
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
        throw new Error("Error change en cours");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function changeWishList(values) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/likes/changeWishList",
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
        throw new Error("Error change wish list");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function changeComments(values) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/likes/changeComments",
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
        throw new Error("Error change comments");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getComments(id) {
  try {
    const response = await fetch(`http://localhost:8000/api/likes/getComments/${id}`);
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Error get comments");
      }
    }
  } catch (error) {
    console.error(error);
  }
}