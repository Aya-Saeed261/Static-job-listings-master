import remove from "../images/icon-remove.svg";

const Key = ({ filter, onRemove }) => {
  return (
    <div className="d-flex">
      <span className="filter d-inline-block rounded-start">{filter}</span>
      <button
        type="btn"
        className="remove-btn btn bg-dark-cyan rounded-0 rounded-end"
        onClick={() => onRemove(filter)}
      >
        <img src={remove} alt="remove icon" />
      </button>
    </div>
  );
};

export default Key;
