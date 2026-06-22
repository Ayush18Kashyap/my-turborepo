import axios from 'axios';

export const scrapeGithub = async (username: any) => {
    const githubRepos = await axios.get(`https://api.github.com/users/${username}/repos`, {
        // proxy: {
        //     host: ''
        //     port: 8080
        //     auth:{
        //         username:''
        //         password:''
        //     }
        //     protocol : 'http'
    });
    const filteredRepos = githubRepos.data.map((repo: any) => ({
        description: repo.description,
        name: repo.name,
        fullName: repo.full_name,
        starcount: repo.stargazers_count
    }));
    return filteredRepos;
};