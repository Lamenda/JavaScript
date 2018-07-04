var deepCopy= function(source) { 
var result={};
for (var key in source) {
      result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
   } 
   return result; 
}
$(function(){
    var $fileIpt = $('#uploadFile');
    var $orignFile = $('#orignFile');
    eleButton = $('.download');
    var orignData = null;
    var resultData = null;
    $fileIpt.on('change',function(){
        var reader = new FileReader();
        reader.onload = function () {
            orignData = reader.result;
            $orignFile.html(orignData);
            resultData = JSON.parse(reader.result);
        };
        reader.readAsText(this.files[0]);
    });
    // drag & drop
    $orignFile.on('dragover',function(){
        return false;
    });
    // Add drop handler
    $orignFile.on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e = e || window.event;
        var files = e.dataTransfer.files;
        var reader = new FileReader();
        reader.onload = function () {
            orignData = reader.result;
            $orignFile.html(orignData);
            resultData = JSON.parse(reader.result);
        };
        reader.readAsText(files[0]);
    });

    var handleData = function(data,config){
       data.forEach(function(item) {
           for (var key in config) {
               if (item.hasOwnProperty(key)) {
                   var element = object[key];                   
               }
           }
       });
    };

    function getType(o) {
        var _t;
        return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
    }
    function extend(destination, source) {
        for (var p in source) {
            if (getType(source[p]) == "array" || getType(source[p]) == "object") {
                destination[p] = getType(source[p]) == "array" ? [] : {};
                arguments.callee(destination[p], source[p]);        //递归调用在这里
            }
            else {
                destination[p] = source[p];
            }
        }
    }
    // 下载文件方法
    var funDownload = function (content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };

    if ('download' in document.createElement('a')) {
        // 作为test.html文件下载
        eleButton.on('click', function () {
            funDownload(JSON.stringify(resultData), 'example.json');
        });
    } else {
        eleButton.on('click',function() {
            alert('浏览器不支持');            
        });
    }
});
