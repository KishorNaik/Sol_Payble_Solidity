import { expect } from "chai";
import { ethers } from "hardhat";

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("Payable-Example", function () {
  it("#Test1-Contract-Deployment", async function () {
    
    try
    {
      const [owner,add1,add2]=await ethers.getSigners();

      // Contract Deployment
      const Contract= await ethers.getContractFactory("PayableDemo");
      const contract= await Contract.deploy(owner.address,{value:ethers.utils.parseEther("10")});
      await contract.deployed();

      // Assert
      let balance:any=String(await contract.connect(owner).getContractBalance());
      console.log(`Balance : ${balance}`);

      // Test
      expect(balance).to.equal("10000000000000000000");
    }
    catch(ex)
    {
      console.log((<Error>ex).message);
      expect(false).to.equal(true);
    }
  });

  it("#Test2-Deposit", async function () {
    
    try
    {
      const [owner,add1,add2]=await ethers.getSigners();

      // Contract Deployment
      const Contract= await ethers.getContractFactory("PayableDemo");
      const contract= await Contract.deploy(owner.address,{value:ethers.utils.parseEther("10")});
      await contract.deployed();

      // Assert

      await contract.connect(add1).deposit({value:ethers.utils.parseEther("10")});

      let balance:any=String(await contract.connect(owner).getContractBalance());
      console.log(`Balance : ${balance}`);

      // Test
      expect(balance).to.equal("20000000000000000000");
    }
    catch(ex)
    {
      console.log((<Error>ex).message);
      expect(false).to.equal(true);
    }
  });

  it("#Test3-Withdraw-By-Owner", async function () {
    
    try
    {
      const [owner,add1,add2]=await ethers.getSigners();

      // Contract Deployment
      const Contract= await ethers.getContractFactory("PayableDemo");
      const contract= await Contract.deploy(owner.address,{value:ethers.utils.parseEther("10")});
      await contract.deployed();

      // Assert

      await contract.connect(owner).withdrawByOwner(ethers.utils.parseEther("1"));

      let balance:any=String(await contract.connect(owner).getContractBalance());
      console.log(`Contract Balance : ${balance}`);

      let memberBalance=await contract.connect(owner).getBalanceByAddress(owner.address);
      console.log(`Member Balance : ${memberBalance}`);

      // Test
      expect(balance).to.equal("9000000000000000000");
    }
    catch(ex)
    {
      console.log((<Error>ex).message);
      expect(false).to.equal(true);
    }
  });

  it.only("#Test4-Transfer-By-Owner", async function () {
    
    try
    {
      const [owner,add1,add2]=await ethers.getSigners();

      // Contract Deployment
      const Contract= await ethers.getContractFactory("PayableDemo");
      const contract= await Contract.deploy(owner.address,{value:ethers.utils.parseEther("30")});
      await contract.deployed();

      // Assert
      await contract.connect(add1).deposit({value:ethers.utils.parseEther("30")});

      let balance:any=String(await contract.connect(owner).getContractBalance());
      console.log(`Contract Balance : ${balance}`);

      let memberBalance=await contract.connect(add1).getBalanceByAddress(add1.address);
      console.log(`Member Balance : ${memberBalance}`);

      await contract.connect(owner).transferToAddress(add1.address,ethers.utils.parseEther("10"));

      balance=String(await contract.connect(owner).getContractBalance());
      console.log(`Contract Balance : ${balance}`);

      memberBalance=await contract.connect(add1).getBalanceByAddress(add1.address);
      console.log(`Member Balance : ${memberBalance}`);

      // Test
      expect(balance).to.equal("50000000000000000000");
    }
    catch(ex)
    {
      console.log((<Error>ex).message);
      expect(false).to.equal(true);
    }
  });
});