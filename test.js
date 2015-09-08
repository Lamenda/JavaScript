
/*兼容ie,ff获取元素的style*/
//getStyle(div1,background);获取div1的背景样式
function getStyle(obj,name){
			if(obj.currentStyle)
			{
				return obj.currentStyle[name];
			}
			else{
				return getComputedStyle(obj,false)[name];
			}
		}

/*通过className获取元素*/
//getByCalss(div1,box);获取div1下class =box的元素
function getByClass(oParent,sClass){
	var result = [];
	var aEle=oParent.getElementsByTagName('*');
	for(var i = 0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			result.push(aEle[i]);

		}
	}
	return result;
}