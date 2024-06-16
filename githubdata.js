document.addEventListener("DOMContentLoaded", function() {
    const username = "slimakiswinka";
    const apiUrl = `https://api.github.com/users/${username}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("profile-picture").src = data.avatar_url;
            document.getElementById("profile-name").innerText = data.name || data.login;
        })
        .catch(error => console.error('Error fetching GitHub profile:', error));
});
