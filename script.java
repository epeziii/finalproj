function toggleNavbar() {
  var navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}

//dagdagan nalang

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  var searchTerm = document.getElementById('searchInput').value.toLowerCase();
  if (searchTerm === "adobong manok") {
    window.location.href = "adobong_manok_recipe.html"; 
  } else if (searchTerm === "bicol express") {
    window.location.href = "bicol_express_recipe.html"; 
  } else if (searchTerm === "monggo") {
    window.location.href = "monggo_recipe.html"; 
  } else if (searchTerm === "sinigang na baboy") {
    window.location.href = "sinigang_na_baboy_recipe.html"; 
  } else if (searchTerm === "kare-kare") {
    window.location.href = "kare-kare_recipe.html"; 
  } else if (searchTerm === "kaldereta") {
    window.location.href = "kaldereta_recipe.html"; 
  } else {
    alert("Recipe not found. Try searching for another recipe.");
  }
});