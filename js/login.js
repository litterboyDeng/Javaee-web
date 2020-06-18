
function change(id) {
    let div1 = document.getElementById('student');
    let div2 = document.getElementById('teacher');
    switch (id) {
        case 'student':
            div1.style.display='block';
            div2.style.display='none';
            break;
        case 'teacher':
            div1.style.display='none';
            div2.style.display='block';
    }
}


function login_student(){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/login/student",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
            studentID: $('#student_id').val(),
            password: $('#student_pass').val()
        }),
        success: function(result){
            if (result.code === 0){
                window.open("./index_student.html?id=" + $('#student_id').val(), "_self")
            }else
                alert(result.msg)
        },
        error: function(result){

        }
    })
}

function login_teacher() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/login/teacher",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
            teacherID: $('#teacher_id').val(),
            password: $('#teacher_pass').val()
        }),
        success: function(result){
            console.log(result)
            if (result.code === 0){
                window.open("./index_teacher.html?id=" + $('#teacher_id').val(), "_self")
            }else
                alert(result.msg)
        },
        error: function(result){

        }
    })
}
