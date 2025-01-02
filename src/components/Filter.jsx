import { useDispatch } from "react-redux";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";

const Filter = ({ jobs }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "company", text }));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>
      <form>
        <div>
          <label htmlFor="search-input">Search by company name:</label>
          <input
            id="search-input"
            onChange={(e) => setText(e.target.value)}
            list="positions"
            name="position"
            type="text"
          />

          <datalist id="positions">
            {jobs
              .reduce((unique, job) => {
                // If the unique array does not contain the company name, add it
                if (!unique.some((item) => item.company === job.company)) {
                  unique.push(job);
                }
                return unique;
              }, [])
              .map((job) => (
                <option key={job.company} value={job.company} />
              ))}
          </datalist>

          <datalist id="positions">
            {jobs.map((job) => (
              <option key={job.company} value={job.company} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="status-select">Status</label>
          <select
            id="status-select"
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
            <option hidden>Select</option>
            {statusOpt.map((text, index) => (
              <option key={index}>{text}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type-select">Type</label>
          <select
            id="type-select"
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option hidden>Select</option>
            {typeOpt.map((text, index) => (
              <option key={index}>{text}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort-select">Sort</label>
          <select
            id="sort-select"
            name="sort"
            onChange={(e) => dispatch(sortJobs(e.target.value))}
          >
            <option hidden>Select</option>
            {sortOpt.map((text, index) => (
              <option key={index}>{text}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            className="add-button"
            onClick={() => dispatch(clearFilters())}
            type="reset"
          >
            <span className="button_top">Reset Filters</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
