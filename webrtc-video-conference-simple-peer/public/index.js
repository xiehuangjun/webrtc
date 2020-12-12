fetch('https://140.118.121.100:5000/account/open_list',{
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json()
  }) 
  .then( (source) =>{
    list(source)
  })

function list(source){
  console.log(source)
  let output = ``;
  for(var i=0;i < source.length ; i++){
    output +=`
    <li><a>Live</a><button class="come_in_btn" id = "${source[i].I_Room}" name="${source[i].S_Username}" value="customer" onclick="InsideRoom(this)">Come in</button></li>
    ` 
  }
  document.getElementById('Live_list1').innerHTML = output; 
}

function InsideRoom(data){
  window.sessionStorage.setItem("roomid",data.id)
  window.sessionStorage.setItem("identity",data.name)
  window.sessionStorage.setItem("people",data.value)
  window.location.replace("./Streamroom/Streamroom.html");
}



if(window.sessionStorage.getItem("Username") != null){
    let username = window.sessionStorage.getItem("Username");
    let output = ``;
    output +=`
        <li><form id="livenow"><button>Live Now</button></form></li>
        <li><a href="./index.html">Home</a></li>
        <li id="userpro"><a href="./Signup/Signup.html">Sign Up</a></li>
        <li><a href="./Livehome/Livehome.html" id="logout">Logout</li>
    ` 
    document.getElementById('afterlogin').innerHTML = output;
    document.getElementById('userpro').innerHTML = '<a href="./proedit/proedit.html"><img class="profile" src="./images/account.png">'+username+'</a>';
}

const logout = document.getElementById('logout');
logout.addEventListener('click',function (){
    window.sessionStorage.clear();
    window.location.replace("./Livehome/Livehome.html");
})


/*-------Live now button -----------*/
const Livenow = document.getElementById('livenow')
Livenow.addEventListener('submit', function (e) {
    e.preventDefault();
    let account = window.sessionStorage.getItem("Account");

    let param = "https://140.118.121.100:5000/account/open?S_Account="+account;
    console.log(param);
    fetch(param,{
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }) 
      .then( (data) =>{
        render(data)
      })
})

function render(data){
    let roomid = data.I_Room;
    let host = window.sessionStorage.getItem("Username");
    window.sessionStorage.setItem("identity",host);
    window.sessionStorage.setItem("roomid",roomid);
    window.sessionStorage.setItem("people","streamer");
    swal("Success", "Room has already opened for you", "success", {timer: 1000
        ,showConfirmButton: false});
    setTimeout(function(){
      window.location.href="./Streamroom/Streamroom.html"}
      ,1000);
  }
