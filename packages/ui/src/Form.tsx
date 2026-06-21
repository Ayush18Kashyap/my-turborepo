import { useState } from "react";
import { BACKEND_URL } from "./lib/config";
import axios from "axios";

export function Form() {

    const [github, setGithub] = useState('');

    async function onSubmit() {
        if (!github) {
            alert("Please fill in all fields.");
            return;
        }

        await axios.post(`${BACKEND_URL}/api/v1/pre-interview`,{
            github
        })
    }
    return (
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">AI Interviewer</h2>
                <div>
                    <input type="text" placeholder="GitHub URL" onChange={(e) => setGithub(e.target.value)} className="p-4" />
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={onSubmit} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>
    )
}
