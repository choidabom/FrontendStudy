import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();
const PORT: number = 3000;
app.use(cors());
app.use(bodyParser.json());

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
    const base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, '');
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

