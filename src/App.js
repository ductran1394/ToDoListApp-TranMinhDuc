import logo from "./logo.svg";
import {useReducer} from "react";
import "./App.css";

// 1. init state
const initState = {
   job: "",
   jobs: [],
   editToDO: {},
};

// 2. Actions
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";
const EDIT_JOB = "edit_job";

const setJob = (payload) => {
   return {
      type: SET_JOB,
      payload,
   };
};

const addJob = (payload) => {
   return {
      type: ADD_JOB,
      payload,
   };
};

const deleteJob = (payload) => {
   return {
      type: DELETE_JOB,
      payload,
   };
};

const editJob = (payload, index) => {
   return {
      type: EDIT_JOB,
      payload,
      index,
   };
};

// 3. Reducer
const reducer = (state, action) => {
   let newState;

   switch (action.type) {
      case SET_JOB:
         newState = {
            ...state,
            job: action.payload,
         };
         break;
      case ADD_JOB:
         newState = {
            ...state,
            jobs: [...state.jobs, action.payload],
         };
         break;

      case DELETE_JOB:
         const newJobs = [...state.jobs];

         newJobs.splice(action.payload, 1);

         newState = {
            ...state,
            jobs: newJobs,
         };
         break;

      case EDIT_JOB:
         const newEditJobs = [...state.jobs];
         newEditJobs.splice(action.index, 1);

         newState = {
            ...state,
            job: action.payload,
            jobs: newEditJobs,
         };
         break;

      default:
         throw new Error("invalid action");
   }

   return newState;
};

// 4. Dispatch

function App() {
   const [state, dispatch] = useReducer(reducer, initState);

   const {job, jobs} = state;

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addJob(job));
      dispatch(setJob(""));
   };

   return (
      <div className="App">
         <div>
            <header>
               <h1>To do App</h1>
               <form id="new-task-form">
                  <input
                     value={job}
                     type="text"
                     name="new-task-input"
                     id="new-task-input"
                     placeholder="What do you have planned?"
                     onChange={(e) => {
                        dispatch(setJob(e.target.value));
                     }}
                  />
                  <button onClick={handleSubmit} id="new-task-submit">
                     Add
                  </button>
               </form>
            </header>
            <main>
               <section className="task-list">
                  <h2>Tasks</h2>
                  <div id="tasks">
                     <div>
                        {jobs.map((job, index) => (
                           <div className="task" key={index}>
                              <div className="content">{job}</div>
                              <div className="actions">
                                 <button
                                    onClick={() =>
                                       dispatch(editJob(job, index))
                                    }
                                    className="edit">
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => dispatch(deleteJob(index))}
                                    className="delete">
                                    Delete
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
}

export default App;
