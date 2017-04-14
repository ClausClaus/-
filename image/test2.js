/**
 * Created by pc on 2016/11/20.
 */
window.onload = function () {
    var rightDiv = document.getElementById("right");
    var mainDiv = document.getElementById("main");
    var upDiv = document.getElementById("up");
    var leftDiv = document.getElementById("left");
    var downDiv = document.getElementById("down");
    var ifKeyDown = false; //鼠标按下事件
    var contact = "";//表示被按下的触点
    //鼠标按下事件
    rightDiv.onmousedown = function () {
        ifKeyDown = true;
        contact = "right";
    };
    upDiv.onmousedown = function () {
        ifKeyDown = true;
        contact = "up";
    };
    leftDiv.onmousedown = function () {
        ifKeyDown = true;
        contact = "left";
    };
    downDiv.onmousedown = function () {
        ifKeyDown = true;
        contact = "down";
    };
    //鼠标松开事件
    window.onmouseup = function () {
        ifKeyDown = false;
    };
    //鼠标移动事件
    window.onmousemove = function (e) {
        if (ifKeyDown === true) {
            if (contact == "right") {
                var leftx = e.clientX; //鼠标x坐标
                var addWidth = ""; //鼠标移动后选取框增加的宽度
                var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
                addWidth = leftx - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加的宽度
                mainDiv.style.width = addWidth + widthBefore + "px"; //选取框变化后
            }
            else if (contact == "up") {
                var up = e.clientY;//鼠标纵坐标
                var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上便的距离
                var addHeight = mainY - up;//增加的高度
                var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
                mainDiv.style.height = heightBefore + addHeight + "px";
                mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
            }
            else if (contact == "left") {
                var left = e.clientX;//鼠标横坐标
                var mainX = getPosition(mainDiv).left;//选取框的左边距离
                var addWidths = mainX - left;//增加的宽度
                var widthBefores = mainDiv.offsetWidth - 2;//原来的宽度
                mainDiv.style.width = widthBefores + addWidths + "px";
                mainDiv.style.left = mainDiv.offsetLeft - addWidths + "px";
            }
            else if (contact == "down") {
                var down = e.clientY;
                var heightBefore = mainDiv.offsetTop - 2;
                var mainY = getPosition(mainDiv).top;
                var addHeight = down - heightBefore - mainY;
                mainDiv.style.height = addHeight + heightBefore + "px";
            }
        }
    };
//获取元素相对屏幕左边的距离
//利用offectLeft
    function getPosition(node) {
        var left = node.offsetLeft;
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while (parent !== null) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;

        }
        return {"left" : left,"top": top};
    }
}

