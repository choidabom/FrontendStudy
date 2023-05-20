import { API_URL } from "./Config";
import { imageDataToURL } from "./imageDataToURL";

const fetchVariation = async (imageData: ImageData) => {
    const imageURL = imageDataToURL(imageData);
    console.log(imageURL);
    try {
        const url = `${API_URL}/variation`;
        let requestOptions: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: null,
                fromOutput: 5,
                upload: imageURL,
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

export { fetchVariation };