import express from 'express';
import { PreInterviewBody } from './types';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/api/v1/pre-interview', (req, res) => {
    const {success,data} = PreInterviewBody.safeParse(req.body); // here two variables are returned, success is a boolean indicating if the parsing was successful, and data is the parsed data if successful, or an error object if not.

    if (!success) {
        return res.status(411).json({ message : 'Incorrect body'});
    }


    const githubUrl = data.github.endsWith('/') ? data.github.slice(0, -1) : data.github;
    const linkedinUrl = data.linkedin.endsWith('/') ? data.linkedin.slice(0, -1) : data.linkedin;

    const githubUsername = githubUrl.split('/').pop();
    const linkedinUsername = linkedinUrl.split('/').pop();

    const githubRepos = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
    const linkedinProfile = await axios.get(`https://api.linkedin.com/v2/profile/${linkedinUsername}`);

};



app.listen(3000);