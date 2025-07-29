let provider;
let signer;
let userAddress = "";
const USDD_CONTRACT = "0x3aa52675EC75800900668178435c36F6eccEd4D4";
const RATE = 4 / 0.001;

window.onload = () => {
  document.getElementById("connect").onclick = connectWallet;
  document.getElementById("swap").onclick = sendETH;
};

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    document.getElementById("balance").innerText = "钱包地址：" + userAddress;
  } else {
    alert("请安装 MetaMask");
  }
}

async function sendETH() {
  const ethAmount = document.getElementById("ethAmount").value;
  if (!ethAmount || isNaN(ethAmount)) return alert("请输入有效的 ETH 金额");

  const tx = await signer.sendTransaction({
    to: USDD_CONTRACT,
    value: ethers.utils.parseEther(ethAmount),
  });
  await tx.wait();
  alert("兑换成功！请稍后查看 USDD 余额");
}
