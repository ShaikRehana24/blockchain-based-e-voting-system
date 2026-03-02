let isLoggedIn = false;

/* -------------------- LOGIN -------------------- */
async function login() {
  try {
    await connectWallet();

    const user = await signer.getAddress();
    const admin = await contract.admin();

    if (admin.toLowerCase() === user.toLowerCase()) {
      alert("Admin cannot vote");
      return;
    }

    const started = await contract.electionStarted();
    if (!started) {
      alert("Election not started yet");
      return;
    }

    isLoggedIn = true;

    // ---- UI UPDATES ----
    showDashboardUI(user);
    setElectionStatusUI(true);

    const voted = await contract.hasVoted(user);
    setVoteStatusUI(voted);

    loadCandidates();

  } catch (err) {
    console.error(err);
    alert("Wallet connection failed");
  }
}

/* -------------------- LOAD CANDIDATES -------------------- */
async function loadCandidates() {
  if (!isLoggedIn) return;

  showCandidatesLoading();

  try {
    const count = Number(await contract.candidatesCount());
    if (count === 0) {
      hideCandidatesLoading();
      showCandidatesEmpty();
      return;
    }

    const candidates = [];

    for (let i = 1; i <= count; i++) {
      const c = await contract.candidates(i);
      candidates.push({
        id: i,
        name: c.name,
        party: "Independent",
        votes: Number(c.voteCount) // not used in UI
      });
    }

    const user = await signer.getAddress();
    const hasVoted = await contract.hasVoted(user);

    hideCandidatesLoading();
    renderCandidatesUI(candidates, hasVoted);

  } catch (err) {
    console.error(err);
    alert("Failed to load candidates");
  }
}

/* -------------------- VOTE -------------------- */
async function vote(candidateId) {
  if (!isLoggedIn) return;

  try {
    const tx = await contract.vote(candidateId);
    await tx.wait();

    alert("✅ Vote cast successfully");

    setVoteStatusUI(true);
    loadCandidates();

  } catch (err) {
    console.error(err);
    alert("❌ Voting failed (already voted or election ended)");
  }
}

/* ================= UI HELPERS ================= */

function showDashboardUI(walletAddress) {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("dashboard").classList.add("active");
  document.getElementById("walletBox").classList.remove("hidden");
  document.getElementById("wallet").innerText = walletAddress;
}

function setElectionStatusUI(active) {
  const badge = document.getElementById("electionStatusBadge");
  const card = document.getElementById("electionStatusCard");

  if (active) {
    badge.innerText = "Active";
    badge.classList.remove("inactive");
    card.innerText = "Active";
  } else {
    badge.innerText = "Inactive";
    badge.classList.add("inactive");
    card.innerText = "Inactive";
  }
}

function setVoteStatusUI(voted) {
  const el = document.getElementById("voteStatus");
  el.innerText = voted ? "Cast" : "Not Cast";
  el.style.color = voted ? "#22c55e" : "#38bdf8";
}

function showCandidatesLoading() {
  document.getElementById("candidatesLoading").classList.remove("hidden");
  document.getElementById("candidatesEmpty").classList.add("hidden");
  document.getElementById("candidatesGrid").innerHTML = "";
}

function hideCandidatesLoading() {
  document.getElementById("candidatesLoading").classList.add("hidden");
}

function showCandidatesEmpty() {
  document.getElementById("candidatesEmpty").classList.remove("hidden");
}
function renderCandidatesUI(candidates, hasVoted) {
  const grid = document.getElementById("candidatesGrid");
  grid.innerHTML = "";

  if (!candidates || candidates.length === 0) {
    showCandidatesEmpty();
    return;
  }

  candidates.forEach((c) => {
    const card = document.createElement("div");
    card.className = "candidate-card";

    card.innerHTML = `
      <div>
        <div class="candidate-name">${c.name}</div>
        <div class="candidate-party">${c.party}</div>
      </div>

      <div class="candidate-footer">
        <span class="badge">Candidate</span>
        <button class="vote-btn" ${hasVoted ? "disabled" : ""} onclick="vote(${c.id})">
          ${hasVoted ? "Voted" : "Vote"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}