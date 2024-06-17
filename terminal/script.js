document.addEventListener("DOMContentLoaded", function() {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const command = terminalInput.value.trim();
            if (command) {
                processCommand(command);
                terminalInput.value = "";
            }
        }
    });

    function processCommand(command) {
        const outputLine = document.createElement("div");
        outputLine.textContent = `$ ${command}`;
        terminalOutput.appendChild(outputLine);

        const [cmd, ...args] = command.split(" ");

        switch (cmd.toLowerCase()) {
            case "help":
                displayHelp(args);
                break;
            case "about":
                displayResponse("This is a weird linux-like terminal.");
                break;
            case "time":
                displayResponse(new Date().toLocaleString());
                break;
            case "ip":
                fetchIPAddress();
                break;
            case "clear":
                clearTerminal();
                break;
            case "calc":
                calculate(args.join(" "));
                break;
            case "echo":
                echo(args.join(" "));
                break;
            case "reverse":
                reverse(args.join(" "));
                break;
            case "random":
                displayResponse(Math.floor(Math.random() * 100) + 1);
                break;
            default:
                displayResponse(`${command}: command not found. Use "help" to see all available commands.`);
        }
    }

    function displayHelp(args) {
        if (args.length === 0) {
            displayResponse("Available commands: help, about, ip, clear, calc, time, echo, reverse, random");
        } else {
            const subcommand = args[0].toLowerCase();
            switch (subcommand) {
                case "help":
                    displayResponse("help: Provides information about available commands or detailed information about a specific command.");
                    break;
                case "about":
                    displayResponse("about: Provides information about the terminal.");
                    break;
                case "ip":
                    displayResponse("ip: Fetches and displays your public IP address.");
                    break;
                case "clear":
                    displayResponse("clear: Clears the terminal screen.");
                    break;
                case "time":
                    displayResponse("time: Displays date and time.");
                    break;
                case "calc":
                    displayResponse("calc [expression]: Evaluates a mathematical expression and displays the result.");
                    break;
                case "echo":
                    displayResponse("echo [text]: Repeats the input text.");
                    break;
                case "reverse":
                    displayResponse("reverse [text]: Reverses the input text.");
                    break;
                case "random":
                    displayResponse("random: Generates a random number between 1 and 100.");
                    break;
                default:
                    displayResponse(`No detailed help available for command: ${subcommand}`);
            }
        }
    }

    function fetchIPAddress() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                displayResponse(`Your public IP address is: ${data.ip}`);
            })
            .catch(error => {
                displayResponse(`Error fetching IP address: ${error}`);
            });
    }

    function displayResponse(message) {
        const response = document.createElement("div");
        response.classList.add("response");
        response.textContent = message;
        terminalOutput.appendChild(response);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function clearTerminal() {
        terminalOutput.innerHTML = "";
    }

    function calculate(expression) {
        try {
            if (/^[0-9+\-*/().\s]+$/.test(expression)) {
                const result = Function('"use strict"; return (' + expression + ')')();
                displayResponse(`Result: ${result}`);
            } else {
                displayResponse(`Invalid calculation: ${expression}`);
            }
        } catch (error) {
            displayResponse(`Error in calculation: ${error.message}`);
        }
    }

    function echo(text) {
        displayResponse(text);
    }

    function reverse(text) {
        displayResponse(text.split("").reverse().join(""));
    }
});
