const Job = ({ job, onFilter }) => {
  return (
    <div
      className={`job pt-5 pt-md-4 pb-4 px-4 shadowed bg-white rounded-3 gap-2 gap-md-0 position-relative d-flex flex-column flex-md-row justify-content-between align-items-md-center ${
        job.featured ? "featured" : ""
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        <img src={job.logo} alt="company logo" className="company-logo" />
        <div>
          <div className="d-flex align-items-center gap-4 gap-md-3">
            <span className="cyan bold size-5">{job.company}</span>
            <div>
              {job.new ? (
                <span className="badge rounded-pill bg-cyan text-uppercase lh-1 me-2">
                  new!
                </span>
              ) : (
                ""
              )}
              {job.featured ? (
                <span className="badge rounded-pill bg-dark text-uppercase lh-1">
                  featured
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <p className="position bold my-1 size-4">{job.position}</p>
          <div className="gray">
            <span className="pe-2 pe-md-3 size-5">{job.postedAt}</span>
            <span>&bull;</span>
            <span className="px-2 px-md-3 size-5">{job.contract}</span>
            <span>&bull;</span>
            <span className="ps-2 ps-md-3 size-5">{job.location}</span>
          </div>
        </div>
      </div>
      <div className="filters d-flex flex-wrap align-items-center gap-3">
        <button
          type="button"
          className="filter btn"
          onClick={() => onFilter(job.role, "role")}
        >
          {job.role}
        </button>
        <button
          type="button"
          className="filter btn"
          onClick={() => onFilter(job.level, "level")}
        >
          {job.level}
        </button>
        {job.languages.length > 0
          ? job.languages.map((lang, indx) => (
              <button
                key={indx}
                type="button"
                className="filter btn"
                onClick={() => onFilter(lang, "languages")}
              >
                {lang}
              </button>
            ))
          : ""}
        {job.tools.length > 0
          ? job.tools.map((tool, indx) => (
              <button
                key={indx}
                type="button"
                className="filter btn"
                onClick={() => onFilter(tool, "tools")}
              >
                {tool}
              </button>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Job;
