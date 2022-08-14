import {useReducer} from "react";

import "./App.css";

// 1. init state
const initState = {
   job: "",
   jobs: [],
   doneJobList: [],
};

// 2. Actions
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DONE_JOB = "done_job";
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

const doneJob = (payload) => {
   return {
      type: DONE_JOB,
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

      case DONE_JOB:
         let doneJobsListUpdate = [...state.doneJobList];

         let chooseIndex = doneJobsListUpdate.includes(action.payload);

         if (chooseIndex === false) {
            // chưa có trong mảng
            doneJobsListUpdate.push(action.payload);
         } else {
            let newDoneJobsListUpdate = doneJobsListUpdate.filter(
               (job) => job !== action.payload
            );
            doneJobsListUpdate = newDoneJobsListUpdate;
         }

         newState = {
            ...state,
            doneJobList: doneJobsListUpdate,
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

   const {job, jobs, doneJobList} = state;

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addJob(job));
      dispatch(setJob(""));
   };

   return (
      <div className="app">
         <div className="container">
            <header>
               <h1>Todo App</h1>
               <form id="new-task-form">
                  <input
                     value={job}
                     type="text"
                     name="new-task-input"
                     id="new-task-input"
                     placeholder="Enter job"
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
                  <div id="tasks">
                     <div>
                        {jobs.map((job, index) => {
                           return (
                              <div className="task" key={index}>
                                 <div className="content">
                                    <div
                                       className={`${
                                          doneJobList.includes(job) === true
                                             ? "doneJob"
                                             : ""
                                       }`}>
                                       {job}
                                    </div>
                                 </div>
                                 <div className="actions">
                                    <button
                                       onClick={() => dispatch(doneJob(job))}
                                       className="done">
                                       {doneJobList.includes(job) ? (
                                          <div style={{color: "crimson"}}>
                                             Undo
                                          </div>
                                       ) : (
                                          <div>Done</div>
                                       )}
                                    </button>
                                    <button
                                       onClick={() =>
                                          dispatch(editJob(job, index))
                                       }
                                       className="edit">
                                       Edit
                                    </button>
                                    <button
                                       onClick={() =>
                                          dispatch(deleteJob(index))
                                       }
                                       className="delete">
                                       Delete
                                    </button>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
}

export default App;
