import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectListPage() {

  const [allProjects, setAllProjects] = useState(null);
  
  useEffect(()=>{
    getData();
  }
  , [])

  async function getData() {
    try {
      // const response = await fetch("https://project-management-api-4641927fee65.herokuapp.com/projects");
      // const data = await response.json();
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`)
      console.log(data);
      setAllProjects(data)

    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* ... for each project, we should render one ProjectCard */}
      {allProjects === null ? <h3>Loading...</h3> : (
        allProjects.map((project)=>{
          return (
            <ProjectCard key={project.id} {...project} />
          );
        })
      )}

    </div>
  );
}

export default ProjectListPage;