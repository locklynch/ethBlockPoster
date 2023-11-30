Turning the old setup into a vite project using react and JS. DONE

Also, want to pivot a bit on the poster overall outcome. That is now, to show what looks a bit like the "screen" of a hacker who's exploring a block/transaction trace, to discover a vulterability or at least make sense of some kind of "event" that's happened in the web3 space.

new list of modules to make for each layer of this idea

BlockData - show the block accessed
DynaimcTextBox - module that can be called to make a box around any component that wraps the component in the smallest sized box of 1px width outline (might not need, might be able to just do in CSS but it seemed like this was hard to do in SVG automatically?)
TransactionData - show a transaction inside the block being accessed
GasFlowChart - a visual of the gas expendetures in the block, isolating relevant gas usage involved in the transaction
ContractData - windows displaying any relevant contracts being activated during the transactions in question
NotesLayer - cute and fun notes to self and graphics the hacker doing this exploration has written to herself to try and make sense of whatever they're looking at.
ChatWindow - a bit of a hint to why she's hacking, and that she's discovered whatever she's looking for (be it a fraudulent transaction, or the trace of a transacton that she's specifically looking for)

FIXES:
1. fixuterBlock isn't formatted correctly, need to get that in the right format so the initial block data shows up correctly before a block is fetched
    1. the rlp method to fetch block in blockData module may be part of the problem. Look into this
