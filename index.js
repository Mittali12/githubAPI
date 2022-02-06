var p_name = document.getElementById("name");
var avatar = document.getElementById("avatar");
var follow = document.getElementById("follow");
var repos_list = document.getElementById("repos_list");

document.getElementById("send").addEventListener("click", function (event) {
  event.preventDefault();

  while (repos_list.firstChild) {
    repos_list.removeChild(repos_list.lastChild);
  }

  var profile = new XMLHttpRequest();
  var repositary = new XMLHttpRequest();

  var username = document.getElementById("username").value;
  var link1 = "https://api.github.com/users/" + username;
  var link2 = "https://api.github.com/users/" + username + "/repos";

  profile.open("GET", link1);
  profile.send();

  profile.addEventListener("load", function (e) {
    document.getElementById("profile").style.display = "inherit";

    var p_data = JSON.parse(e.target.responseText);
    console.log("1 2 ");
    p_name.innerHTML =
      p_data.name +
      " <i>( <a href='" +
      p_data.html_url +
      "' target='_blank' >@" +
      username +
      "</a> )</i>";
    avatar.setAttribute("src", p_data.avatar_url);
    follow.innerHTML =
      "Followers: " +
      p_data.followers +
      " - Following: " +
      p_data.following +
      "<br>Repos: " +
      p_data.public_repos;
  });

  repositary.open("GET", link2);
  repositary.send();

  repositary.addEventListener("load", function (e) {
    var r_data = JSON.parse(e.target.responseText);
    console.log(r_data);

    r_data.forEach(function (data) {
      var btn = document.createElement("button");
      btn.setAttribute("id", "repo_btn");

      btn.innerHTML = data.name;

      btn.addEventListener("click", function () {
        window.open(data.html_url, "_blank");
      });

      repos_list.appendChild(btn);
    });
  });
});
