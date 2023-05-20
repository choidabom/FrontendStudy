import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();
const PORT: number = 3000;
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(PORT, () => {
    console.log(`Server started. Listen on port ${PORT}`);
});

app.post('/generation', async (req: Request, res: Response) => {
    // const generation = parseInt(req.params.generation.replace(/\D/g, ''), 10);
    const prompt: string = req.body.prompt;
    try {
        if (prompt) {
            console.log(prompt);
            res.status(200).send('된다!');
        } else {
            res.status(500).send('Error');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to ~ .');
    }
});


app.post('/variation', async (req: Request, res: Response) => {
    try {
        // 이미지 데이터를 받아옴
        const { imageData } = req.body;
        if (imageData) {
            res.status(200).send('POST 요청이 성공적으로 처리되었습니다.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
});


// app.post('/your-server-endpoint', (req: Request, res: Response) => {
//     const { imageData } = req.body;

//     // Remove the data URL prefix
//     const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

//     // Save the image to a file
//     fs.writeFile('path/to/save/image.png', base64Data, 'base64', (error) => {
//         if (error) {
//             console.error(error);
//             res.sendStatus(500);
//         } else {
//             res.sendStatus(200);
//         }
//     });
// });



