import API_URL from './config.js'




export const leaderboardService = {
    async getLeaderboardPoints() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/leaderboard/pontos?limit=10`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.ok) {
            let data = await response.json();
            return data.leaderboard;
        } else {
            throw (response.message);
        }
    },
    async getLeaderboardEcopontos() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/leaderboard/ecopontos?limit=10`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.ok) {
            let data = await response.json();
            return data.leaderboard;
        } else {
            throw (response.message);
        }
    },
}

