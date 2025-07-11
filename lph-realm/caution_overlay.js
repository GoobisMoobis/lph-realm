(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const outdatedStyle = document.createElement("style");
    outdatedStyle.id = "outdated-content-style";
    outdatedStyle.innerHTML = `
            .outdated {
                position: relative;
                overflow: hidden;
            }
            .outdated-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10;
                opacity: 1;
                transition: opacity 0.7s ease-out;
            }
            .outdated-x {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 11;
                opacity: 1;
            }
            .outdated-line {
                position: absolute;
                height: 12px;
                background: repeating-linear-gradient(
                    45deg,
                    black,
                    black 15px,
                    yellow 15px,
                    yellow 30px
                );
                transform-origin: center;
                width: 200%;
                transition: transform 0.7s ease-out;
            }
            .outdated-warning {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: black;
                color: white;
                padding: 15px;
                border: 8px solid;
                border-image: repeating-linear-gradient(
                    45deg,
                    black,
                    black 15px,
                    yellow 15px,
                    yellow 30px
                ) 8;
                z-index: 12;
                text-align: center;
                min-width: 200px;
                opacity: 1;
                transition: all 0.7s ease-out;
            }
            .outdated-close {
                position: absolute;
                top: 5px;
                right: 8px;
                color: white;
                cursor: pointer;
                font-size: 16px;
            }
        `;

    const mainStyle = document.createElement("style");
    mainStyle.id = "caution-overlay-style";
    mainStyle.innerHTML = `
                body {
                margin: 0;
                overflow-y: hidden;
            }
            .caution-line {
                position: fixed;
                height: 12px;
                background: repeating-linear-gradient(
                    45deg,
                    black,
                    black 15px,
                    yellow 15px,
                    yellow 30px
                );
                transition: transform 0.7s ease-out;
                z-index: 1000;
            }
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                opacity: 0;
                transition: opacity 0.7s ease-out;
                z-index: 999;
            }
            .popup {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0.7);
                background: rgba(255, 255, 255, 0.85);
                padding: 20px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                opacity: 0;
                transition: transform 0.5s ease-out, opacity 0.5s ease-out;
                z-index: 1001;
            }
            .close-btn {
                position: absolute;
                top: 8px;
                right: 12px;
                font-size: 16px;
                cursor: pointer;
            }
        `;

    document.head.appendChild(outdatedStyle);
    document.head.appendChild(mainStyle);

    function createOutdatedWarning(container) {
      const outdatedOverlay = document.createElement("div");
      outdatedOverlay.className = "outdated-overlay";

      const outdatedX = document.createElement("div");
      outdatedX.className = "outdated-x";

      const line1 = document.createElement("div");
      line1.className = "outdated-line outdated-line-1";
      const line2 = document.createElement("div");
      line2.className = "outdated-line outdated-line-2";

      function updateLines() {
        const rect = container.getBoundingClientRect();
        const diagonalLength =
          Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2;
        const angle = Math.atan2(rect.height, rect.width) * (180 / Math.PI);

        line1.style.width = line2.style.width = diagonalLength + "px";
        line1.style.position = line2.style.position = "absolute";
        line1.style.top = "0";
        line2.style.top = "0";
        line1.style.left = "0";
        line2.style.right = "0";

        line1.style.transformOrigin = "top left";
        line2.style.transformOrigin = "top right";

        line1.style.transform = `rotate(${angle}deg)`;
        line2.style.transform = `rotate(${-angle}deg)`;
      }

      outdatedX.appendChild(line1);
      outdatedX.appendChild(line2);

      const warning = document.createElement("div");
      warning.className = "outdated-warning";
      warning.innerHTML = "This information is outdated!";

      const closeBtn = document.createElement("span");
      closeBtn.className = "outdated-close";
      closeBtn.innerHTML = "×";
      closeBtn.onclick = function () {
        const angle =
          Math.atan2(container.offsetHeight, container.offsetWidth) *
          (180 / Math.PI);

        // Update exit animations to match the full-screen behavior
        line1.style.transform = `rotate(${angle}deg) translate(-100%, -100%)`;
        line2.style.transform = `rotate(${-angle}deg) translate(100%, -100%)`;

        outdatedOverlay.style.opacity = "0";
        warning.style.opacity = "0";
        warning.style.transform = "translate(-50%, -50%) scale(0.7)";

        setTimeout(() => {
          outdatedOverlay.remove();
          outdatedX.remove();
          warning.remove();
        }, 700);
      };

      warning.appendChild(closeBtn);
      container.style.position = "relative";
      container.appendChild(outdatedOverlay);
      container.appendChild(outdatedX);
      container.appendChild(warning);

      updateLines();
      window.addEventListener("resize", updateLines);
    }

    document.querySelectorAll(".outdated").forEach(createOutdatedWarning);

    // Create main overlay elements
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    const line1 = document.createElement("div");
    const line2 = document.createElement("div");
    line1.className = line2.className = "caution-line";
    document.body.appendChild(line1);
    document.body.appendChild(line2);

    function positionLines() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const diagonalLength = Math.sqrt(screenWidth ** 2 + screenHeight ** 2);
      const angle = Math.atan(screenHeight / screenWidth) * (180 / Math.PI);

      line1.style.width = line2.style.width = diagonalLength + "px";
      line1.style.transformOrigin = "top left";
      line2.style.transformOrigin = "top right";

      line1.style.position = line2.style.position = "fixed";
      line1.style.top = line2.style.top = "0px";
      line1.style.left = "0px";
      line2.style.right = "0px";

      line1.style.transform = `rotate(${angle}deg) translate(-100%, 0)`;
      line2.style.transform = `rotate(${-angle}deg) translate(100%, 0)`;
    }

    positionLines();
    window.addEventListener("resize", positionLines);

    // Create and handle main popup
    const popup = document.createElement("div");
    popup.className = "popup";
    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "×";
    closeBtn.onclick = function () {
      line1.style.transform = `rotate(${
        Math.atan(window.innerHeight / window.innerWidth) * (180 / Math.PI)
      }deg) translate(-100%, -100%)`;
      line2.style.transform = `rotate(${
        -Math.atan(window.innerHeight / window.innerWidth) * (180 / Math.PI)
      }deg) translate(100%, -100%)`;
      popup.style.transform = "translate(-50%, 100vh)";
      popup.style.opacity = "0";
      overlay.style.opacity = "0";

      setTimeout(() => {
        line1.remove();
        line2.remove();
        popup.remove();
        overlay.remove();
        document.getElementById("caution-overlay-style")?.remove();
      }, 700);
    };

    const customContent = document.getElementById("custom-popup-content");
    if (customContent) {
      popup.innerHTML = customContent.innerHTML;
    }
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);

    // Initial animations
    setTimeout(() => {
      line1.style.transform = `rotate(${
        Math.atan(window.innerHeight / window.innerWidth) * (180 / Math.PI)
      }deg) translate(0, 0)`;
      line2.style.transform = `rotate(${
        -Math.atan(window.innerHeight / window.innerWidth) * (180 / Math.PI)
      }deg) translate(0, 0)`;
      overlay.style.opacity = "1";
    }, 50);

    setTimeout(() => {
      popup.style.transform = "translate(-50%, -50%) scale(1)";
      popup.style.opacity = "1";
    }, 750);
  });
})();
