import { React, use, useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";

const Dashboard = () => {
  
  const user = localStorage.getItem("taskmanageruser");
  const [title, setTitle] = useState("");
  const [description, setDescription] =useState("");
  const [status, setStatus] = useState("");
  const [duedate, setDueDate] = useState("");
  const [task, setTask] = useState([]);

useEffect(() => {   
    getAllTask();
}
, []);


const getAllTask = async () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(storedTasks);
};


const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title || !description) {
        alert("Please fill all the fields");
        return;
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];


    const newTask = {
        sNo: existingTasks.length + 1,
        title: title,
        description: description
    };


    existingTasks.push(newTask);


    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    setTitle("");
    setDescription("");

    alert("Task added successfully!");
      window.location.reload();
};

   


  return (
    <>
    
      {/* add task */}
      <div className="flex justify-center items-center my-6">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Task
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Task</h3>
            <fieldset className="fieldset rounded-box w-auto p-4">

            <label className="label">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Title"
            />
            <label className="label">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              placeholder="Description"
            />
            </fieldset>

            

            <div className="modal-action">
              <button onClick={handleAddTask} className="btn btn-primary">Add task</button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {task.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No tasks available</h1>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table w-100%">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {task.map((t , index) => (
                <TaskList t={t} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Dashboard;