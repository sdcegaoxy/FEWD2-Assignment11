$(function(){
    var _Data="";
    
   $.getJSON( "js/data.json", function( data ) {
    var html="";
    _Data=data;
     for(var i=0;i<data.length;i++){
       var obj=data[i];
         
        html+="<li><a href=\"#details\" uid=\""+obj.id+"\">"
                +"<img src=\""+obj.imagepath+"\">"
                +"<h2>"+obj.name.first+"&nbsp;&nbsp;"+obj.name.last+"</h2>"
                +"<p>"+obj.title+"</p></a></li>" ;
     }
     $("#homelist ul").html(html); 
     $('#homelist ul').listview('refresh');
  });
        

    $("#homelist").on("click",'a',function(){
        var user_id=$(this).attr("uid");
        var imgpath="";
        var name="";
        var title="";
        
        for(var i=0;i<_Data.length;i++){
            var obj=_Data[i];
            if(obj.id==user_id){
               $("#details-info").html(
               "<li><img src=\""+obj.imagepath+"\"></li>"
                +"<li>"+obj.name.first+"&nbsp;&nbsp;"
                +obj.name.last+"</li>"
                +"<li>"+obj.title+"</li>"
               );
             $("#details-id-list").html(   
             "<li><a href=\"#details\"><h2>Veiw Manager</h2><p>"+obj.reportsto+"</p></a></li>"
            +"<li><a href=\"#reporters\"><h2>Veiw Direct Reports</h2><p>2</p></a></li>"
            +"<li><a href=\"#\"><h2>Call Office</h2><p>"+obj.officenumber+"</p></a></li>"
            +"<li><a href=\"#\"><h2>Call Cell</h2><p>"+obj.cellnumber+"</p></a></li>"
              );
            }
        }
         $('#details-id-list').listview('refresh');
   });
    
});