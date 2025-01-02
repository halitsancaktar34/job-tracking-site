import axios from "axios";
import { statusOpt, typeOpt } from "../constants";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data when the component is mounted
  useEffect(() => {
    // 1) Update loading state
    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      // 2) If data is received, update the store
      .then((res) => dispatch(setJobs(res.data)))
      // 3) If there is an error, update the store with the error state
      .catch(() => dispatch(setError()));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get data from the form inputs
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Add an id and creation date to the job
    data.id = v4();
    data.date = new Date().toLocaleDateString();

    // Add the job to both the API and the store
    axios.post("http://localhost:4500/jobs", data).then(() => {
      navigate("/");
      dispatch(createJob(data));
      toast.success("Job Added Successfully");
    });

    // Reset the entire form
    e.target.reset();
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input list="positions" name="position" type="text" required />

            <datalist id="positions">
              {state.jobs
                .reduce((unique, job) => {
                  // If the unique array does not contain the position, add it
                  if (!unique.includes(job.position)) {
                    unique.push(job.position);
                  }
                  return unique;
                }, [])
                .map((position) => (
                  <option key={position} value={position} />
                ))}
            </datalist>
          </div>

          <div>
            <label>Company</label>
            <input list="companies" name="company" type="text" required />
            <datalist id="companies">
              {state.jobs
                .reduce((unique, job) => {
                  // If the unique array does not contain the company name, add it
                  if (!unique.includes(job.company)) {
                    unique.push(job.company);
                  }
                  return unique;
                }, [])
                .map((company) => (
                  <option key={company} value={company} />
                ))}
            </datalist>
          </div>

          <div>
            <label>Location</label>
            <input list="locations" name="location" type="text" required />
            <datalist id="locations">
              {state.jobs
                .reduce((unique, job) => {
                  // If the unique array does not contain the location, add it
                  if (!unique.includes(job.location)) {
                    unique.push(job.location);
                  }
                  return unique;
                }, [])
                .map((location) => (
                  <option key={location} value={location} />
                ))}
            </datalist>
          </div>

          <div>
            <label>Status</label>
            <select name="status" required>
              <option value={""} hidden>
                Select
              </option>
              {statusOpt.map((text) => (
                <option>{text}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select name="type" required>
              <option value={""} hidden>
                Select
              </option>
              {typeOpt.map((text) => (
                <option>{text}</option>
              ))}
            </select>
          </div>

          <div>
            <button className="add-button" type="submit">
              <span className="button_top">Create</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
