import { API_URL } from "./Config";

const fetchGeneration = async (prompt: string) => {
    try {
        const url = `${API_URL}/generation`;
        // const url = `https://report.vcatdev.com/dalle`;
        let requestOptions: RequestInit = {
            method: "POST",
            headers: {
                // "Authrization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicnMvcGl4YXIiLCJycy92aXNwb3QiLCJycy9iaWxsIiwicnMvcGlmbG93Il0sInVzZXJfbmFtZSI6ImR5ZHRqcjE3MTdAcGlvbmNvcnAuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInBpZCI6MCwiaWQiOjM0NjUsImV4cCI6MjAxODk5NjAyNCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9WU19VU0VSIiwiUk9MRV9WU19BRE1JTiIsIlJPTEVfVlNfRU1QTE9ZIiwiUk9MRV9WU19DSEFSR0VEX0FDQ0VTUyJdLCJqdGkiOiJkNjkzMmM3OS00N2NmLTQ2OTgtYTY3My0wMjg1ZDIyZDY3OWIiLCJlbWFpbCI6ImR5ZHRqcjE3MTdAcGlvbmNvcnAuY29tIiwiY2xpZW50X2lkIjoiZGV2ZWxvcGVyIn0.JYl_DBUuGmywSodKx3cfOgCLhl445tY0uqbNstFG9Q0m7GYxgkvgo-skapQCWTh5mO_P70w8Gv1dIEvVby-45LB_yYb6qLO6DjSW20Yb_7JeHWMCnlEp0qczFJ-KsR03d2c93Of75VnGaE3CoGw-yOiEJP3R-cUA6p_ycuBDK14",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                fromOutput: 5,
                upload: null,
                mask: null
            })
        };
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const result = await response.text();
            console.log('POST 요청이 성공적으로 전송되었습니다.', result);
            return result;
        } else {
            throw new Error('POST 요청 중에 오류가 발생했습니다.');
        }
    } catch (error) {
        console.log(error);
    }
};

export { fetchGeneration };