document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('aiWasteForm');
  const results = document.getElementById('results');
  const wasteIndex = document.getElementById('wasteIndex');
  const roiMessage = document.getElementById('roiMessage');
  const actionPlan = document.getElementById('actionPlan');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values
    const teamSize = parseInt(document.getElementById('teamSize').value, 10);
    const aiSpend = parseFloat(document.getElementById('aiSpend').value);
    const crmIntegration = document.getElementById('crmIntegration').value;
    const whatsappIntegration = document.getElementById('whatsappIntegration').value;

    // Calculate waste index
    let waste = 0.45; // 45% base waste for no integration

    // CRM integration reduces waste
    if (crmIntegration === 'basic') waste -= 0.15;
    if (crmIntegration === 'full') waste -= 0.30;

    // WhatsApp integration reduces waste
    if (whatsappIntegration === 'manual') waste -= 0.10;
    if (whatsappIntegration === 'auto') waste -= 0.20;

    // Clamp waste between 0 and 0.7 (minimum 0, max 70%)
    waste = Math.max(0, Math.min(waste, 0.7));

    // Calculate monthly waste and potential ROI
    const monthlyWaste = aiSpend * waste;
    const potentialROI = (aiSpend - monthlyWaste) * 5; // 5x ROI on recovered spend

    // Show results
    wasteIndex.textContent = Math.round(waste * 100);

    if (waste === 0) {
      roiMessage.textContent = `Congratulations! Your AI stack is fully optimized. You're in the top 7% of UAE businesses.`;
    } else if (waste < 0.15) {
      roiMessage.textContent = `You're close to optimal. With a few tweaks, you could join the top 7% and unlock 500%+ ROI.`;
    } else {
      roiMessage.textContent = `You're likely losing $${monthlyWaste.toLocaleString()} per month in wasted AI spend. With better integration, you could unlock up to $${potentialROI.toLocaleString()} in new value.`;
    }

    // Action plan
    let plan = `<h4>30-Day Action Plan:</h4><ol>`;
    if (crmIntegration !== 'full') {
      plan += `<li>Integrate your CRM with your AI tools for seamless data flow.</li>`;
    }
    if (whatsappIntegration !== 'auto') {
      plan += `<li>Automate WhatsApp outreach and follow-ups using AI.</li>`;
    }
    plan += `<li>Centralize all leads and conversations in one dashboard.</li>`;
    plan += `<li>Book a free AI audit to get a personalized roadmap.</li>`;
    plan += `</ol>`;

    actionPlan.innerHTML = plan;

    results.classList.remove('hidden');
    results.scrollIntoView({ behavior: 'smooth' });
  });
});
