Turning the old setup into a vite project using react and JS. DONE

New direction. Make the infographic poster, then pivot to the narrative one once we have the block data set up all good to go.

The narrative idea - To show what looks a bit like the "screen" of a hacker who's exploring a block/transaction trace, to discover a vulterability or at least make sense of some kind of "event" that's happened in the web3 space.

new list of modules

Inputs - all the controls for the poster, right now it's just API key and Block Number, but eventually add others, like color palette, and add or remove layers of elements
Instructions - a quick readme on how to work it, and what they can do, and some notable blocks to try check out
Poster - Display for the poster.
BlockData - show the block accessed
DynaimcTextBox - module that can be called to make a box around any component that wraps the component in the smallest sized box of 1px width outline (might not need, might be able to just do in CSS but it seemed like this was hard to do in SVG automatically?)
BlockChain - a depiction of the block chain with the second from the top block being the block number selected by the user (and block above being number-1, and blocks below being number+1, +2, +3, etc...)
DragAndDrop - parent component to call other elements of the poster within so they can be moved around the poster, to allow custom formatting by the user

*TransactionData - show a transaction inside the block being accessed
*GasFlowChart - a visual of the gas expendetures in the block, isolating relevant gas usage involved in the transaction
*ContractData - windows displaying any relevant contracts being activated during the transactions in question
*ChatWindow - a bit of a hint to why she's hacking, and that she's discovered whatever she's looking for (be it a fraudulent transaction, or the trace of a transacton that she's specifically looking for)
*NotesLayer - cute and fun notes to self and graphics the hacker doing this exploration has written to herself to try and make sense of whatever they're looking at.
* all these are for the narrative style poster, work on this after we get the info-graphic set up first.

FIXES:
1. fixtureBlock isn't formatted correctly, need to get that in the right format so the initial block data shows up correctly before a block is fetched
    1. the rlp method to fetch block in blockData module may be part of the problem. Look into this
    2. maybe just don't use it?
    3. could write some instructions at the app level describing the range of blocks and some fun ones to check out?
2. fit the length of the BlockData display to the length of the text it's displaying
3. Info elements
    1. draw boxes around the notes elements I know how to do this now!!! same set up as the block chain module!
    2. give background same color as poster background, then make 30% opacitiy
    3. maybe give text the same color as the element they're referencing? or somehow mark the colors in a cool way
4. right now I'm getting errors for pre Merge blocks
    1. handle different ranges of block numbers differently depending on the updates having been done
    2. for instance, pre and post POS Merge (after 15537394 is post POS Merge)
5. create a way to download the poster as an svg file!
6. find a way to connect all four corners of the block in the block chain that's being examined, to the four corners of the expanded blockData (render them behind the blockData block!)

Notes:
1. update eth notes for eth.20 block!!!
    1. Eth2.0 block for sure! make sure the info is up to date!
    2. Update the staticText.json file with up to date notes about what each thing is FINISH UPDATING THIS!!!
    3. also, draw a line from each section of the binary to the info window explaining what each element is.
2. narrative versus infographic style set up?
    1. infographic for sure first, then we can play with stuff!
    2. also, do the basic text style windows first! then we can play with graphics after talking to beatrice.
3. the note text boxes can use the same kind of setup as the block chain boxes!!!
    1. make sure to render the text OUTSIDE of the rect element, but call them in the same <></> element so they move together.
    2. also, make the background of the rect like, 30% opacity
4. do the same process to send the blockNumber to the BlockData module so it appears in the title after "Block"

fix the friggin length of the block rect so it's always the right length for the blloooccckkk!!!