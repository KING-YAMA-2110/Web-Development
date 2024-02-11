document.getElementById('leaderboardForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const name = document.getElementById('name').value.trim();
    const steps = parseInt(document.getElementById('steps').value.trim(), 10);

    // Add a new entry to the leaderboard
    addEntryToLeaderboard(name, steps);

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('steps').value = '';
});

function addEntryToLeaderboard(name, steps) {
    // Create a new object for the entry
    const entry = { name, steps };

    // Assuming you have a global array to store leaderboard entries
    if (typeof window.leaderboardData === 'undefined') {
        window.leaderboardData = []; // Initialize if not already done
    }

    // Add new entry to the array
    window.leaderboardData.push(entry);

    // Sort the array based on steps in descending order
    window.leaderboardData.sort((a, b) => b.steps - a.steps);

    // Update the leaderboard display
    updateLeaderboardDisplay();
}

function updateLeaderboardDisplay() {
    const leaderboardTable = document.getElementById('leaderboard');

    // Clear existing rows except the header
    while (leaderboardTable.rows.length > 1) {
        leaderboardTable.deleteRow(1);
    }

    // Re-populate the leaderboard table with sorted data
    window.leaderboardData.forEach((entry, index) => {
        const row = leaderboardTable.insertRow(-1);
        const rankCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const stepsCell = row.insertCell(2);

        rankCell.textContent = index + 1; // Rank based on array order
        nameCell.textContent = entry.name;
        stepsCell.textContent = entry.steps;
    });
}
