$(".compBtn").click(function () {
  $("#compContainer").css("display", "block");
  $("#employeesContainer").css("display", "block");
  $("#employeeInfo").empty();

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
          <button companyId='${id}' id='updateBtn' class='btn btn-primary'>Update</button>
          <button companyId='${id}' id='deleteBtn' class='btn btn-danger'>Remove</button>`);
        $(document).on("click", "#updateBtn", function () {
          company.html(`<form class="form-floating">
          <label class='updateBtn' for="userName"><p><strong>Company Name:</strong></label>
          <br>
          <input type="text" class='updateInput' id="userName" value='${name}' disabled>
          <label for="userName"><p><strong>City : </strong></label>
          <br>
          <input type="text" class='updateInput' id="userName" value='${city}'>
          <label for="userName"><p><strong>State:</strong></label>
          <br>
          <input type="text" class='updateInput' id="userName" value='${state}'>
          <label for="userName"><p><strong>Contact Number:</strong></label>
          <br>
          <input type="text" class='updateInput' id="userName" value='${num}'>
          <br>
          <button companyId='${id}' id='updateBtn' class='btn btn-primary mt-3'>Update</button>
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
      console.log(response);
      let container = document.getElementById("employeesContainer");
      let list = document.createElement("ul");
      response.forEach((employee) => {
        let button = document.createElement("button");
        button.innerHTML = employee.name + " " + employee.familyName;
        button.setAttribute("employeeId", employee._id);
        button.classList.add("employeeBtn");

        let elem = document.createElement("li");
        elem.appendChild(button);
        list.appendChild(elem);
        container.appendChild(list);
      });
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
  employee.css("display", "block");

  $.ajax({
    method: "get",
    url: `/employee/findOne/${$(this).attr("employeeId")}`,
    success: function (data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let isAdmin = data[i].isAdmin
        let role = "Admin";

        if (isAdmin === true) {
          
          $(`<p><strong>Role : </strong> ${data[i].role}</p>`).appendTo(employee)
        }
        
        $(`<p><strong>Full Name: </strong> ${data[i].name} ${data[i].familyName}</p>
          <p><strong>Sex : </strong> ${data[i].sex}</p>
          <p><strong>National Code : </strong> ${data[i].nationalCode}</p>`).appendTo(employee)
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
});

$(document).on("click", "#updateBtn", function () {
  $('#employeeInfo').empty();
  $.ajax({
    type: "put",
    url: `/company/updateCompany/${$(this).attr("companyId")}`,
    success: function (response) {
      window.location.reload();
    },
  });
});


$(document).on("click", "#createComp", function () {
  $("#makeCompany").css("display", "block");

});


