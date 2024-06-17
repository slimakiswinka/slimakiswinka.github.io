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
                displayResponse("Available commands: help, about, ip, clear, calc");
                break;
            case "about":
                displayResponse("This is a weird linux-like terminal.");
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
            default:
                displayResponse(`${command}: command not found`);
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
            const result = eval(expression);
            if (!isNaN(result)) {
                displayResponse(`Result: ${result}`);
            } else {
                displayResponse(`Invalid calculation: ${expression}`);
            }
        } catch (error) {
            displayResponse(`Error in calculation: ${error.message}`);
        }
    }
});
