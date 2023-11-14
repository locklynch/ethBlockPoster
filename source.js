let currentBlock; // Variable storing the block

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
            // Set the currentBlock variable
            currentBlock = block;

            // Display the entire block using currentBlock as the source
            const blockInfoDiv = document.getElementById('blockInfo');
            blockInfoDiv.textContent = JSON.stringify(currentBlock, null, 2);

            // Reveal the SVG canvas
            const posterCanvas = document.getElementById('posterCanvas');
            posterCanvas.style.display = 'block';

            // Log the currentBlock after it has been assigned
            console.log(currentBlock);
        })
        .catch(error => {
            console.error(error);
            const blockInfoDiv = document.getElementById('blockInfo');
            blockInfoDiv.textContent = 'Error fetching block information.';
        });
}
