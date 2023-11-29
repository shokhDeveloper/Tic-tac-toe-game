let elBoardInner = document.querySelector(".board_inner__list") as HTMLUListElement
let elTemplate = document.querySelector("template") as HTMLTemplateElement 
let elModal = document.querySelector(".main_modal__overlay") as HTMLDivElement
let gameArray:(string | number) [] = [...Array(9).keys()].map((item:number) => "")
let winningCombination: number[][] = [ [0,1,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]
let winnintText:string = "Win";
let errorText:string = "Error"; 
let ceilNumber:number = 9
let gamePlayer:string = "X"
let idx:number = 0
const handleRenderCeil = (ceilNumber:number):void => {
    let fragment = elTemplate.content as DocumentFragment
    elBoardInner.innerHTML = ''
    for(let i:number = 0; i<ceilNumber; i++){
        let clone = fragment.cloneNode(true) as DocumentFragment;
        let ceil = clone.querySelector(".ceil") as HTMLLIElement;
        ceil.dataset.id = i.toString()
        elBoardInner.appendChild(ceil)
    }
}
const handleClear = ():void => {
    gameArray = gameArray.map(item => "")
    handleRenderCeil(ceilNumber)
} 
const handleModal = (type:boolean, playerType: string | null):void => {
    if(type){
        elModal.classList.remove("d-none")
        elModal.classList.add("d-flex")
        if(playerType){
            handleTypingWin(playerType)
        }else if(!playerType){
            handleTypingError()
        }
    }else if(!type){
        elModal.classList.remove("d-flex")
        elModal.classList.add("d-none")     
    }
}
function handleTypingWin(playerType:string | null):void{
    let title = elModal.querySelector(".modal__title") as HTMLHeadingElement;
        title.innerHTML += playerType ? playerType + " ": ''
        if(idx < winnintText.length){
            idx ++
            title.innerHTML += winnintText.charAt(idx-1)
            setTimeout(handleTypingWin, 100)
        }else{
            setTimeout(() => {
                title.innerHTML = ""
                idx = 0;
                handleModal(false, null)
                handleClear()
            }, 2000)
        }
    
}
function handleTypingError () :void {
    let title = elModal.querySelector(".modal__title") as HTMLHeadingElement;
    if(idx < errorText?.length){
        idx++
        title.innerHTML += errorText.charAt(idx-1)
        setTimeout(handleTypingError, 100)
    }else{
        setTimeout(() => {
            idx = 0;
            title.innerHTML = ''
            handleModal(false, null)
            handleClear()  
        }, 2000)
    }
}
const handleWinningGame = (player: string): boolean => {
    return winningCombination.some((combination:number[]) => {
        return(
            gameArray[combination[0]] === player && 
            gameArray[combination[1]] === player && 
            gameArray[combination[2]] === player ? true: false 
        )
    })
}
const handleClick = (event:Event):void => {
    let elTarget = (event.target as HTMLDivElement)
    if(elTarget.matches(".ceil")){
        console.log("ishladi", elTarget)
        let id :number= parseInt(elTarget.dataset.id as string, 0)
        if(gameArray[id] === ""){
            gameArray[id] = gamePlayer
            elTarget.innerHTML = gamePlayer
            if(handleWinningGame(gamePlayer)){
                handleModal(true, gamePlayer)
            }else if(gameArray?.every((item:string | number) => item !== "")){
                let title = elModal.querySelector(".modal__title") as HTMLHeadingElement;
                title.innerHTML = ''
                handleModal(true, null)

            }else {
                gamePlayer = gamePlayer === "X" ? "O" : "X"
            }
        }
    }else if(elTarget.matches(".board__reset")){
        handleClear()
    }
}
window.addEventListener("click", handleClick)
handleRenderCeil(ceilNumber)