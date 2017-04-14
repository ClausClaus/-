window.onload = function () {
    $("#main").draggable({
        containment:'parent',
        drag:setChoice
    });
    document.onselectstart = new Function('event.returnValue = false;');//图片不被选择
    var box = document.getElementById("box");//最外层大盒子
    var mainDiv = document.getElementById("main");//选取框
    var rightDiv = document.getElementById("right");//右中间触点
    var upDiv = document.getElementById("up");//上中间触点
    var leftDiv = document.getElementById("left");//左中间触点
    var downDiv = document.getElementById("down");//下中间触点
    var leftUpDiv = document.getElementById("left-up");//左上角触点
    var rightUpDiv = document.getElementById("right-up");//右上角触点
    var leftDownDiv = document.getElementById("left-down");//左下角触点
    var rightDownDiv = document.getElementById("right-down");//右下角触点
    var ifKeyDown = false; //鼠标按下事件初始化，鼠标没有被按下时默认是false
    var contact = "";//表示被按下的触点
    //选取框拖放事件
 /*   mainDiv.onmousedown = function (e) {
        e.stopPropagation();
        var mainx = e.clientX - getPosition(mainDiv).left;
        var mainy = e.clientY - getPosition(mainDiv).top;
        box.onmousemove = function (e) {
            var x = e.clientX - mainx;
            var y = e.clientY - mainy;
            console.log(x);
            console.log(y);
            x = x - mainDiv.offsetWidth / 2;
            y = y - mainDiv.offsetHeight / 2;
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            x = x > box.offsetWidth ? box.offsetWidth : x;
            y = y > box.offsetHeight ? box.offsetHeight : y;
            mainDiv.style.left = x + 'px';
            mainDiv.style.top = y + 'px';
        }
        box.onmouseup = function () {
            box.onmousemove = null;
        }

    }*/

    //右边中间鼠标按下事件
    rightDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right";
    };
    //顶部中间鼠标按下事件
    upDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "up";
    };
    //左边中间鼠标按下事件
    leftDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left";
    };
    //底部中间鼠标按下事件
    downDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "down";
    };
    //左上鼠标按下事件
    leftUpDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left-up";
    };
    //右上鼠标按下事件
    rightUpDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right-up";
    };
    //左下鼠标按下事件
    leftDownDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left-down";
    };
    //右下鼠标按下事件
    rightDownDiv.onmousedown = function (e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right-down";
    };
    //鼠标松开事件
    window.onmouseup = function () {
        ifKeyDown = false;
    };
    //鼠标移动事件
    window.onmousemove = function (e) {
        if (ifKeyDown === true) {
            switch (contact) {
                case "right":
                    rightMove(e);
                    break;
                case "up":
                    upMove(e);
                    break;
                case "left":
                    leftMove(e);
                    break;
                case "down":
                    downMove(e);
                    break;
                case "left-up":
                    upMove(e);
                    leftMove(e);
                    break;
                case "right-up":
                    upMove(e);
                    rightMove(e);
                    break;
                case "left-down":
                    downMove(e);
                    leftMove(e);
                    break;
                case "right-down":
                    rightMove(e);
                    downMove(e);
                    break;
            }
        }
        setChoice();
        setpreview();
    };


    function rightMove(e) {
        var leftx = e.clientX; //鼠标x坐标
        var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
        var addWidth = leftx - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加的宽度
        mainDiv.style.width = addWidth + widthBefore + "px"; //选取框变化后
    }

    function upMove(e) {
        var up = e.clientY;//鼠标纵坐标
        var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上便的距离
        var addHeight = mainY - up;//增加的高度
        var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
        mainDiv.style.height = heightBefore + addHeight + "px";
        mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
    }

    function leftMove(e) {
        var left = e.clientX;//鼠标横坐标
        var mainX = getPosition(mainDiv).left;//选取框的左边距离
        var addWidths = mainX - left;//增加的宽度
        var widthBefores = mainDiv.offsetWidth - 2;//原来的宽度
        mainDiv.style.width = widthBefores + addWidths + "px";
        mainDiv.style.left = mainDiv.offsetLeft - addWidths + "px";
    }

    function downMove(e) {
        var down = e.clientY;//鼠标的纵坐标
        var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
        var mainYs = getPosition(mainDiv).top;//选取框的上边距离
        var addHeight = down - heightBefore - mainYs;//增加的高度
        mainDiv.style.height = addHeight + heightBefore + "px";
    }

    //获取元素相对屏幕左边的距离
//利用offectLeft
    function getPosition(node) {
        var left = node.offsetLeft;//获取元素距离父元素相对于父元素的左边距离（offsetLeft = width+padding+border）
        var top = node.offsetTop;//获取元素距离父元素相对于父元素的左边距离（offsetTop = height+padding+border）
        var parent = node.offsetParent;//元素的有实际大小的父元素
        while (parent !== null) {//只要父元素不为空，就一直循环到最外层
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {"left": left, "top": top};
    }

    //设置选取区域高亮可见
    function setChoice() {
        var top = mainDiv.offsetTop;
        var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
        var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
        var left = mainDiv.offsetLeft;
        var img2 = document.getElementById("img2");
        img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
    };
    //图片预览函数
    function setpreview() {
        var top = mainDiv.offsetTop;
        var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
        var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
        var left = mainDiv.offsetLeft;
        var img3 = document.getElementById("img3");
        img3.style.top = -top + "px";
        img3.style.left = -left + "px";
        img3.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
    }
};
