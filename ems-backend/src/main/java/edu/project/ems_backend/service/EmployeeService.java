package edu.project.ems_backend.service;

import edu.project.ems_backend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Integer employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Integer employeeId,EmployeeDto updateEmployee);
    void deleteEmployee(Integer employeeId);
}
