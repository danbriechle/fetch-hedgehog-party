// function expresion
const getHedgehogs = () => {
  // hedge hog info class html will be filled with the response from
  $('#hedgehog-info').html('');
// get request to the api
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  // turns the response into json
    .then(response => response.json())
  // names the json response hedgehogs and passes it to appendHedgehogs which esentially makes the list of hedgehogs
  // by itterating through list and adding the json info
    .then(hedgehogs => appendHedgehogs(hedgehogs))
  // if there is an error it console logs the error
    .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const addNewHedgehog = (event) => {
event.preventDefault();
 var name = $("#name").val();
 var hoglets = $("#hoglets").val();
 var allergies = $("#allergies").val();
 fetch('https://hedgehog-party.herokuapp.com/api/v1/invites', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
     name: name,
     hoglets: hoglets,
     allergies: allergies
   })
 })
 .then(response => response.json())
 .then(hedgehogs => appendHedgehogs(hedgehogs))
 .catch(error => console.error({ error }));
};

const unInviteHedgehog = () => {
  console.log("we are in the unInviteHedgehog function");
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
