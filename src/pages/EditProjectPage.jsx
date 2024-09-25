import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const {projectId} = useParams();

  useEffect(()=>{
    getProjectData();
  }
  ,[])

  async function getProjectData() {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`)  
      // console.log(response.data);
      // setLoading(true)
      setTitle(data.title);
      setDescription(data.description);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // ...updated logic should be here
    const updatedProject = {
      title,
      description
    }

    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`, updatedProject);
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.log(error);
    }

  };

  const deleteProject = async () => {
    // ...delete logic should be here
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${projectId}`);
      navigate(`/projects/`);
    } catch (error) {
      console.log(error);
    }
  };
  
  if(loading) return <h3>Loading data...</h3>

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
    </div>
  );
}

export default EditProjectPage;
