import { useState } from 'react';
import './App.css'
import { Form } from '@repo/ui/Form';
import { Interview } from '@repo/ui/Interview';
import { Result } from '@repo/ui/Results';
function App() {
  const [page, setPage] = useState<"form" | "interview" | "result">("form");
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {page == "form" && <Form />}
      {page == "interview" && <Interview />}
      {page == "result" && <Result />}
    </div>
  )
}

export default App;
