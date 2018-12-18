window.onload = function()
{   
    const tabela = document.getElementById("testTable");
    load_data();
   
    $("#utworz").on("click",()=>{
        if($("#nazwaK").val()!="")
        {
            $.post("/klasa/get/klasy/data",{name: $("#nazwaK").val()},(data,status)=>{
               // console.log(data);
                if(data.length==0)
                {
                    var Today = new Date();
        var Month = Today.getMonth()+1;
        var Day = Today.getDate();
        var Year = Today.getFullYear();
        let data = Year+"-";
        if(Month<10)
        data+="0"+Month+"-";
        else
        data+=Month+"-";
        
        if(Day<10)
        data+="0"+Day;
        else
        data+="0"+Day;

        $(".background").toggleClass("disable");
             $(".body").toggleClass("disable");
         $.post("/klasa/add/klasa",{name: $("#nazwaK").val(),data: (data)},(data,status)=>{
            if(data.status == "true")
            load_data();
         })
                }
                else
                {
                    alert("Nazwa zajęta: "+$("#nazwaK").val())
                }
            });
        
        
       
        }else{
            $("#nazwaK").addClass("require");
        }
    });
    function przyciski()
    {
        let tr = tabela.getElementsByTagName("tr");
        for(let a = 0;a<tr.length;a++)
        {
            let button = tr.item(a).getElementsByTagName("button");
            for(let b = 0;b<button.length;b++)
            {
                 button.item(b).addEventListener("mouseover",function(event){
                     event.target.parentNode.parentNode.parentNode.classList.toggle("just");
                 })
                 button.item(b).addEventListener("mouseout",function(event){
                     event.target.parentNode.parentNode.parentNode.classList.remove("just");
                 })
            }
        }
        $(".dellTest").on("click",function(event){
            //console.log(event.target.getAttribute("name"));
            dellKlass(event.target.getAttribute("name"))
        })
    }
    function load_data()
    {   tabela.innerHTML = "";
    $("#nazwaK").val("");
        $.post("/klasa/get/klasy",{},(data,status)=>{
            for(let a =0;a<data.length;a++)
            {let datae = new Date(data[a].data)
                let g = "";
                if(datae.getDate()<10)
                g+="0"+datae.getDate()+"-";
                else
                g+=datae.getDate()+"-";
    
            if(datae.getMonth()+1<10)
            g+="0"+datae.getMonth()+1+"-";
            else
            g+=datae.getMonth()+"-";
             g += datae.getFullYear();
                let c = "<tr><td>"+(a+1)+"</td>";
                c+="<td>"+data[a].nazwa+"</td>";
                c+="<td>"+data[a].ile_Uczni+"</td>";
                c+="<td>"+g+"</td>";
                c+='<td><form action="/klasa/widok/klasy" method="GET"><button  class="button_to_do" style="float: left; ">Widok klasy</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form></td>';
                c+='<td><form action="/testy/start" method="GET"><button  class="button_to_do" style="float: left; ">Dodaj ucznia</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form></td>';
                c+='<td><div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Usuń</button></div></td>';
                c+="</tr>"
                tabela.innerHTML +=c;
            }
            przyciski();
        }).then(()=>{
            sleep(500).then(()=>{
                $(".background").toggleClass("disable");
            $(".body").toggleClass("disable");
            });
            
        });
    }
    function dellKlass(a)
    {
        if(confirm("Czy napewno chcesz usunąć test?"))
        {
            
            document.getElementsByClassName("body").item(0).classList.toggle("disable");
                document.getElementsByClassName("background").item(0).classList.remove("disable");
            $.post( "/klasa/dell/klasa",{id: a},function(data,status){
                if(data.status =="true")
                {
    
                    
                   // new Promise(()=>{alert("Test został usunięty pomyślnie : "+data.data);}); 
                }
                //console.log(data);
            } ).then(()=>{ 
                
                   load_data(); 
            });
        }
    }
}
function sleep (time) {
    //użycie : sleep(czas).then(() => {});
    return new Promise((resolve) => setTimeout(resolve, time));
  }