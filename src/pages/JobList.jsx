import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const state = useSelector((store) => store.jobSlice);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="job-page">
      <div className="filter-container">
        <Filter jobs={state.jobs} />
      </div>
      <div className="job-list-container">
        {state.isLoading ? (
          <Loader />
        ) : state.isError ? (
          <div className="refresh-div">
            <p className="error">
              Üzgünüz verilere erişirken bir sorun oluştu.
              <button type="button" onClick={fetchData} className="button">
                <span className="button__text">Tekrar Dene</span>
                <span className="button__icon">
                  <img className="svg" src="/refresh.svg" />
                </span>
              </button>
            </p>
          </div>
        ) : (
          state.jobs?.map((job) => <Card key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
  
};

export default JobList;
