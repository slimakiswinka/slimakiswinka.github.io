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
        
        const response = document.createElement("div");
        response.classList.add("response");
        switch (command.toLowerCase()) {
            case "help":
                response.textContent = "Available commands: help, about, clear";
                break;
            case "about":
                response.textContent = "This is a wierd linux-like terminal.";
                break;
            case "clear":
                terminalOutput.innerHTML = "";
                return;
            default:
                response.textContent = `${command}: command not found`;
        }
        terminalOutput.appendChild(response);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});
