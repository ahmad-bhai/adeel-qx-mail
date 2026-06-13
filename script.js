// --- Security Check Start ---
(function() {
    const authorizedDomain = "adeel-qx-mail.vercel.app";
    const currentHost = window.location.hostname;

    // Agar domain match nahi karta toh /error par bhej do
    if (currentHost !== authorizedDomain) {
        window.location.href = window.location.origin + "/error";
    }
})();
// --- Security Check End ---

// Baaki ka code iske neeche aayega
document.querySelector('.btn').addEventListener('click', function() {
    // Aapka download ya html2canvas wala code yahan hoga
    console.log("Download button clicked");
});

// Battery aur Time update karne ka code bhi yahan niche rahega

(function() {
    // =================== 1. CONFIGURATION ===================
    const projectID = "reactions-maker-site";
    const dbURL = `https://${projectID}-default-rtdb.firebaseio.com/users.json`;
    const logoURL = "https://raw.githubusercontent.com/ahmad-bhai/zeetex-web-version/2014a890fd82dfe6c56cca1b581536edeffe47c3/platform_icon_1.svg";
    
    // =================== 2. UID GENERATION ===================
    let myUID = localStorage.getItem('adeel_script_fid');
    if (!myUID) {
        myUID = Array.from({length: 20}, () => Math.floor(Math.random() * 10)).join('');
        localStorage.setItem('adeel_script_fid', myUID);
    }

    // =================== 3. VERIFICATION LOGIC ===================
    fetch(dbURL).then(r => r.json()).then(data => {
        let isUnlocked = false;
        if (data) {
            Object.values(data).forEach(user => {
                if (user.id === myUID) isUnlocked = true;
            });
        }

        if (isUnlocked) {
            // Agar authorized hai to seedha script chalayein
            executeMainScript();
        } else {
            // Agar authorized nahi hai to Lock Screen dikhayein
            showLockUI();
        }
    }).catch(() => {
        alert("Server connection failed!");
    });

    // =================== 4. LOCK UI (WHITE BOX) ===================
    function showLockUI() {
        const overlay = document.createElement('div');
        overlay.id = "ahmad-lock-screen";
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            background: '#0e121a', zIndex: '2147483647', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
        });

        overlay.innerHTML = `
            <div style="background: white; width: 320px; padding: 35px; border-radius: 25px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                <img src="${logoURL}" style="width: 80px; margin-bottom: 15px;">
                <div style="color: #222; font-size: 24px; font-weight: 900; letter-spacing: 1px; margin-bottom: 5px;">LOCKED</div>
                <div style="color: crimson; font-size: 13px; margin-bottom: 20px; font-weight: bold;">Access Denied</div>
                
                <div style="background: #f1f5f9; color: #334155; padding: 15px; border-radius: 12px; font-family: monospace; font-size: 16px; border: 1px dashed crimson; margin-bottom: 25px; word-break: break-all;">
                    ${myUID}
                </div>

                <div style="text-align: left; font-size: 14px; color: #444; line-height: 1.8; border-top: 1px solid #eee; padding-top: 15px;">
                    <b>Whatsapp:</b> <span style="color: #25d366;">+923493959558</span><br>
                    <b>Telegram:</b> <span style="color: #0088cc;">@unitedscript</span><br>
                    
                </div>

                <button onclick="location.reload()" style="margin-top: 25px; width: 100%; background: crimson; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 16px;">RETRY</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // =================== 5. MAIN SCRIPT (AAPKA CODE) ===================
    function executeMainScript() {
        // ----------------- CLEAN START -----------------
        var dia = document.querySelectorAll("dialog");
        if (dia.length) dia.forEach(d => d.remove());

        // ----------------- STYLE -----------------
        var styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.innerHTML = `
        dialog::backdrop {background:#181a20}
        ::selection {background:crimson;color:white}
        `;

        // ----------------- LOADER -----------------
        var loader = document.createElement("dialog");
        document.body.appendChild(loader);
        loader.innerHTML = `<div>PLEASE WAIT...</div>`;
        loader.style = "border:none;outline:none;margin:auto;padding:1rem;background:#fff;";

        function showLoader(){
            loader.showModal();
            setTimeout(hideLoader, 1500);
        }
        function hideLoader(){
            if(loader.open) loader.close();
        }
        showLoader();

        // ----------------- INITIALIZE UI -----------------
        var box = document.querySelector("#box");
        if(box) {
            box.style.display = "block";
            box.contentEditable = true;
        }

        // Time logic
        var time = new Date().toLocaleTimeString("en", { timeStyle: 'short' });
        var recTime = document.querySelector(".receivedTime");
        var mobTime = document.querySelector(".time");
        if(recTime) recTime.innerHTML = time;
        if(mobTime) mobTime.innerHTML = time.replace(/\s|PM|AM/g, "");

        // Screenshot button
        var btn = document.querySelector(".btn");
        btn?.addEventListener("click", () => {
            document.body.contentEditable = false;
            html2canvas(box).then(canvas => {
                let a = document.createElement("a");
                a.href = canvas.toDataURL("img.png");
                a.download = `SS-${Date.now()}.png`;
                a.click();
                document.body.contentEditable = true;
            });
        });

        // Battery logic
        var input = document.querySelector("input");
        var battery = document.querySelector(".battery2");
        if(input && battery) {
            function updateBattery(){
                battery.style.width = (Number(input.value) * 25 / 100) + "px";
            }
            updateBattery();
            input.oninput = updateBattery;
        }

        console.log("Unlocked: Tool Running.");
    }
})();
