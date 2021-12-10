function SearchStatus({ phrase, length }) {
  const getBageClasses = () => {
    let classes = "badge rounded-pill ";
    classes += length === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };
  return (
    <h2>
      <span className={getBageClasses()}>{phrase(length)}</span>
    </h2>
  );
}

export default SearchStatus;
