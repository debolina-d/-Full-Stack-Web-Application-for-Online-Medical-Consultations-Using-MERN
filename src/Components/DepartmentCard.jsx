import React from "react";

const DepartmentCard = ({ department, onViewClick }) => {
  return (
    <div className="department-card">
      <h3>{department.dept_name}</h3>
      <p>{department.description}</p>
      <button onClick={() => onViewClick(department.dept_name)}>View</button>
    </div>
  );
};

export default DepartmentCard;
