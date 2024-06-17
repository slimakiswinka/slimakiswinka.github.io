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
            case "sys":
                displaySystemInfo();
                break;
            default:
                displayResponse(`${command}: command not found. Use "help" to see all available commands.`);
        }
    }

    function displayHelp(args) {
        if (args.length === 0) {
            displayResponse("Available commands: help, about, ip, clear, calc, time, echo, reverse, random, sys");
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
                case "sys":
                    displayResponse("sys: Displays the user's browser and operating system information.");
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
            // Validate and sanitize the input expression
            if (/^[0-9+\-*/().\s]+$/.test(expression)) {
                // Perform the calculation
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

    function displaySystemInfo() {
        const browser = getBrowserInfo();
        const os = getOSInfo();
        displayResponse(`Browser: ${browser}, OS: ${os}`);
    }

    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browser = "Unknown browser";

        if (userAgent.indexOf("Firefox") > -1) {
            browser = "Mozilla Firefox";
        } else if (userAgent.indexOf("SamsungBrowser") > -1) {
            browser = "Samsung Internet";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browser = "Opera";
        } else if (userAgent.indexOf("Trident") > -1) {
            browser = "Internet Explorer";
        } else if (userAgent.indexOf("Edge") > -1) {
            browser = "Microsoft Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            browser = "Google Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            browser = "Apple Safari";
        }

        return browser;
    }

    function getOSInfo() {
        const userAgent = navigator.userAgent;
        let os = "Unknown OS";

        if (userAgent.indexOf("Win") > -1) {
            os = "Windows";
        } else if (userAgent.indexOf("Mac") > -1) {
            os = "Macintosh";
        } else if (userAgent.indexOf("Linux") > -1) {
            os = "Linux";
        } else if (userAgent.indexOf("Android") > -1) {
            os = "Android";
        } else if (userAgent.indexOf("like Mac") > -1) {
            os = "iOS";
        }

        return os;
    }
});
