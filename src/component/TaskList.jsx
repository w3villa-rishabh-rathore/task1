import { React, useState } from "react";

const TaskList = ({ t, index }) => {


  // delete task
  const handleDelete = async (e) => {
    e.preventDefault();
    
    console.log("Deleting task:", t.sNo);
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.filter(task => task.sNo !== t.sNo);

  const reNumberedTasks = updatedTasks.map((task, index) => ({
        ...task,
        sNo: index + 1
    }));

localStorage.setItem("tasks", JSON.stringify(reNumberedTasks));

  
    alert("Task deleted successfully!");
    window.location.reload();
  };

  const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [selectedTaskSNo, setSelectedTaskSNo] = useState(null); // or an ID



const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!title || !description) {
        alert("Please fill all the fields");
        return;
    }

    console.log("Updating task:", selectedTaskSNo, title, description);

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = existingTasks.map(task => {
        if (task.sNo === selectedTaskSNo) {
            return {
                ...task,
                title: title,
                description: description
            };
        }
        return task;
    });


    console.log("Updating task:", selectedTaskSNo, title, description);

    

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    setTitle("");
    setDescription("");
    setSelectedTaskSNo(null);
    alert("Task updated successfully!");
    window.location.reload();
};


  return (
    <tr key={t._id}>
      <td>{index + 1}</td>
      <td>{t.title}</td>
      <td className="whitespace-normal break-words max-w-xs">{t.description}</td>
      <td className="text-right">
        <div className="flex justify-end gap-2">
     

          {/* Edit Task Button */}
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              document.getElementById(`modal-${t.sNo}`).showModal();
              setTitle(t.title);
              setDescription(t.description);
              setSelectedTaskSNo(t.sNo); // Set the selected task's sNo for updating
            }}
          >
            Edit Task
          </button>

          {/* Unique Modal per Task */}
          <dialog id={`modal-${t.sNo}`} className="modal">
            <div className="modal-box">
              <fieldset className="fieldset rounded-box w-auto p-4">
                <label className="label">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                  placeholder="Description"
                />

               
              </fieldset>

              <div className="modal-action">
                <button onClick={handleUpdateTask} className="btn btn-primary">
                  Update Task
                </button>
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          {/* Delete Button */}
          <button onClick={handleDelete} className="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskList;