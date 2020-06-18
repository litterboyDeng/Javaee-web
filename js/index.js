let info = window.location.search.substr(3)
console.log(info)
getAll()
function addHomework() {
    let time = new Date().Format("yyyy-MM-dd HH:mm:ss")
    console.log(time)
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/teacher/addHomework",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
            title: $('#title').val(),
            content: $('#content').val(),
            createTime: time
        }),
        success: function(result){
            console.log(result)
            getAll()
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

function getAll() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/teacher/getAllHomework",
        contentType: "application/json",
        dataType:"json",
        data: JSON.stringify({
        }),
        success: function(result){
            console.log(result)
            show(result.data)
        },
        error: function(result){

        }
    })
}

function show(data) {
    let lists = document.getElementById("lists");
    $('#lists li').remove()
    $('#lists hr').remove()
    let li = document.createElement("li");
    li.innerHTML= "      <div style=\"width: 10%\">编号</div>" +
        "      <div style=\"width: 50%\">title</div>" +
        "      <div style=\"width: 40%\">时间</div>"
    lists.appendChild(li);

    lists.style.textAlign="left";
    lists.style.color = "black";
    // lists.style.height = "auto";

    if (data.length === 0){
        lists.innerHTML = "<br/>没有作业!";
        lists.style.textAlign="center";
        lists.style.color = "red";
    }

    for (let i=1; i<=data.length;i++) {
        let element = data[i-1];
        let li = document.createElement("li");
        li.innerHTML="<div style=\"width: 10%\">" +
            i +
            "</div> <div style=\"width: 50%\"> <a href='./html/homework-info.html?id="
            + element.id + "' target='_blank'>" + element.title +
            "</a > </div > <div style=\"width:40%\">" +
            element.createTime +
            "</div>"

        let hr = document.createElement("hr")
        lists.appendChild(hr);

        lists.appendChild(li);
    }
}