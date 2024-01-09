New direction. Make the infographic poster, then pivot to the narrative one once we have the block data set up all good to go.

Inforgraphic Poster - just display the block as an expanded block from the chain, then popup type windows on top of it displaying some particular notes about each part of the block

The narrative idea - To show what looks a bit like the "screen" of a hacker who's exploring a block/transaction trace, to discover a vulterability or at least make sense of some kind of "event" that's happened in the web3 space.

new list of modules

Poster Modules
BlockChain - a depiction of the block chain with the second from the top block being the block number selected by the user (and block above being number-1, and blocks below being number+1, +2, +3, etc...)
BlockData - show the block accessed in a window
BlockHeader - show the blockHeader accessed in a window
BlockUtils - helper function to get the parsed block data to the BlockData module and noteslayer for display (MIGHT REDO THIS METHOD WITH useState TYPE STUFF!)
DragAndDrop - parent component to call other elements of the poster within so they can be moved around the poster, to allow custom formatting by the user
EthLogo - deconstruction of the ethereum logo svg to be used in poster
GlobalColorPalette - the store of the color palette info to be used across the whole poster
LinesToBlock - the lines connecting the block in the chain to the expanded block data window
LinesToHeader - the lines connecting the BlockData to the BlockHeader
LinesToNotes - line that connects the binary in the BlockHeader module to the appropriate Note in the NotesLayer
NotesLayer - the names and short snippet of the data for each part of the blockheader (and eventually each part of a transaction and withdrawal too maybe)
Poster - Display for the poster.
ResizeAndScrollHelper - helper function to make ya life easier when drawing dynamic lines between stuff
staticText - the info for the NotesLayer for displaying, coloring, and connecting notes to the BlockHeader (and eventually transactions and withdrawals)
TransactionData - a display of a single transaction pulled from the list of transactions
WithdrawalData - a display of a single withdrawal pulled from the list of all withdrawals

UI Modules
Inputs - all the controls for the poster, right now it's just API key and Block Number, but eventually add others, like color palette, and add or remove layers of elements
Instructions - a quick readme on how to work it, and what they can do, and some notable blocks to try check out


Possible other modules
*GasFlowChart - a visual of the gas expendetures in the block, isolating relevant gas usage involved in the transaction
*ContractData - windows displaying any relevant contracts being activated during the transactions in question
*ChatWindow - a bit of a hint to why she's hacking, and that she's discovered whatever she's looking for (be it a fraudulent transaction, or the trace of a transacton that she's specifically looking for)

* all these are for the narrative style poster, work on this after we get the info-graphic set up first.

FIXES:

3. Visual Options
    1. include blockdata in notes boxes or not
    2. include blockchain or not
    3. include notes in noteslayer or not
    4. if block data in notes boxes and noteslayer notes not included, then remove the noteslayer completely
    5. different color palettes.

4. try use the first four bytes of each field as the color of that text!!!!!
5. add the data to the notes layer as well! DONE
    1. toggle for note description or not! ehhh maybe no need (but could do after all the other toggles for including or not including stuff)
    2. nested notes! from block data to block header and transaction, then from those to the more specific elements of those things!
        1. blockheader DONE!
        2. a single transaction from the transactions
        3. a single withdrawal from the withdrawals
    3. bring the lines back!


Things to do!
4. only keep first transaction and withdrawal in transaction and withdrawal windows
5. copy code for window for header for transactions and withdrawal
6. copy slider for including transactions and withdrawal windows
7. copy code for header notes for transaction and withdrawal
9. now get the color palette selection in the inputs section of the controls