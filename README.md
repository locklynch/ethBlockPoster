# ethBlockPoster
A program that displays an ethereum block in an informative but engaging way

steps for thing to do stuff
1. get an eth block from block chain based on eth block number
2. display block
3. make sure to display block in cool way
4. give options for color palette, and possibly for style variations

start with a way to get block off blockchain
1. using infura's api (looks like imma need one no matter what if i'm not gonna run my own node, and def not for this duder)

basic set up
1. html.index page for input and display
    a. input fields for
        i. infura api key
        ii. block number to access

Sweet! looks like it's grabbing a block correctly!

testing with my infura api key, and block 18181818


Requirements:
1. web3 shenanigans
    a. npm install web3
2. infura api
    a. make infura account and get api key


Poster Stuff:
1. using react and svg for making the poster, all vector shenaigans, so it should be easy to blow up and reduce the poster as needed
    a. npm install react-svg
2. using A2 size for poster 4961px x 7016px (420mm x 594mm)
    a. for formatting's sake, i'mma drop the pix down 1/10th (decimal over to the left one digit), then multiply by 1.2, so...
        i. (4961/10)*1.2 = 595.32
        ii. (7016/10)*1.2 = 841.92
    b. can possibly make this changeable later!