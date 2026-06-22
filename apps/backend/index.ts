import express from 'express';
import { PreInterviewBody } from './types';
import axios from 'axios';
import { scrapeGithub } from './github';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/v1/pre-interview', async (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body); // here two variables are returned, success is a boolean indicating if the parsing was successful, and data is the parsed data if successful, or an error object if not.

    if (!success) {
        return res.status(411).json({
            message: 'Incorrect body'
        });
    }


    const githubUrl = data.github.endsWith('/') ? data.github.slice(0, -1) : data.github;

    const githubUsername = githubUrl.split('/').pop();

    const githubData = await scrapeGithub(githubUsername);

    console.log(githubData);
});



app.listen(3000);
