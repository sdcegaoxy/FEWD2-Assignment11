var ObjMap=new Map();
var _Data="";

$(document).bind('pageinit',function(){ 
   $.getJSON( "js/data.json", function( data ) {
    var html="";
    _Data=data;
     for(var i=0;i<data.length;i++){
       var obj=data[i];
       ObjMap.set(obj.id,obj); 
		 
        html+="<li><a href=\"#details\" uid=\""+obj.id+"\">"
                +"<img src=\""+obj.imagepath+"\">"
                +"<h2>"+obj.name.first+"&nbsp;&nbsp;"+obj.name.last+"</h2>"
                +"<p>"+obj.title+"</p></a></li>" ;
     }
     $("#homelist ul").html(html); 
     $('#homelist ul').listview().listview('refresh');
  });
        

    $("#homelist").on("click",'a',function(){
        var user_id=$(this).attr("uid");
		var obj=ObjMap.get(user_id);
		var reportname=getUserName(obj.reportsto);
		$("#details-info img").attr("src",obj.imagepath);
		
        var html=$("#details-info").html();
		html=html.replace("{{name}}",obj.name.first+"  "+obj.name.last);
		html=html.replace("{{title}}",obj.title);
 		$("#details-info").html(html);
		
		var listhtml=$("#details-id-list").html();
		listhtml=listhtml.replace("{{vm}}",reportname);
		listhtml=listhtml.replace("{{officenumber}}",obj.officenumber);
		listhtml=listhtml.replace("{{cellnumber}}",obj.cellnumber);
		$("#details-id-list").html(listhtml);
        $('#details-id-list').listview().listview('refresh');
   });
    
});

function getUserName(id){

	var fullname="";
	var obj=ObjMap.get(id);
	if(obj==null)return "";
	fullname=obj.name.first+"  "+obj.name.last;
	
	return fullname;
}