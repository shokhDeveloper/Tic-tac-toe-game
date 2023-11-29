"use strict";
let elBoardInner = document.querySelector(".board_inner__list");
let elTemplate = document.querySelector("template");
let elModal = document.querySelector(".main_modal__overlay");
let gameArray = [...Array(9).keys()].map((item) => "");
let winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let winnintText = "Win";
let errorText = "Error";
let ceilNumber = 9;
let gamePlayer = "X";
let idx = 0;
const handleRenderCeil = (ceilNumber) => {
    let fragment = elTemplate.content;
    elBoardInner.innerHTML = '';
    for (let i = 0; i < ceilNumber; i++) {
        let clone = fragment.cloneNode(true);
        let ceil = clone.querySelector(".ceil");
        ceil.dataset.id = i.toString();
        elBoardInner.appendChild(ceil);
    }
};
const handleClear = () => {
    gameArray = gameArray.map(item => "");
    handleRenderCeil(ceilNumber);
};
const handleModal = (type, playerType) => {
    if (type) {
        elModal.classList.remove("d-none");
        elModal.classList.add("d-flex");
        if (playerType) {
            handleTypingWin(playerType);
        }
        else if (!playerType) {
            handleTypingError();
        }
    }
    else if (!type) {
        elModal.classList.remove("d-flex");
        elModal.classList.add("d-none");
    }
};
function handleTypingWin(playerType) {
    let title = elModal.querySelector(".modal__title");
    title.innerHTML += playerType ? playerType + " " : '';
    if (idx < winnintText.length) {
        idx++;
        title.innerHTML += winnintText.charAt(idx - 1);
        setTimeout(handleTypingWin, 100);
    }
    else {
        setTimeout(() => {
            title.innerHTML = "";
            idx = 0;
            handleModal(false, null);
            handleClear();
        }, 2000);
    }
}
function handleTypingError() {
    let title = elModal.querySelector(".modal__title");
    if (idx < (errorText === null || errorText === void 0 ? void 0 : errorText.length)) {
        idx++;
        title.innerHTML += errorText.charAt(idx - 1);
        setTimeout(handleTypingError, 100);
    }
    else {
        setTimeout(() => {
            idx = 0;
            title.innerHTML = '';
            handleModal(false, null);
            handleClear();
        }, 2000);
    }
}
const handleWinningGame = (player) => {
    return winningCombination.some((combination) => {
        return (gameArray[combination[0]] === player &&
            gameArray[combination[1]] === player &&
            gameArray[combination[2]] === player ? true : false);
    });
};
const handleClick = (event) => {
    let elTarget = event.target;
    if (elTarget.matches(".ceil")) {
        console.log("ishladi", elTarget);
        let id = parseInt(elTarget.dataset.id, 0);
        if (gameArray[id] === "") {
            gameArray[id] = gamePlayer;
            elTarget.innerHTML = gamePlayer;
            if (handleWinningGame(gamePlayer)) {
                handleModal(true, gamePlayer);
            }
            else if (gameArray === null || gameArray === void 0 ? void 0 : gameArray.every((item) => item !== "")) {
                let title = elModal.querySelector(".modal__title");
                title.innerHTML = '';
                handleModal(true, null);
            }
            else {
                gamePlayer = gamePlayer === "X" ? "O" : "X";
            }
        }
    }
    else if (elTarget.matches(".board__reset")) {
        handleClear();
    }
};
window.addEventListener("click", handleClick);
handleRenderCeil(ceilNumber);
