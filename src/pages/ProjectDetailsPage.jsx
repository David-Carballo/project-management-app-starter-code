import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetailsPage () {

  const {projectId} = useParams();

  const [project, setProject] = useState(null);

  useEffect(()=>{
    getData();
  }
  ,[])

  const getData = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}?_embed=tasks`)
      // console.log(data);
      setProject(data)
    } catch (error) {
      console.log(error)
    }
  }

  if(project === null) return <h3>Loading...</h3>
  
  return (
    <div className="ProjectDetailsPage">

      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      {/* ... list of all Tasks for this Project should be rendered here */}
      {project.tasks.map((task)=>{
        return <TaskCard key={task.id} {...task}/>
      })}

      {/* example of a single TaskCard being rendered */}
      {/* <TaskCard /> */}

      {/* ... form for adding a new Task should be rendered here    */}
      <AddTask getData={getData}/>

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}

export default ProjectDetailsPage;
