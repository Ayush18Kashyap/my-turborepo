import { useState } from 'react';
import './App.css'
import { Form } from '@repo/ui/Form';
import { Interview } from '@repo/ui/Interview';
import { Result } from '@repo/ui/Results';
import { Routes, Route, BrowserRouter } from 'react-router';



function App() {
  const [page, setPage] = useState<"form" | "interview" | "result">("form");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/interview/:interviewId" element={<Interview />} />
        <Route path="/result/:interviewId" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
