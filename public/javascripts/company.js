$(".compBtn").click(function () {
  $("#compContainer").css("display", "block");
  $("#employeesContainer").css("display", "block");
  $("#employeeInfo").css("display", "none")
  let companyName = `${$(this).attr("companyName")}`;

  $.ajax({
    method: "GET",
    url: `/company/${$(this).attr("companyId")}`,
    success: function (data) {
      let company = $("#compContainer");
      for (var i = 0; i < data.length; i++) {
        let date = data[i].CreatedAt;
        date = new Date();
        date.toDateString();
        let name = data[i].userName;
        let regNum = data[i].registrationNumber;
        let city = data[i].city;
        let state = data[i].state;
        let num = data[i].contactNumber;
        let id = data[i]._id;
        company.html(`<p><strong>Company Name: </strong> ${name}</p>
          <p><strong>Registration Number : </strong> ${regNum}</p>
          <p><strong>City : </strong> ${city}</p>
          <p><strong>State : </strong> ${state}</p>
          <p><strong>Phone number : </strong> ${num}</p>
          <p><strong>Creation Date : </strong> <br> ${date}</p>
          <button companyId='${id}' id='updateBtn' class='btn ml-3 btn-outline-warning'>Update</button>
          <button companyId='${id}' id='deleteBtn' class='btn ml-3 btn-outline-warning'>Remove</button>`);
        $(document).on("click", "#updateBtn", function () {
          company.html(`<form class="form-floating">
          <label class='updateBtn' for="userName"><p><strong>Company Name:</strong></label>
          <br>
          <input type="text" class='updateInput' id="userName" value='${name}' readonly>
          <input type="text" class='updateInput' id="registrationNumber" value='${regNum}' hidden>
          <label for="userName"><p><strong>City : </strong></label>
          <br>
          <input type="text" class='updateInput' id="city" value='${city}'>
          <label for="userName"><p><strong>State:</strong></label>
          <br>
          <input type="text" class='updateInput' id="state" value='${state}'>
          <label for="userName"><p><strong>Contact Number:</strong></label>
          <br>
          <input type="text" class='updateInput' id="contactNumber" value='${num}'>
          <br>
          <button companyId='${id}' id='saveUpdateCompany' class='btn ml-3 btn-outline-warning mt-3'>Update</button>
        </form>`);
        });
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

  $.ajax({
    type: "get",
    url: `/employee/companyEmployees/${$(this).attr("companyId")}`,
    success: function (response) {
      let container = document.getElementById("employeesContainer");

      if (response.length === 0) {
        container.innerHTML = "";
        let employeeTitles = document.createElement("h3");
        employeeTitles.classList.add("text");
        employeeTitles.innerHTML = "Employees";
        container.appendChild(employeeTitles);
        let add = document.createElement("div");
        add.innerHTML = `<button type="button" companyName='${companyName}' id="createEmployee" class="btn col-8 btn-outline-warning" style='height: 200px'>+</button>`;
        add.classList.add(
          "d-flex",
          "align-items-center",
          "justify-content-center"
        );
        add.style.height = "350px";
        container.appendChild(add);
      } else {
        container.innerHTML = "";
        container.style.display = "block";
        let list = document.createElement("ul");
        let employeeTitles = document.createElement("h3");
        employeeTitles.classList.add("text");
        employeeTitles.innerHTML = "Employees";
        response.forEach((employee) => {
          let button = document.createElement("button");
          button.innerHTML = employee.name + " " + employee.familyName;
          button.setAttribute("employeeId", employee._id);
          button.classList.add("employeeBtn");

          let elem = document.createElement("li");
          container.appendChild(employeeTitles);
          elem.appendChild(button);
          list.appendChild(elem);
          container.appendChild(list);
        });
        let add = document.createElement("button");
        add.innerHTML = "+";
        add.setAttribute("companyName", `${companyName}`);
        add.classList.add("btn", "col-12", "btn-outline-warning");
        add.id = "createEmployee";
        container.appendChild(add);
      }
    },
  });
});

$(document).on("click", "#deleteBtn", function () {
  console.log(this.id);

  $.ajax({
    method: "delete",
    url: `/company/deleteCompany/${$(this).attr("companyId")}`,
    success: function (data) {
      setTimeout(function () {
        window.location.reload(1);
      }, 1500);
    },
    error: function (err) {
      console.log(err);
    },
  });
});

$(document).on("click", ".employeeBtn", function () {
  let employee = $("#employeeInfo");
  employee.html("");
  employee.css("display", "block");

  $.ajax({
    method: "get",
    url: `/employee/findOne/${$(this).attr("employeeId")}`,
    success: function (data) {

      for (let i = 0; i < data.length; i++) {
        let isAdmin = data[i].isAdmin;

        if (isAdmin === true) {
          $(`<p><strong>Role : </strong> Admin</p>`).appendTo(employee);
        } else {
          $(`<p><strong>Role : </strong> Employee</p>`).appendTo(employee);
        }

        $(`<p><strong>Full Name: </strong> ${data[i].name} ${data[i].familyName}</p>
          <p><strong>Sex : </strong> ${data[i].sex}</p>
          <p><strong>National Code : </strong> ${data[i].nationalCode}</p>
          <button employeeId='${data[i]._id}'  id='deleteEmployee' class='btn ml-3 btn-outline-warning'>Delete</button>
          <button employeeId='${data[i]._id}' company='${data[i].company}' employeeName='${data[i].name}' age='${data[i].age}' sex='${data[i].sex}' nationalCode='${data[i].nationalCode}' employeeFamilyName='${data[i].familyName}' id='updateEmployee' class='btn ml-3 btn-outline-warning'>Update</button>
          `).appendTo(employee);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
});

$(document).on("click", "#createEmployee", function () {
  let employee = $("#employeeInfo");
  employee.html(` 
  <form action="/employee/createEmployee" method="POST" class='mt-3'>
    <label class="updateBtn" for="name"><strong>Name:</strong></label>
    <input type="text" class="updateInput mb-3 mr-5" name="name"/>
  
    <label for="familyName"><strong>Family Name : </strong></label>
    <input type="text" class="updateInput mb-3" name="familyName" />

    <br>

    <label for="nationalCode"><strong>National Code:</strong></label>
    <input type="number" class="updateInput mb-3 mr-5" name="nationalCode" />
  
    <label for="age"><strong>Age:</strong></label>
    <input type="number" class="updateInput mb-3 mr-5" name="age"/>
  
    <label for="company"><strong>Company:</strong></label>
    <input type="text" class="updateInput mb-3" name="company" value='${$(
      this
    ).attr("companyName")}' readonly>

    <br>

    <label for="isAdmin"><strong>Role:</strong></label>
    <select name='isAdmin' id="genderSelector" class="updateInput mb-3 mr-5">
      <option class="dropdown" value='true'>CEO</option>
      <option class="dropdown" value='false'>Employee</option>
    </select>

   
    <label for="sex"><strong>Sex:</strong></label>
    <select name='sex' id="genderSelector" class="updateInput mb-3">
      <option class="dropdown" value='Male'>Male</option>
      <option class="dropdown" value='Female'>Female</option>
    </select>

 

    <br>

    <button class="btn col-3 btn-outline-warning mt-3">Create</button>
  </form>
  `);
  employee.css("display", "block");
});

$(document).on("click", "#saveUpdateCompany", function () {
  let name = $('#userName').val();
  let regNum = $('#registrationNumber').val();
  let phoneNumber = $('#contactNumber').val();
  let city = $('#city').val();
  let state = $('#state').val();

  $.ajax({
    url: `/company/updateCompany/${$(this).attr("companyId")}`,
    data: JSON.stringify({"userName": name, "registrationNumber": regNum, "contactNumber": phoneNumber, "city": city, "state": state}),
    processData: false,
    type: 'PUT',
    contentType: 'application/json',
    success: function (data) {
      setTimeout(function () {
        window.location.reload(1);
      }, 1500);
    }
  });
});

$(document).on("click", "#createComp", function () {
  $("#page-contents").html("display", "none");
  $("#makeCompany").css("display", "block");
});

$(document).on("click", "#deleteEmployee", function () {
  $.ajax({
    type: "delete",
    url: `/employee/${$(this).attr("employeeId")}`,
    success: function (response) {
      setTimeout(function () {
        window.location.reload(1);
      }, 1500);
    },
  });
});


$(document).on("click", "#updateEmployee", function () {
  let employee = $("#employeeInfo");
  let employeeId = `${$(this).attr("employeeId")}`;
  
  employee.html(` 
  <form id='updateEmpForm' class='mt-3'>
    <strong>Full Name: ${$(this).attr("employeeName")} ${$(this).attr("employeeFamilyName")} </strong>
    <input type="text" class="updateInput mb-3 mr-5" id="name" name="name" value='${$(this).attr("employeeName")}' hidden>
    <input type="text" class="updateInput mb-3 mr-5" id="familyName" name="familyName" value='${$(this).attr("employeeFamilyName")}' hidden>
    <input type="text" class="updateInput mb-3 mr-5" id="age" name="age" value='${$(this).attr("age")}' hidden>
    <input type="text" class="updateInput mb-3 mr-5" id="sex" name="sex" value='${$(this).attr("sex")}' hidden>
    <input type="text" class="updateInput mb-3 mr-5" id="nationalCode" name="nationalCode" value='${$(this).attr("nationalCode")}' hidden>
    <br>
    <br>



    <label for="isAdmin"><strong>Role:</strong></label>
    <select name='isAdmin' id="roleSelector" class="updateInput mb-3 mr-5">
      <option class="dropdown" value='true'>CEO</option>
      <option class="dropdown" value='false'>Employee</option>
    </select>

   
    <label for="company"><strong>Company:</strong></label>
    <input type="text" class="updateInput mb-3 mr-5" id="company"  name="company" value='${$(this).attr("company")}'>


 

    <br>

    <button type='submit' value='submit' employeeId='${$(this).attr("employeeId")}' id='employeeUpdateBtn' class="btn col-3 btn-outline-warning mt-3">Update</button>
  </form>
  `);
  employee.css("display", "block");
});



$(document).on('click', '#employeeUpdateBtn', function (event) {
  event.preventDefault();

  let nationalCode = $('#nationalCode').val();
  let sex = $('#sex').val()
  let age = $('#age').val()
  let name = $('#name').val()
  let familyName = $('#familyName').val()
  let roleSelector = $('#roleSelector').val()
  let company = $('#company').val()



  $.ajax({
      url: `/employee/updateEmployee/${$(this).attr("employeeId")}`,
      data: JSON.stringify({"name": name, "familyName": familyName, "nationalCode": nationalCode, "sex": sex, "age": age, "company": company, "isAdmin": roleSelector }),
      processData: false,
      type: 'PUT',
      contentType: 'application/json',
      success: function (data) {
        setTimeout(function () {
          window.location.reload(1);
        }, 1500);
      }
  });


});

