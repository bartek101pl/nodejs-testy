//@Copyright 2018 BŚ
window.onload = function(){
    const tabela = document.getElementById("testTable");
    renewTest();
    
    
    function przyciski()
    {
       let tr = document.getElementsByTagName("tr");
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
       let button = document.getElementsByClassName("dellTest");
      $(".dellTest").on("click",function(event){
           //console.log(event.target.getAttribute("name"));
           dellTest(event.target.getAttribute("name"))
       })
       //console.log(button);
    }
    
    function renewTest(){
                
        $.post( "/testy/showTable", {},function(data,status){
            //console.log(data.length);
            tabela.innerHTML="";
            for(let a = 0;a<data.length;a++)
            {
                let datae = new Date(data[a].data)
                let g = "";
                if(datae.getDate()<10)
                g+="0"+datae.getDate()+"-";
                else
                g+=datae.getDate()+"-";
    
            if(datae.getMonth()<10)
            g+="0"+datae.getMonth()+"-";
            else
            g+=datae.getMonth()+"-";
            
          g += datae.getFullYear();
                
                tabela.innerHTML+="<tr><td>"+(a+1)+".</td><td>"+data[a].nazwa+"</td><td>"+data[a].iloscPytan+"</td><td>"+data[a].klasa+"</td><td>"+g+"</td><td>"+
            '<form action="/testy/widok" method="GET"> <button  class="button_to_do" style="float: left; ">Podgląd</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+
            "</td><td>"+'<form action="/testy/start" method="GET"><button  class="button_to_do" style="float: left; ">Rozpocznij test</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+"</td><td>"+
            '<form action="/testy/edycja" method="GET"><button  class="button_to_do" style="float: left; ">Edytuj</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+"</td><td>"+
            '<div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Usuń test</button></div>'+"</td></tr>";
                
            }
            przyciski();
        } ).then(()=>{
            sleep(500).then(()=>{
                document.getElementsByClassName("body").item(0).classList.remove("disable");
                document.getElementsByClassName("background").item(0).classList.toggle("disable");
            })
        });
    }
    function dellTest(a)
    {
        if(confirm("Czy napewno chcesz usunąć test?"))
        {
            //console.log("del test id="+a);
            var query = "DELETE FROM `testy` WHERE `id`="+a;
            //console.log(query);
            document.getElementsByClassName("body").item(0).classList.toggle("disable");
                document.getElementsByClassName("background").item(0).classList.remove("disable");
            $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
                if(data.status =="true")
                {
                    renewTest();
                    new Promise(()=>{alert("Test został usunięty pomyślnie : "+data.data);}); 
                }
                //console.log(data);
            } ).then(()=>{ 
                query = "DELETE FROM `pytania` WHERE `idtestu`="+a;
            $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
            if(data.status =="true")
            {

                renewTest();
               // new Promise(()=>{alert("Test został usunięty pomyślnie : "+data.data);}); 
            }
            //console.log(data);
        } )});;
        }
    }
    }
    function sleep (time) {
        //użycie : sleep(czas).then(() => {});
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    