#!/user/bin/env node
import inquirer from "inquirer";
;
let users = [
    {
        userID: "nisha",
        userPin: 9987,
    },
    {
        userID: "fatima",
        userPin: 7777,
    },
    {
        userID: "sami",
        userPin: 6565,
    }
];
let balance = Math.floor((Math.random() * 10000));
let answer1;
let answer2;
startLoop();
async function startLoop() {
    await getUserID();
    do {
        await getTranscation();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "restart",
                chioces: [`yes`, `no`],
                message: "you want to continue: ",
            }
        ]);
    } while (again.restart == `Yes`);
}
async function getUserID() {
    answer1 = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "plz your user ID: "
        },
        { type: "number",
            name: "userPin",
            message: "plz your user PIN:"
        },
    ]);
    await checkUserID(answer1.userID, answer1.userPin);
}
async function checkUserID(userID, userPin) {
    let condition = false;
    for (let i = 0; i < userID.length; i++) {
        if (userID === users[i].userID && userPin === users[i].userPin) {
            condition = true;
            break;
        }
    }
    if (!condition) {
        console.log(`invalid user ID or PIN. Try Again.`);
        await getUserID();
    }
}
async function getTranscation() {
    answer2 = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: "please select account type:",
        },
        {
            type: "list",
            name: "transType",
            choices: ["fast cash", "withdraw"],
            message: "please select transaction type",
        },
        {
            type: "list",
            name: "amount",
            choices: [5000, 10000, 15000, 20000, 25000],
            message: `please select your amount(current balance is ${balance}):`,
            when(answer2) {
                return answer2.transType == "Fast Cash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: `please enter your amount(current balance is ${balance}):`,
            when(answer2) {
                return answer2.transType == "withdraw";
            }
        }
    ]);
    if (answer1.userID && answer1.userPin) {
        if (answer2.amount <= balance) {
            balance -= answer2.amount;
            console.log(`your current balance is: ${balance}`);
        }
        else {
            console.log(`insuficient balance ${balance}`);
        }
    }
}
