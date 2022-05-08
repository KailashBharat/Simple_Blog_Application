import "./styles/App.css";
import CreateBlog from "./components/CreateBlog";
import Blogs from "./components/Blogs";

function App() {
  
  return (
    <div className="App">
      <CreateBlog />
      <Blogs/>
    </div>
  );
}

export default App;
