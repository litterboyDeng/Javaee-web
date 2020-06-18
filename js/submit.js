let info = decodeURI( window.location.search.substr(1)).split('&')
console.log(info)
getInfo()
isSubmit()
let answerId;
function getInfo() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/teacher/reviewHomework",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
            id: info[0]
        }),
        success: function(result){
            $('#title').val(result.data.title),
                $('#content').val(result.data.content),
                $('#create-time').val(result.data.createTime)
        },
        error: function(result){

        }
    })
}


function isSubmit() {

    $.ajax({
        type: "POST",
        url: " http://localhost:8080/student/reviewAnswer",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
            studentId: info[1],
            homeworkId: info[0]
        }),
        success: function(result){
            if (result.data===null){
                document.getElementById('update').style.display='none'
            }else {
                document.getElementById('submit').style.display='none'
                $('#answer').val(result.data.answer)
                answerId = result.data.id
            }
        },
        error: function(result){

        }
    })
}
function submit() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/student/submit",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
            studentId: info[1],
            homeworkId: info[0],
            title: $('#title').val(),
            content: $('#content').val(),
            answer: $('#answer').val(),
            submitTime: new Date().Format("yyyy-MM-dd HH:mm:ss")

        }),
        success: function(result){
            document.getElementById('update').style.display='block'
            document.getElementById('submit').style.display='none'
            alert(result.msg)
        },
        error: function(result){

        }
    })
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function update() {$.ajax({
    type: "POST",
    url: "http://localhost:8080/student/updateAnswer",
    contentType: "application/json",
    dataType:"json",
    data: JSON.stringify({
        id: answerId,
        answer: $('#answer').val(),
        submitTime: new Date().Format("yyyy-MM-dd HH:mm:ss")

    }),
    success: function(result){
        alert(result.msg)
    },
    error: function(result){

    }
})
}