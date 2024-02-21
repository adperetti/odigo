document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var phoneNumber = document.getElementById('phone').value;

    // Effectuer la requête AJAX pour récupérer les données CSV
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = xhr.responseText;
                var lines = data.split('\n');
                var found = false;
                for (var i = 0; i < lines.length; i++) {
                    var parts = lines[i].split(',');
                    if (parts[1] === phoneNumber) {
                        document.getElementById('result').innerText = "Nom du client: " + parts[0];
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    document.getElementById('result').innerText = "Aucun client trouvé pour ce numéro de téléphone.";
                }
            } else {
                console.log('Erreur lors de la requête.');
            }
        }
    };
    xhr.open('GET', 'https://github.com/adperetti/odigo/blob/main/BDDTEL.csv', true);
    xhr.send();
});
