$(function() {
  var YOUR_STEAM_ID = prompt("Please enter your steam ID");
  $.get(`https://api.opendota.com/api/players/${YOUR_STEAM_ID}/peers`).then((res) => {
    var steamID = res.slice(0,20);
    return steamID;
  }).then((data) => {
    return ajaxRequestPromise(data);
  }).then((data)=>{
    data.sort((a,b) => (b.solo_competitive_rank || b.mmr_estimate.estimate || 0) - (a.solo_competitive_rank || a.mmr_estimate.estimate || 0));
    for(var i = 0; i < data.length; i++){
      if(data[i].profile){
          let mmr = null;
          if(data[i].solo_competitive_rank){
            mmr = data[i].solo_competitive_rank;
          } else if(data[i].mmr_estimate.estimate){
            mmr = data[i].mmr_estimate.estimate + '*';
          } else {
            mmr = 'N/A';
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
  });

  function ajaxRequestPromise(ID){
    var arr = ID.map(function(val){
      return $.get(`https://api.opendota.com/api/players/${val.account_id}`);
    })
    return Promise.all(arr);
  }
});
