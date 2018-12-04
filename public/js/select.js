    //@Copyright 2018 BŚ
    window.onload=function(){
        let aktualne = 0;
        const pytania = document.getElementsByClassName("pytanieBody");
        console.log(pytania.length);
        pytania.item(aktualne).classList.remove("disable");
        let lastil = null;
        const li = document.getElementById("lista_P");
        lastil = li.getElementsByTagName("li").item(0);
        lastil.classList.toggle("active");
       
        li.addEventListener("click", function(event){
            if(event.target != li)
            {   if(lastil!=null)
                lastil.classList.remove("active");
                //console.log(event.target);
                event.target.classList.toggle("active");
                lastil = event.target;
                show(ktore(lastil));
            }
        });
        
        document.getElementById('to_check').addEventListener("click",function(){
            if(lastil.hasAttribute("style"))
            {
                lastil.removeAttribute("style")
            }else{
                lastil.setAttribute("style","background-color: rgb(228, 158, 7);")
            }
        });
    function show(a){
        pytania.item(aktualne).classList.toggle("disable");
        pytania.item(a).classList.remove("disable");
        aktualne = a;
    }
    function ktore(a)
    {
        let g = 0;
        while(a!= li.getElementsByTagName("li").item(g))
        g++;

        return g;
    }
    }
    