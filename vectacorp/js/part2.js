var ObjMap=new Map();
var Data="";
//var Reportlist=[];

$(document).bind('pageinit',function(){ 
   $.getJSON( "js/data.json", function( data ) {
    var html="";
    Data=data;
     for(var i=0;i<data.length;i++){
       var obj=data[i];
       ObjMap.set(obj.id,obj); 
		 
        html+="<li><a href=\"#details\" uid=\""+obj.id+"\">"
                +"<img src=\""+obj.imagepath+"\">"
                +"<h2>"+obj.name.first+"&nbsp;&nbsp;"+obj.name.last+"</h2>"
                +"<p>"+obj.title+"</p><span class=\"ui-li-count\" style=\"border-radius:20px\">"+getReporterNumb(obj.id)+"</span></a></li>" ;
     }
     $("#homelist ul").html(html); 
     $('#homelist ul').listview().listview('refresh');
	  
  });
        

    $("#homelist,#reportlist").on("click",'a',function(){
        var user_id=$(this).attr("uid");
		fillEmployeeDetails(user_id);
        $('#details-id-list').listview().listview('refresh');
   });
	
	$("#godetails").on("click",function(event){
		event.stopImmediatePropagation();
        //event.preventDefault();
        var user_id=$(this).attr("uid");
        console.log("list reporter for"+user_id);
		fillEmployeeDetails(user_id);
		$('#details-id-list').listview().listview('refresh');
		return false;
   });
	
	$("#goreporters").on("click",function(event){
		event.stopImmediatePropagation();
        var user_id=$(this).attr("uid");
        console.log(user_id);
        var reporterlist=getReporterList(user_id);
        console.log(reporterlist);
		var html="";
		for(var i=0;i<reporterlist.length;i++){
       	var obj=reporterlist[i]; 
        html+="<li><a href=\"#details\" uid=\""+obj.id+"\">"
                +"<img src=\""+obj.imagepath+"\">"
                +"<h2>"
				+obj.name.first+"&nbsp;&nbsp;"
				+obj.name.last+"</h2>"
                +"<p>"+obj.title+"</p><span class=\"ui-li-count\" style=\"border-radius:20px\">"+getReporterNumb(obj.id)+"</span></a></li>" ;
     }
	 $("#reportlist ul").html(html); 
     $('#reportlist ul').listview().listview('refresh'); 
	});

});

function fillEmployeeDetails(id){
		var obj=ObjMap.get(id);

		var reportname=getUserName(obj.reportsto);
		var reporternumb=getReporterNumb(id);
		
		$("#details-info img").attr("src",obj.imagepath);
		$("#managerid").attr("uid",obj.reportsto);
		
        $("#details-info li:nth-child(2)").text(obj.name.first
				+"  "
				+obj.name.last);
		$("#details-info li:nth-child(3)").text(obj.title);
				
		$("#details-id-list li:nth-child(1) p").text(getUserName(obj.reportsto));
	    $("#details-id-list li:nth-child(2) p").text(getReporterNumb(obj.id));
		$("#details-id-list li:nth-child(3) p").text(obj.officenumber);
		$("#details-id-list li:nth-child(4) p").text(obj.cellnumber);
		$("#details-id-list li:nth-child(1) a").attr("uid",obj.reportsto);
        $("#details-id-list li:nth-child(2) a").attr("uid",obj.id);
}

function getUserName(id){

	var fullname="";
	var obj=ObjMap.get(id);
	if(obj==null)return "";
	fullname=obj.name.first+"  "+obj.name.last;
	return fullname;
}

function getReporterNumb(id){
	var counts=0;
	//Reportlist=[];
	for(var i=0;i<Data.length;i++){
		var obj=Data[i];
		if(id==obj.reportsto){
			counts++;
			//Reportlist.push(obj);
		}
	}
	return counts;
}

function getReporterList(id){
	var reportlist=[];
	for(var i=0;i<Data.length;i++){
		var obj=Data[i];
		if(id==obj.reportsto){
			reportlist.push(obj);
		}
	}
	return reportlist;
}


function printMap(){
	console.log(ObjMap);
}