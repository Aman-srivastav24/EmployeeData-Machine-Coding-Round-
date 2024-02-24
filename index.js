(async function () {
    const data = await fetch('./data.json');
    const res = await data.json();
    let employees = res;

    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employee_names");
    const employeeSingleInfo = document.querySelector(".employee_info_single");
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");

    //Add Employee Logic
    createEmployee.addEventListener("click",()=>{
        addEmployeeModal.style.display = "flex";
    });
    addEmployeeModal.addEventListener("click",(e)=>{
        if(e.target.className==="addEmployee"){
            addEmployeeModal.style.display="none";
        }
    })
    const dobInput = document.querySelector(".addEmployee_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}` 

    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        console.log(values);
        let empData ={};
        values.forEach((val)=>{
            empData[val[0]] = val[1];
        })
        empData.id = employees[employees.length-1].id +1;
       
            empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
        
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        console.log(empData)
        employees.push(empData);
        renderEmployee();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";

    })

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