New direction. Make the infographic poster, then pivot to the narrative one once we have the block data set up all good to go.

Inforgraphic Poster - just display the block as an expanded block from the chain, then popup type windows on top of it displaying some particular notes about each part of the block

The narrative idea - To show what looks a bit like the "screen" of a hacker who's exploring a block/transaction trace, to discover a vulterability or at least make sense of some kind of "event" that's happened in the web3 space.

new list of modules

Inputs - all the controls for the poster, right now it's just API key and Block Number, but eventually add others, like color palette, and add or remove layers of elements
Instructions - a quick readme on how to work it, and what they can do, and some notable blocks to try check out
Poster - Display for the poster.
BlockData - show the block accessed
BlockChain - a depiction of the block chain with the second from the top block being the block number selected by the user (and block above being number-1, and blocks below being number+1, +2, +3, etc...)
BlockUtils - helper function to get the parsed block data to the BlockData module and noteslayer for display (MIGHT REDO THIS METHOD WITH useState TYPE STUFF!)
DragAndDrop - parent component to call other elements of the poster within so they can be moved around the poster, to allow custom formatting by the user
LinesToBlock - the lines connecting the block in the chain to the expanded block data window
LinesToNotes - line that connects the binary in the blockData module to the appropriate Note in the NotesLayer
ResizeAndScrollHelper - helper function to make ya life easier when drawing dynamic lines between stuff

*TransactionData - show a transaction inside the block being accessed
*GasFlowChart - a visual of the gas expendetures in the block, isolating relevant gas usage involved in the transaction
*ContractData - windows displaying any relevant contracts being activated during the transactions in question
*ChatWindow - a bit of a hint to why she's hacking, and that she's discovered whatever she's looking for (be it a fraudulent transaction, or the trace of a transacton that she's specifically looking for)
*NotesLayer - cute and fun notes to self and graphics the hacker doing this exploration has written to herself to try and make sense of whatever they're looking at.
* all these are for the narrative style poster, work on this after we get the info-graphic set up first.

FIXES:

DO THIS NEXT!!!!!
6. Definitely give text the same color as the element they're referencing? or somehow mark the colors in a cool way


0. Fixing BlockData
    1. reconstructing the displayed block in the BlockData module. Now it'll be displaying each element of the block individually, step by step, which should allow us to better point to them with the noteslayer NOOTEE SLLAAYYERR!!

    DO THIS AFTER COLOR STUFF!
    2. got the header stuff working, but gonna check with aaron about the transactions and other stuff. The code is a bit gnarlier in the block.ts definitions of the seralization function


1. Info elements
    2. also, import the blockObject to the noteslayer and pull each property individually to display in the note box
        1. Kinda done, but actually in the process of changing this to a better approach that will allow for the next steps
    3. then, position the noteslayer programmatically so they appear around the correct in the blockdata expanded block HALF DONE!
        1. half done, got them to stagger at least
    5. then!! change staticText asset to reflect the key value pairs as they exist in the blockdata we get
        1. done! but it's got some old eth 1.0 artifacts in there, might wanna take these notes out later
        2. gonna need to update this now that i'm pulling the BlockData apart and showing things nicely

    DO THIS NEXT!!!!!
    6. Definitely give text the same color as the element they're referencing? or somehow mark the colors in a cool way


2. right now I'm getting errors for pre Merge blocks - The way I'm handling the BlockData module may help this!!! Might not need to do any of the following steps now!
    1. handle different ranges of block numbers differently depending on the updates having been done
    2. for instance, pre and post POS Merge (after 15537394 is post POS Merge)
    3. could make conditional statements for ranges and use different apis for each range? after getting the noteslayer stuff done, try use ethers for pre merge stuff?
3. Visual Options
    1. include blockdata in notes boxes or not
    2. include blockchain or not
    3. include notes in noteslayer or not
    4. if block data in notes boxes and noteslayer notes not included, then remove the noteslayer completely
    5. different color palettes.