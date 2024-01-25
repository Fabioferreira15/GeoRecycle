import API_URL from "./config";


export const LojaService = {
    async getAllItems() {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/loja/admin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data.items;
        } else {
            throw (response.message);
        }
    },
    async getItemsUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/loja`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data.items;
        } else {
            throw (response.message);
        }
    },
    async buyItem(id) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/loja/comprar/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            if (data) {
                return data;
            } else {
                throw (data.msg);
            }
        } else {
            const data = await response.json();
            throw (data.msg);
        }

    },
    async deleteItem(id) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/loja/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            throw (response.msg);
        }
    },

    async editItem(id, data) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/loja/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                preco: data.preco,
                stock: data.stock
            })
        });
        if (response.ok) {
            let data = await response.json();
            if (data) {
                return data;
            } else {
                throw (data.message)
            }
        }
    }
}
