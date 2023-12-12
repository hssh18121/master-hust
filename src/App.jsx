import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./layout";
import { DetailPost, Topics } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/topics" element={<Topics />} />
        <Route path="/posts/detail/:id" element={<DetailPost />}/>
      </Route>
    </Routes>
  );
}

export default App;
