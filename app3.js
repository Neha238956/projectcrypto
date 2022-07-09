const form=document.querySelector('#searchform');
const res =document.querySelector('#tableResult');
const cont = document.getElementById("allContaint");
var upd;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
const ctype =form.elements.coinType.value;
console.log(ctype);

fetchPrice(ctype);

});
const fetchPrice = async(ctype) =>{

    const r =await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    showPrice(r.data.coin);
}
const showPrice=(coinData)=>{
    const price =coinData.price;
    const vol =coinData.volume;
    const change =coinData.priceChange1d;
    const coin=coinData.name;
    const curr ='USD';
    var col="green";
    if(change<0){
        col="red";
    }
    

    res.innerHTML =`<tr style="background-color:blue;color:white; font-weight:700">
    <td>
        Property
    </td>
<td>
    Value
</td>
</tr>
<tr>
    <td>
        ${coin}
    </td>
<td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
</tr><tr>
    <td>
        Volume (24hrs)
    </td>
<td > ${vol}</td>
</tr>
<tr>
    <td>
        Change (24hrs)
    </td>
<td style="color:${col}"> ${change}${curr}</td>
</tr>
`
upd = setTimeout(()=>fetchPrice(ctype),10000);
}