var i = 0;
/**
 * @description lấy thông tin tên, các điểm môn học Toán, Lý, Hóa
 * Lưu thông tin vào đối tượng, xóa trường input
 * Tạo hàng mới trong bảng và hiển thị thông tin từ đối tượng      
 */
function addStudent() {
    const nameInput = document.getElementById('studentName');
    const mathInput = document.getElementById('mathScore');
    const physicalInput = document.getElementById('physicalScore');
    const chemistryInput = document.getElementById('chemistryScore');

    if (!validateName(nameInput) || !validateScore(mathInput) || !validateScore(physicalInput) 
        || !validateScore(chemistryInput)) {
        return false;
    }

    var testScore = {
        name: nameInput.value,
        math: mathInput.value,
        physics: physicalInput.value,
        chemistry: chemistryInput.value
    }
    i++;
    nameInput.value = "";
    mathInput.value = "";
    physicalInput.value = "";
    chemistryInput.value = "";

    var table = document.getElementById('table-marksheet');
    var body = table.tBodies;
    var row = body[0].insertRow(-1);
    row.insertCell(0).innerHTML = i;
    row.insertCell(1).innerHTML = testScore.name;
    row.insertCell(2).innerHTML = testScore.math;
    row.insertCell(3).innerHTML = testScore.physics;
    row.insertCell(4).innerHTML = testScore.chemistry;
    row.insertCell(5).innerHTML = "?";
}


/**
 * @description Kiểm tra tên nhập vào nếu rỗng thì thêm vào class is-invalid.
 * @param {String} nameInput - tên của sinh viên
 */
function validateName(nameInput) {
    if (!nameInput.value) {
        nameInput.classList.add("is-invalid");
        return false;
    } else {
        nameInput.classList.remove("is-invalid");
        return true;
    }
}

/**
 * @description Kiểm tra điểm nhâp vào. Nếu rỗng hoặc giá trị không nằm trong khoảng 0-10
 * thì thêm lớp is-invalid
 * @param {number} scoreInput
 */
function validateScore(scoreInput) {
    if (!scoreInput.value || isNaN(scoreInput.value) || scoreInput.value < 0 || scoreInput.value > 10) {
        scoreInput.classList.add("is-invalid");
        return false;
    } else {
        scoreInput.classList.remove("is-invalid");
        return true;
    }
}

/**
 * @description Tính điểm trung bình của sinh viên
 */
function calculateAverage() {
    var table = document.getElementById('table-marksheet');
    for (var i = 1, row; row = table.rows[i]; i++) {
        var totalScore = parseFloat(row.cells[2].innerHTML) + parseFloat(row.cells[3].innerHTML) + parseFloat(row.cells[4].innerHTML);
        var averageScore = (totalScore / 3).toFixed(1);
        row.cells[5].innerHTML = averageScore;
    }
}

/**
 * @description Tô đậm sinh viên giỏi (có điểm trung bình >=8) 
 */
function findGoodStudent() {
    var table = document.getElementById('table-marksheet');
    for (var i = 1, row; row = table.rows[i]; i++) {
        if (row.cells[5].innerHTML >= 8) {
            row.classList.add("table-success");
        }
    }
}

/**
 * @description Sắp xếp sinh viên theo tên
 */
function sortName() {
    var table, rows, arrange, i, x, y, arrangeNext;
    table = document.getElementById("table-marksheet");
    arrange = true;
    /* Bắt đầu vòng lặp */
    while (arrange) {
       
        arrange = false;
        rows = table.rows;
       
        for (i = 1; i < (rows.length - 1); i++) {
           
            arrangeNext = false;
            
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
          
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
               
                arrangeNext = true;
                break;
            }
        }
        if (arrangeNext) {
          
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            arrange = true;
        }
    }
}

/**
 * @description Lọc bảng danh sách với từ khóa nhập vào  
 */
 
function searchByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toLowerCase();
    table = document.getElementById("table-marksheet");
    rows = table.rows;

  
    for (i = 0; i < rows.length; i++) {
        cell = rows[i].cells[1];
        if (cell) {
            txtValue = cell.textContent || cell.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}