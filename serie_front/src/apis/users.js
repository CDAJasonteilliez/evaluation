export async function signup(values) {
    try {
        const response = await fetch("http://localhost:8000/api/users/register", {
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
                throw new Error("Error register");
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export async function signin(values) {
    try {
        const response = await fetch("http://localhost:8000/api/users/login", {
          method: "POST",
          headers:{
            "content-Type": "application/json"
          },
          body: JSON.stringify(values),
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error login");
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(values) {
    try {
        const response = await fetch(`http://localhost:8000/api/users/deleteUser/${values}`, {
            method: "DELETE",
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error delete user");
            }
        }
    } catch (error) {
        console.error(error);
    }
}