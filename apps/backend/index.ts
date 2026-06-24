import express from 'express';
import { PreInterviewBody } from './types';
import axios from 'axios';
import { scrapeGithub } from './scrapers/github';
import cors from 'cors';
import { prisma } from './lib/prisma';


const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/v1/pre-interview', async (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body); // here two variables are returned, 
    // success is a boolean indicating if the parsing was successful, 
    // and data is the parsed data if successful, or an error object if not.

    if (!success) {
        return res.status(411).json({
            message: 'Incorrect body'
        });
    }


    const githubUrl = data.github.endsWith('/') ? data.github.slice(0, -1) : data.github;

    const githubUsername = githubUrl.split('/').pop();

    const githubData = await scrapeGithub(githubUsername);

    const interview =  await prisma.interview.create({
        data:{
            githubMetadata: JSON.stringify(githubData),
            status: 'pre'
        }
    });

    res.json({
        id: interview.id
    });
});



app.listen(3000);
