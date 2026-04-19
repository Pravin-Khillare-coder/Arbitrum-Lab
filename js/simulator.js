// 🔐 HASH FUNCTION
async function hash(text) {
    if (!crypto || !crypto.subtle) {
        alert("Run this on Live Server (localhost). Crypto API not supported here.");
        throw new Error("Crypto not supported");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Store Block 1 hash
let block1Hash = "";

// 🧱 BLOCK 1 MINING
async function mineBlock1() {
    console.log("Mining Block 1...");

    let data = document.getElementById("data1").value || "default";
    let nonce = 0;
    let hashVal = "";

    document.getElementById("hash1").innerText = "Mining... ⛏️";

    while (true) {
        hashVal = await hash(data + nonce);

        if (hashVal.startsWith("00")) break;

        nonce++;

        // 🔥 Prevent browser freeze
        if (nonce % 100 === 0) {
            await new Promise(r => setTimeout(r, 0));
        }
    }

    block1Hash = hashVal;

    document.getElementById("nonce1").innerText = nonce;
    document.getElementById("hash1").innerText = hashVal;
    document.getElementById("prevHash").innerText = hashVal;

    console.log("Block 1 mined:", hashVal);
    
}

// 🧱 BLOCK 2 MINING
async function mineBlock2() {
    console.log("Mining Block 2...");

    if (!block1Hash) {
        alert("⚠️ Mine Block 1 first!");
        return;
    }

    let data = document.getElementById("data2").value || "default";
    let nonce = 0;
    let hashVal = "";

    document.getElementById("hash2").innerText = "Mining... ⛏️";

    while (true) {
        hashVal = await hash(data + nonce + block1Hash);

        if (hashVal.startsWith("00")) break;

        nonce++;

        // 🔥 Prevent browser freeze
        if (nonce % 100 === 0) {
            await new Promise(r => setTimeout(r, 0));
        }
    }

    document.getElementById("hash2").innerText = hashVal;

    // ✅ Chain validation
    if (block1Hash === document.getElementById("prevHash").innerText) {
        document.getElementById("status2").innerText = "Valid Chain ✅";
    } else {
        document.getElementById("status2").innerText = "Invalid Chain ❌";
    }

    console.log("Block 2 mined:", hashVal);
    
}
// 🚨 Auto break chain if Block 1 changes
document.getElementById("data1").addEventListener("input", () => {
    document.getElementById("status2").innerText = "Invalid Chain ❌";
    document.getElementById("hash2").innerText = "";
});