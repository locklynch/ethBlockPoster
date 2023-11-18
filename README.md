Turning the old setup into a vite project using react and JS.

gonna make a few components, one for each element of the page.
1. different cells that contain the elements of shenaigans. each with a label at the top of the cell, and a body made up of stuff
2. input cell
    a. label = Input
    b. contains an infura api key entry element to type the api into (that's displayed like a password display)
    c. contains a block number entry to type the block number
    d. contains an optional transaction hash entry for a transaction hash if the user wants to display the info about a specific transaction
3. settings cell
    a. label = settings
    b. contains options for
        i. color palette selection (premade color palettes for the poster)
        ii. notes cells to be included or not
        iii. fun versus cool selection (can figure this out later, wanna make one that's got cute fun stuff in it)
4. Poster cell, the viewbox that contains the other cells that make up the poster
    a. no label for this one!
5. small eth block cell
    a. label = Eth Block
    b. contains just a block number
    c. use 7 of these in poster display
        i. second from top block = block number input
        ii. top block = block number -1
        iii. bottom 5 are block number++ per block
6. enlarged block cell for selected block
    a. label = block number
    b. contents of block displayed as object with key:value pairs
        i. values limited to only a certain length so as not to overload the poster with too much data (maybe just first element of each array if the value is an array?)
7. transaction cell for selected transaction
    a. label = Transaction
    b. contents of transaction cell displayed as object with key:value pairs.
    c. this only appears if a transaction hash is given
8. note cell, as layer of "comments"
    a. label = block[key]
    b. contents = quick note written about what that aspect of the block is for, like someone had been writing notes about what each part of the block means.
    c. this layer of cells can be turned on or off depending on how they want the poster to look.