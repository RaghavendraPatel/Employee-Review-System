import { createContext, useContext, useState } from "react";

const ActiveEmployeeContext = createContext();

export const ActiveEmployeeProvider = ({ children }) => {
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [activeEmployeeOptions, setActiveEmployeeOptions] = useState(null);
  const [activeAssignForm, setActiveAssignForm] = useState(false);
  const [assignFormFor, setAssignFormFor] = useState(null);
  const [activeEmployeeEditForm, setActiveEmployeeEditForm] = useState(false);
  const [employeeEditFormFor, setEmployeeEditFormFor] = useState(null);

  const setActiveEmployeeContext = (employee) => {
    setActiveEmployee(employee);
  };

  const setActiveEmployeeOptionsContext = (employee) => {
    setActiveEmployeeOptions(employee);
  };

  const setActiveAssignFormContext = (bool) => {
    setActiveAssignForm(bool);
  };

  const setAssignFormForContext = (employee) => {
    setAssignFormFor(employee);
  };

  return (
    <ActiveEmployeeContext.Provider
      value={{
        activeEmployee,
        setActiveEmployeeContext,
        activeEmployeeOptions,
        setActiveEmployeeOptionsContext,
        activeAssignForm,
        setActiveAssignFormContext,
        assignFormFor,
        setAssignFormForContext,
        activeEmployeeEditForm,
        setActiveEmployeeEditForm,
        employeeEditFormFor,
        setEmployeeEditFormFor,
      }}
    >
      {children}
    </ActiveEmployeeContext.Provider>
  );
};

export const useActiveEmployeeContext = () => useContext(ActiveEmployeeContext);
