$(function() {
  let steamID = [171320790, 44276560, 86985308, 78891550, 36480589];

  ajaxRequestPromise().then((data)=>{
    for(var i = 0; i < data.length; i++){
      if(data[i].profile){
          let mmr = data[i].solo_competitive_rank;
          let IGN = data[i].profile.personaname;
          console.log(IGN);
          let newRow = $('<tr>');
          let num = $('<td>').text(i);
          let newMMR = $('<td>').text(IGN);
          let newIGN = $('<td>').text(mmr);
          newRow.append(num, newIGN, newMMR);
          let table = $('table').append(newRow);
        }
    }
  })

  function ajaxRequestPromise(){
    var arr = steamID.map(function(val){
      return $.get(`https://api.opendota.com/api/players/${val}`);
    })
    return Promise.all(arr);
  }
});
