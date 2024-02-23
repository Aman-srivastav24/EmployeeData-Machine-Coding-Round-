(async function () {
    const data = await fetch('./data.json');
    const res = await data.json();
    let employees = res;

    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employee_names");
    const employeeSingleInfo = document.querySelector(".employee_info_single");

    //Add Employee Logic

    //Select EMployee
    employeeList.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id);
        selectedEmployeeId = e.target.id;
        renderEmployee();
        renderSingleEmployee();
    })

    const renderEmployee = () => {
        employeeList.innerHTML = "";
        employees.forEach(emp => {
            const employee = document.createElement("span");
            employee.classList.add("employees_names__item");

            if (parseInt(selectedEmployeeId, 10) === emp.id) {
                employee.classList.add("selected");
                selectedEmployee = emp;
            }
            employee.setAttribute("id", emp.id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`
            employeeList.append(employee)
        });
    }
    //Render Single Employee
    const renderSingleEmployee = () => {

        employeeSingleInfo.innerHTML = `<img src="${selectedEmployee.imageUrl}"/> 
        <span class="employees_single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span> ${selectedEmployee.address}</span>
        <span> ${selectedEmployee.email}</span>
        <span> Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
        `;
        
    }
    if(selectedEmployee ) renderSingleEmployee();
    renderEmployee();
})();