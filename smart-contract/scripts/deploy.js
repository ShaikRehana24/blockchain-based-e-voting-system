async function main() {
  const Election = await ethers.getContractFactory("Election");
  const election = await Election.deploy();
  await election.waitForDeployment();

  console.log("Deployed to:", await election.getAddress());
}

main();
