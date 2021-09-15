$(document).ready(function() {
    $("#studentName").focus();
    // Kiểm tra tên nhập vào, không được để trống
    $("#studentName").on('blur', function(){
        if(!$("#studentName").val()) {
            $("#studentName").addClass('is-invalid')
            $("#studentName").parent().siblings('.error-text').show();
        } else {
            $("#studentName").removeClass('is-invalid').addClass('is-valid');
            $("#studentName").parent().siblings('.error-text').hide();
        }
    });
    // Kiểm tra điểm số nhập vào phải trong khoảng 0 đến 10
    $("#mathScore").on('blur keyup', function(){
        validateScore($(this));
    });
    $("#physicalScore").on('blur keyup', function(){
        validateScore($(this));
    });
    $("#chemistryScore").on('blur keyup', function(){
        validateScore($(this));
    });

    /**
     * @description kiểm tra giá trị nhập
     * @param {selector} el giá trị nhập
     */
    function validateScore(el) {
        if(!$(el).val() || $(el).val() > 10 || $(el).val() < 0 ) {
            $(el).addClass('is-invalid')
            $(el).parent().siblings('.error-text').show();
        } else {
            $(el).removeClass('is-invalid').addClass('is-valid');
            $(el).parent().siblings('.error-text').hide();
        }
    }
    /**
     * @description Thêm thông tin điền vào bảng
     * Phải điền đủ thông tin trước khi được nhập vào bảng
     * Tất cả các trường input được xóa sau khi giá trị được nhập
    */
    var i = 0;
    $("#marksheet-submit").click(function(event) {
        validateScore($("#mathScore"));
        validateScore($("#physicalScore"));
        validateScore($("#chemistryScore"));
        if ($("input").hasClass('is-invalid')) {
            alert("Nhập lại phần còn thiếu");
        } else {
            i++;
            var testScore = {
                name: $("#studentName").val(),
                math: $("#mathScore").val(),
                physics: $("#physicalScore").val(),
                chemistry: $("#chemistryScore").val()
            }

            $("#studentName").val("").focus();
            $("#mathScore").val("");
            $("#physicalScore").val("");
            $("#chemistryScore").val("");

            $("table tbody").append(
                '<tr><td>' + i +
                '</td><td>' + testScore.name +
                '</td><td>' + testScore.math +
                '</td><td>' + testScore.physics +
                '</td><td>' + testScore.chemistry +
                '</td><td>?</td></tr>');
            
            $("input").each(function(index, el) {
                $(this).removeClass('is-valid');
            });
        }
    });

    /**
     * @description Tính điểm trung bình của mỗi sinh viên.
     */
    $("#calculateAverage").click(function() {
        $("table tbody tr").each(function() {
            var averageScore = ((
                parseFloat($(this).children('td:nth-child(3)').text()) +
                parseFloat($(this).children('td:nth-child(4)').text()) +
                parseFloat($(this).children('td:nth-child(5)').text())) / 3).toFixed(1);
            
            $(this).children('td:nth-child(6)').text(averageScore);
        });
    });


    /**
     * @description Xác định sinh viên giỏi có điểm trung bình >=8
     */
    $("#specifyGoodStudent").click(function() {
        $("table tbody tr").each(function() {
                $(this).toggleClass("table-success", $(this).children('td:last-child').text() >= 8)
        });
    });

    /**
     * @description Tìm sinh viên theo tên
     */
    $("#search-input").on('keyup', function(){
        var value = $(this).val().toLowerCase();
        $("#table-marksheet tbody tr").each(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    /**
     * @description Sắp xếp bảng theo tiêu đề cột
     * Khi nhấn vào tiêu đề mỗi bảng sẽ sắp xếp theo thứ tự tăng dần
     * Nhấn thêm lần nữa sẽ sắp xếp theo thứ tự giảm dần
     */

    $('th').each(function(col) {
        $(this).hover(
        
            function() { $(this).addClass('focus'); },
            function() { $(this).removeClass('focus'); 
            });        
        $(this).click(function() {
            if ($(this).is('.asc')) {
                $(this).removeClass('asc bg-success');
                $(this).addClass('desc selected');
                sortOrder = -1;
            } else {
                $(this).addClass('asc selected');
                $(this).removeClass('desc bg-success');
                sortOrder = 1;
            }
            $(this).siblings().removeClass('asc selected').addClass('bg-success');
            $(this).siblings().removeClass('desc selected').addClass('bg-success');
            var arrData = $('table').find('tbody >tr:has(td)').get();


            arrData.sort(function(a, b) {
                var val1 = $(a).children('td').eq(col).text().toUpperCase();
                var val2 = $(b).children('td').eq(col).text().toUpperCase();
                if($.isNumeric(val1) && $.isNumeric(val2)){
                    return sortOrder == 1 ? val1-val2 : val2-val1;
                } else {
                    return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
                }
            });
            $.each(arrData, function(index, row) {
                $('tbody').append(row);
            });
        });
    });
});