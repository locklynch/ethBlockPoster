function fetchBlock() {
    // Get the input values
    const apiKey = document.getElementById('apiKey').value;
    const blockNumber = document.getElementById('blockNumber').value;

    // Check if the API key is provided
    if (!apiKey) {
        console.error('Infura API Key is required.');
        return;
    }

    // Connect to a Web3 provider with the provided API key
    const web3 = new Web3(`https://mainnet.infura.io/v3/${apiKey}`);

    // Fetch the block
    web3.eth.getBlock(blockNumber)
        .then(block => {
            // Display the entire block as a JSON string
            const blockInfoDiv = document.getElementById('blockInfo');
            blockInfoDiv.innerHTML = `
                <h2>Block Information (JSON Format):</h2>
                <pre>${JSON.stringify(block, null, 2)}</pre>
            `;
        })
        .catch(error => {
            console.error(error);
            const blockInfoDiv = document.getElementById('blockInfo');
            blockInfoDiv.innerHTML = `<p>Error fetching block information.</p>`;
        });
}
