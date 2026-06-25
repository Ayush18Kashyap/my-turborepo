import { useState } from "react";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "./lib/config";
import axios from "axios";

export function Form() {

    const [github, setGithub] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    async function onSubmit() {
        if (!github) {
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        const response = await axios.post(`${BACKEND_URL}/api/v1/pre-interview`,{
            github
        });
        setLoading(false);
        navigate(`/interview/${response.data.id}`);
    }
    return (
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">AI Interviewer</h2>
                <div>
                    <input type="text" placeholder="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} className="p-4" />
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={onSubmit} type="button" disabled={loading}>
                        {loading ? "Submitting..." : "Start Interview"}
                    </button>
                </div>
            </div>
    )
}
