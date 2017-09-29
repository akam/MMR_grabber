$(function() {
  let steamID = [171320790, 44276560, 86985308, 78891550, 36480589, 293324544, 145715097, 60252548, 34903821, 174657509];

  ajaxRequestPromise().then((data)=>{
    data.sort((a,b) => b.solo_competitive_rank - a.solo_competitive_rank);
    for(var i = 0; i < data.length; i++){
      if(data[i].profile){
          let mmr = null;
          if(data[i].solo_competitive_rank){
            mmr = data[i].solo_competitive_rank;
          } else {
            mmr = data[i].mmr_estimate.estimate + '*';
          }
          let IGN = data[i].profile.personaname;
          console.log(IGN);
          let newRow = $('<tr>');
          let num = $('<td>').text(i+1);
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
