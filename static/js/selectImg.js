var Rect = {   
  obj: null,   
  container: null,  
  init: function(containerId){  
    Rect.container = document.getElementById(containerId);   
    if(Rect.container){  
      Rect.container.onmousedown = Rect.start;  
  }  
  else{  
      alert('该图片无法被修改！');  
  }  
},  
start: function(e){  
    var o = Rect.obj = document.createElement('div');  
    o.style.position = "absolute";   
    o.mouseBeginX = Rect.getEvent(e).offsetX;  
    o.mouseBeginY = Rect.getEvent(e).offsetY; 
    o.style.left= o.mouseBeginX+"px";
    o.style.top = o.mouseBeginY+"px";
    o.style.height = 0+"px";  
    o.style.width = 0+"px";  
    o.style.border = "5px solid #d9534f";  
    var deleteLink = document.createElement('a');  
    deleteLink.onclick = function(){   
      Rect.container.removeChild(this.parentNode.nextSibling);
      Rect.container.removeChild(this.parentNode);
  }  
  deleteLink.innerText = "x";  
  o.appendChild(deleteLink);  
  Rect.container.appendChild(o);  
  Rect.container.onmousemove = Rect.move;  
  Rect.container.onmouseup = Rect.end;  
},  
move: function(e){   
    var o = Rect.obj;
    o.style.left= o.mouseBeginX+"px";
    o.style.top = o.mouseBeginY+"px";
    var dx = Rect.getEvent(e).offsetX - o.mouseBeginX;  
    var dy = Rect.getEvent(e).offsetY - o.mouseBeginY; 
    o.style.height = dy+"px";  
    o.style.width = dx+"px";  
    o.dx = dx;
    o.dy = dy;
},  
end: function(e){  
    var o = Rect.obj
    var i = document.createElement('input')
    i.style.position = 'absolute';
    i.style.left = (o.mouseBeginX+o.dx)+'px';
    i.style.top= (o.mouseBeginY+o.dy)+'px';
    i.style.background  = 'transparent';
    i.style.width = '150px'
    i.style.height = '30px'
    i.style.color = '#d9534f'
    i.style.border = "2px solid #d9534f";
    i.id = "input"
    i.autofocus = 'autofocus'
    Rect.container.appendChild(i);
    Rect.container.onmousemove = null;  
    Rect.container.onmouseup = null;
    Rect.container.onmousedown = null;    
    Rect.obj = null;
},    
getEvent: function(e){  
    if (typeof e == 'undefined'){  
      e = window.event;  
  }  
  if(typeof e.x == 'undefined'){  
      e.x = e.layerX;  
  }  
  if(typeof e.y == 'undefined'){  
      e.y = e.layerY;  
  }  
  return e;  
}  
}; 


var input = document.getElementById("file_input");
var result,rectangle="";
var dataArr = [];
var fd;
var limits = 0;
var Widths = 0;
var Heights = 0;
var oAdd = document.getElementById("add");
var oSubmit = document.getElementById("send");
var oInput = document.getElementById("file_input");
var oRecognize = document.getElementById("recognize");
var oChange = document.getElementById("change");
var oFilter = document.getElementById("filter");
var flaw_num = {'停车痕紧':'0','停车痕松':'1','卷边皱印':'2','油污':'3','浆斑':'4','污染':'5','折痕':'6','皱印':'7','并纬':'8','错花':'9','毛边':'10','线头':'11','字':'12','断纬':'13','折返':'14','紧纬':'15','紧经':'16','色差':'17','花纹':'18'};

function onload(){

    if(typeof FileReader==='undefined'){
        alert("抱歉，你的浏览器不支持 FileReader");
        input.setAttribute('disabled','disabled');
    }else{
        input.addEventListener('change',readFile,false);
    }
    function readFile(){
        fd = new FormData();
        var iLen = this.files.length;
        var index = 0;
        for(var i=0;i<iLen;i++){
            if (!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){
                return alert("上传的图片格式不正确，请重新选择");
            }
            var reader = new FileReader();
            fd.append(i,this.files[i]);
            reader.readAsDataURL(this.files[i]);
            reader.fileName = this.files[i].name;
            reader.onload = function(e){
                var imgMsg = {
                    imgname : this.fileName,
                    base64 :  this.result
                }
                dataArr.push(imgMsg);
                result = '<div class="item col-md-12 col-xs-12"><div id="'+this.fileName+'" class="img_show"><img src="'+this.result+'"/></div><div class="img_title">'+this.fileName+'</div><div id="button-group'+index+'" class="btns"></div></div>';
                //result = '<div class="result"><img src="'+this.result+'" alt=""/></div>';
                var div = document.createElement('div');
                div.innerHTML = result;
                div['className'] = 'float';
                div['index'] = index;

                document.getElementById('show').appendChild(div);
                var img = div.getElementsByTagName('img')[0];
                img.onload = function(){
                    this.parentNode.style.display = 'block';
                    var oParent = this.parentNode;
                }
                index++;
            }
        }
    }

    //添加图片
    oAdd.onclick=function(){
        oInput.value = "";
        $('.float').remove();
        dataArr = [];
        index = 0;
        oInput.click();
    }



    //识别瑕疵，并将瑕疵标出
    oSubmit.onclick=function(){
        //console.log(dataArr)
        if (dataArr.length==0) {
            alert("识别的图片不能为空哦")
        }
        for (var i = 0; i <dataArr.length ; i++) {

            var o = document.getElementById(dataArr[i].imgname);
            var h = o.offsetHeight;  //高度
            var w = o.offsetWidth;   //宽度
            var coordinate;
            var xmin,ymin,xmax,ymax,type;
            var top,left,height,width,img_top,img_left;
            var score;
            //console.log('height:'+h+'   width:'+w);

            //生成时间戳，进行加密
            var timestamp = Date.parse(new Date());
            var sign = timestamp/1000;
            var secretsign = $.md5(sign);
            var characterSet="0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
            secretsign += characterSet.charAt(Math.ceil(Math.random()*10000)%characterSet.length)+characterSet.charAt(Math.ceil(Math.random()*10000)%characterSet.length)+characterSet.charAt(Math.ceil(Math.random()*10000)%characterSet.length);

            $.ajax({
                url: '/recognize',
                type: 'post',
                dataType:"text",
                async:false,
                data: {
                    name:dataArr[i].imgname,
                    //secretsign:secretsign,
                    base64:dataArr[i].base64
                },
                success:function(data){
                    //console.log(data);
                    coordinate = JSON.parse(data);
                    if(typeof coordinate != 'object' && !obj ){
                        alert("响应数据不是JSON格式")
                    }
                    //console.log(coordinate);
                    for (var j=0;j<coordinate.result.flaw.length;j++){
                        //console.log(coordinate.result.flaw[i]);
                        type = coordinate.result.flaw[j].flaw_class;
                        score = coordinate.result.flaw[j].score;
                        //console.log(coordinate.result.flaw[i][key]);
                        xmin = coordinate.result.flaw[j].location[0];
                        ymin = coordinate.result.flaw[j].location[1];
                        xmax = coordinate.result.flaw[j].location[2];
                        ymax = coordinate.result.flaw[j].location[3];
                        height = h*(ymax-ymin)/1200;
                        width = w*(xmax-xmin)/2448;
                        top = h*ymin/1200;
                        left = 15+w*xmin/2448;
                        if (localStorage.getItem("limit")) {
                            limits = localStorage.getItem("limit")
                        }
                        if (localStorage.getItem("width")) {
                            Widths = localStorage.getItem("width")
                        }
                        if (localStorage.getItem("height")) {
                            Heights = localStorage.getItem("height");
                        }
                        if (width>=Widths && height>=Heights && score>=(limits/100)) {
                            console.log("第"+i+"个瑕疵，其中宽度="+width+"高度="+height+"置信="+score)
                            console.log("阈值宽度="+width+"高度="+height+"置信度="+score)
                            //rectangle += '<div class="rectangle'+j+'" style="width: '+width+'px;height: '+height+'px;top: '+top+'px;left: '+left+'px;"></div><div class="img_tag'+j+'" style="top: '+(top-22)+'px;left: '+left+'px;">'+type+'  '+score+'  ('+parseInt(width)+'*'+parseInt(height)+')</div>';
                            rectangle += '<div class="rectangle'+flaw_num[type]+'" style="width: '+width+'px;height: '+height+'px;top: '+top+'px;left: '+left+'px;"></div><div class="img_tag'+flaw_num[type]+'" style="top: '+(top-22)+'px;left: '+left+'px;">'+type+'  '+score+'  ('+parseInt(width)+'*'+parseInt(height)+')</div>';
                        }else {
                            console.log("滤除第"+i+"个瑕疵，其中宽度="+width+"高度="+height+"置信度="+score);
                        }
                        
                    }
                },
                error:function(){
                    alert("服务器端响应错误")
                }
            })


            var imgid = dataArr[i].imgname
            var img = '<img src="'+dataArr[i].base64+'"/>';
            result = img+rectangle;
            var idname = "button-group"+i;
            document.getElementById(imgid).innerHTML=result;
            document.getElementById(idname).innerHTML= '<button type="button" class="btn btn-success btn-lg" data-id="'+i+'" onclick="upload(this);"><span class="glyphicon glyphicon-cloud-upload"></span> 上传</button><button type="button" class="btn btn-danger btn-lg" data-id="'+i+'" onclick="edit(this);"><span class="glyphicon glyphicon-edit"></span> 修正</button>'
            //var node = '<input value="过滤瑕疵" type="button" class="btn btn-primary btn-lg" id="filter">'
            //document.getElementById("button_group").children[3].innerHTML = node;
            rectangle="";
        }   //for
    }

    //识别布匹种类并标出
    oRecognize.onclick = function(){
        console.log(dataArr)
        if (dataArr.length==0) {
            alert("识别的图片不能为空哦")
        }
        var childs = document.getElementById("button_group").childNodes;
        if(childs.length==4){
            document.getElementById("button_group").remove(childs[3])
        }
        for (var i = 0; i <dataArr.length ; i++) {

            var o = document.getElementById(dataArr[i].imgname);
            var h = o.offsetHeight;  //高度
            var w = o.offsetWidth;   //宽度
            var coordinate;
            var type;
            var img_top = h/3;
            var img_left = w/3;
            //console.log('height:'+h+'   width:'+w);

            //生成时间戳，进行加密
            var timestamp = Date.parse(new Date());
            var sign = timestamp/1000;
            var secretsign = $.md5(sign);
            var characterSet="0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
            secretsign += characterSet.charAt(Math.ceil(Math.random()*10000)%characterSet.length)+characterSet.charAt(Math.ceil(Math.random()*10000)%characterSet.length)+characterSet.charAt(Math.ceil(Math.random()*10000)%characterSet.length);

            $.ajax({
                url: '/classify',
                type: 'post',
                dataType:"text",
                async:false,
                data: {
                    name:dataArr[i].imgname,
                    //secretsign:secretsign,
                    base64:dataArr[i].base64
                },
                success:function(data){
                    console.log(data);
                    coordinate = JSON.parse(data);
                    console.log(coordinate)
                    if(typeof coordinate != 'object' && !obj ){
                        alert("响应数据不是JSON格式")
                    }
                    type = coordinate.result.kind;  
                    console.log(type);       
                    rectangle = '<div class="img_tag" style="top: '+img_top+'px;left: '+img_left+'px;">'+type+'</div>';         
                },
                error:function(){
                    alert("服务器端响应错误")
                }
            })


            var imgid = dataArr[i].imgname
            var img = '<img src="'+dataArr[i].base64+'"/>';
            result = img+rectangle;
            var idname = "button-group"+i;
            document.getElementById(imgid).innerHTML=result;
            document.getElementById(idname).innerHTML= '<button type="button" class="btn btn-success btn-lg" data-id="'+i+'" onclick="upload2(this);"><span class="glyphicon glyphicon-cloud-upload"></span> 上传</button><button type="button" class="btn btn-danger btn-lg" data-id="'+i+'" onclick="edit2(this);"><span class="glyphicon glyphicon-edit"></span> 修正</button>'
            rectangle="";
        }   //for
    }
    
}
function onLoad(){   
    if (localStorage.getItem("limit")) {
        limits = localStorage.getItem("limit");
    }
    if (localStorage.getItem("width")) {
        Widths = localStorage.getItem("width")
    }
    if (localStorage.getItem("height")) {
        Heights = localStorage.getItem("height");
    }
    document.getElementById("Limit").innerHTML = '当前置信度阈值：'+(limits/100)
    var input_node = '<label for="exampleInputName2">高度：</label><input type="text" class="form-control" id="exampleInputName2" placeholder="'+Heights+'">';
    document.getElementById('length').innerHTML = input_node;
    input_node = '<label for="exampleInputEmail2">宽度：</label><input type="email" class="form-control" id="exampleInputEmail2" placeholder="'+Widths+'">';
    document.getElementById("width").innerHTML = input_node;

    oChange.onclick = function(){

        localStorage.setItem("limit", limits);
        document.getElementById("Limit").innerHTML = '当前置信度阈值：'+limits/100;
        Heights= document.getElementById('length').children[1].value;
        Widths= document.getElementById("width").children[1].value;
        localStorage.setItem("height", Heights);
        localStorage.setItem("width", Widths);
        alert("修改成功！")
    }
}



//上传重新标注瑕疵后的图片信息
function upload(e) {
    var id_index = e.getAttribute("data-id")
    var type = document.getElementById(dataArr[id_index].imgname).children[1].children[1].value;
    var o = document.getElementById(dataArr[id_index].imgname).children[1].children[0]; 
    var img = document.getElementById(dataArr[id_index].imgname)
    var height = img.offsetHeight;
    console.log('image_height:'+height)
    var width = img.offsetWidth;
    console.log('image_width:'+width)
    var xmin = o.offsetTop;
    var ymin = o.offsetLeft;
    var h = o.offsetHeight; 
    console.log('rect_height:'+h)
    var w = o.offsetWidth;  
    console.log('rect_width:'+w)
    var xmax =  xmin+w;
    var ymax = ymin+h;
    console.log("xmin:"+xmin+"xmax:"+xmax+"ymin:"+xmin+"ymax:"+xmax);
    var Xmin = parseInt(xmin*2448/width);
    var Xmax = parseInt(xmax*2448/width);
    var Ymin = parseInt(ymin*1200/height);
    var Ymax = parseInt(ymax*1200/height);
    console.log("Xmin:"+Xmin+"Xmax:"+Xmax+"Ymin:"+Ymin+"Ymax:"+Ymax);
    $.ajax({
        url: '/label',
        type: 'POST',
        dataType: 'text',
        data: {
            name: dataArr[id_index].imgname,
            base64:dataArr[id_index].base64, 
            flaw_class:type,
            xmin:Xmin,
            xmax:Xmax,
            ymin:Ymin,
            ymax:Ymax
        },
        success:function(data){
            alert("数据上传成功啦！小布会努力提高自己的。")
        },
        error:function(){
            alert("数据上传失败！")
        }
    })
}
function edit(e) {
    var id_index = e.getAttribute("data-id")
    var img = '<img src="'+dataArr[id_index].base64+'"/>';
    var result = img+'<div id="main'+id_index+'" class="draw_rect"></div>';  
    document.getElementById(dataArr[id_index].imgname).innerHTML=result;
    Rect.init("main"+id_index);

}


function upload2(e) {
    var id_index = e.getAttribute("data-id")
    var type = document.getElementById(dataArr[id_index].imgname).lastChild.value;
    $.ajax({
        url: '/db',
        type: 'POST',
        dataType: 'text',
        data: {
            name: dataArr[id_index].imgname,
            base64:dataArr[id_index].base64,
            kind: type
        },
        success:function(data){
            alert("数据上传成功啦！小布会努力提高自己的。")
        },
        error:function(){
            alert("数据上传失败！")
        }
    })

}
function edit2(e) {
    var id_index = e.getAttribute("data-id")
    var img = '<img src="'+dataArr[id_index].base64+'"/>';
    var o = document.getElementById(dataArr[id_index].imgname);
    var h = o.offsetHeight;  
    var w = o.offsetWidth;   
    var result = img+'<input id="input" autofocus="autofocus" style="position: absolute;left:'+w/3+'px;top:'+h/3+'px;background:transparent;color: #d9534f;border:2px solid #d9534f;">';
    document.getElementById(dataArr[id_index].imgname).innerHTML=result;
}