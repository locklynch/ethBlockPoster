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

            // Append transactions to the SVG canvas
            appendTransactionsToCanvas(currentBlock.transactions);

            // Log the currentBlock after it has been assigned
            console.log(currentBlock);
        })
        .catch(error => {
            console.error(error);
            const blockInfoDiv = document.getElementById('blockInfo');
            blockInfoDiv.textContent = 'Error fetching block information.';
        });
}

function appendTransactionsToCanvas(transactions) {
    const transText = document.getElementById('transactionsText');

    // Convert the transactions array to a string
    const transString = JSON.stringify(transactions, null, 1);

    // Set the font size and family for calculations
    const fontSize = 10; // in pixels
    const fontFamily = 'Courier, monospace';

    // Calculate the maximum characters per line based on canvas width and font size
    const canvasWidth = 595.32; // adjust as needed
    const maxCharsPerLine = Math.floor(canvasWidth / (fontSize * 0.5)); // 0.6 is an approximate factor for Courier

    // Remove commas, spaces, and square brackets from the string
    const cleanedString = transString.replace(/[, \[\]\n]+/g, '');

    // Insert line breaks every maxCharsPerLine characters
    let formattedString = '';
    for (let i = 0; i < cleanedString.length; i += maxCharsPerLine) {
        formattedString += cleanedString.slice(i, i + maxCharsPerLine) + '\n';
    }

    // Update the text content
    transText.textContent = formattedString;

    console.log(formattedString);
}