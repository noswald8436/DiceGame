document.addEventListener('DOMContentLoaded', () => {
    const markersContainer = document.querySelector('.markers');
    const rollDiceButton = document.getElementById('rollDiceButton');
    const diceResult = document.getElementById('diceResult');
    const rollCounterDisplay = document.getElementById('rollCounter');
    const diceSidesSelect = document.getElementById('diceSides');

    // Populate dice sides options from 6 to 20
    for (let i = 6; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}-sided Dice`;
        diceSidesSelect.appendChild(option);
    }

    const markerCount = 10;
    let markers = [];
    let rollCounter = 0;
    let sides = parseInt(diceSidesSelect.value);

    function updateMarkers() {
        // Create an array for possible sums from 2 to sides*2
        markers = Array(sides * 2 - 1).fill(0);

        markersContainer.innerHTML = ''; // Clear existing markers

        for (let i = 0; i < markers.length; i++) {
            const markerElement = document.createElement('div');
            markerElement.classList.add('marker');
            markerElement.textContent = i + 2;
            markerElement.addEventListener('click', () => placeMarker(i));
            markersContainer.appendChild(markerElement);
        }
        displayMarkers();
    }

    diceSidesSelect.addEventListener('change', (event) => {
        sides = parseInt(event.target.value);
        updateMarkers();
    });

    function placeMarker(index) {
        if (markers[index] < markerCount) {
            markers[index]++;
            displayMarkers();
        }
    }

    function rollDice() {
        const dice1 = Math.floor(Math.random() * sides) + 1;
        const dice2 = Math.floor(Math.random() * sides) + 1;
        const sum = dice1 + dice2;

        // Update the roll counter
        rollCounter++;

        // Calculate the total remaining markers for additional context
        const totalMarkers = markers.reduce((total, num) => total + num, 0);

        // Display detailed dice result
        let hitMessage = markers[sum - 2] > 0 ? `Nice! You've hit a number with markers!` : `Try targeting numbers with markers!`;
        diceResult.textContent = `You rolled: ${dice1} + ${dice2} = ${sum}. ${hitMessage}`;

        // Check if the roll result matches a marked number
        if (markers[sum - 2] > 0) {
            markers[sum - 2]--;
            if (!markers.some(m => m > 0)) {
                alert('Congratulations! You have removed all the markers.');
                rollDiceButton.disabled = true;
                return;
            }
        }

        // Display additional context for roll counter
        rollCounterDisplay.textContent = `Total Rolls: ${rollCounter}. Remaining Markers: ${totalMarkers}.`;

        // Update markers display
        displayMarkers();
    }

    function displayMarkers() {
        markersContainer.querySelectorAll('.marker').forEach((markerElement, index) => {
            markerElement.textContent = `${index + 2} (${markers[index]})`;
        });
    }

    rollDiceButton.addEventListener('click', rollDice);

    // Initialize marker display based on initial sides
    updateMarkers();
});
