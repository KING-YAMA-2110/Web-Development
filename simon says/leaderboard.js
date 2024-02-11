// Mock leaderboard data
 leaderboardData = [
    { name: "Rohit", steps: 12000 },
    { name: "Abhijeet", steps: 10500 },
    { name: "Uttpal", steps: 9800 },
    // Add more entries as needed
];

// Function to populate the leaderboard
function populateLeaderboard(data) {
    const leaderboardTable = document.getElementById('leaderboard');

    // Sort data by steps in descending order
    data.sort((a, b) => b.steps - a.steps);

    // Populate the table
    data.forEach((user, index) => {
        const row = leaderboardTable.insertRow(-1); // Append at the end of the table
        const rankCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const stepsCell = row.insertCell(2);

        rankCell.innerHTML = index + 1;
        nameCell.innerHTML = user.name;
        stepsCell.innerHTML = user.steps;
    });
}
populateLeaderboard(leaderboardData);
