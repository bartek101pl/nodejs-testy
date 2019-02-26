window.onload = function(){
$.post("/egzamin/wyniki/save/all",{},(data)=>{
    let q="";
    console.log(data);
    for(let a =0;a<data.length;a++)
    {
        q+="<tr><td>"+(a+1)+"</td><td>"+data[a].nazwa+"</td><td>"+data[a].zdobyte+"/"+data[a].max+" ("+data[a].s_wynik/data[a].ile+"/"+data[a].max+")</td><td>"+round_L(data[a].zdobyte/data[a].max*100)+"% ("+round_L((data[a].s_wynik/data[a].ile)/data[a].max*100)+"%)</td><td><button class='button_to_do' name='"+data[a].id_odpowiedzi+"' style='margin: 0 0 0 0; width: 100%;'>Odpowiedzi</button></td></tr>";
    }
    document.getElementById("wyniki").innerHTML = q;
});
}
function round_L(a)
{
    let g = parseInt(a*100);
    return parseFloat(g/100);
}