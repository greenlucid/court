import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Spin } from "antd";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import MerkleRedeem from "@kleros/pnk-merkle-drop-contracts/deployments/mainnet/MerkleRedeem.json";
import { VIEW_ONLY_ADDRESS } from "../bootstrap/dataloader";
import { ReactComponent as Kleros } from "../assets/images/kleros.svg";
import { ReactComponent as RightArrow } from "../assets/images/right-arrow.svg";
import useChainId from "../hooks/use-chain-id";
import ETHAmount from "./eth-amount";
import TokenSymbol from "./token-symbol";

const chainIdToParams = {
  1: {
    contractAddress: "0xdbc3088Dfebc3cc6A84B0271DaDe2696DB00Af38",
    snapshots: [
      "https://ipfs.kleros.io/ipfs/QmYJGrQBh68kAvqk57FdynEixdu4VY87mHme821rtPS92u/snapshot-1.json",
      "https://ipfs.kleros.io/ipfs/QmUCTdvyAWU8eEV1nwgiF7CwKpL5FnXiDxGD9FedFdrHYU/snapshot-2021-03.json",
      "https://ipfs.kleros.io/ipfs/QmXG2EKcd3tyMwoxhrqmBAu7gsrzgF3jCde75CjQzmg1Am/snapshot-2021-04.json",
      "https://ipfs.kleros.io/ipfs/QmYEpiCACmZttwxFqsG4sSYsCpUeGchEgJGSRQFPuB6Txe/snapshot-2021-05.json",
      "https://ipfs.kleros.io/ipfs/QmQ6Bdih6SR4KjoMeAPwvkfp33pYTQXEAAkSeZxGeHXCpo/snapshot-2021-06.json",
      "https://ipfs.kleros.io/ipfs/QmUvo4mMGCz4dK8dMY1D68RBqEmyg1qpjxauo99FGDkMos/snapshot-2021-07.json",
      "https://ipfs.kleros.io/ipfs/Qmdv94xuQoe5yy88NyBC8sRFLXwx7sqpWJKbGX5xx1cKjM/snapshot-2021-08.json",
      "https://ipfs.kleros.io/ipfs/QmTJNeQ9mSyrKiPDaRxX9ektijkZXofra3wYwzbiej1ppB/snapshot-2021-09.json",
      "https://ipfs.kleros.io/ipfs/QmRPFBHemHrmGFQCvxtwA13VQs2dR9KujZCBYMXrpw6pHd/snapshot-2021-10.json",
      "https://ipfs.kleros.io/ipfs/QmRKxvfmskMboUcGb2jK6HMVDAPC7RtchxMbhaKH7aQFTm/snapshot-2021-11.json",
      "https://ipfs.kleros.io/ipfs/QmVoSJv7TP3KZp71vbbm1ocHrt1RfYarZW8zEn7vR67Bj2/snapshot-2021-12.json",
      "https://ipfs.kleros.io/ipfs/QmRARe8tM5wZwUmViqJFmMTMfm5XNUroLW4w8TPYfkDAR9/snapshot-2022-01.json",
      "https://ipfs.kleros.io/ipfs/QmWY3uExz6kWtAkKq7hZuoZAPa4NYvUyk2FD7u4Xkp22da/snapshot-2022-02.json",
      "https://ipfs.kleros.io/ipfs/Qmaz1f7ets65kCCYi5z2Feot3NLCKqQ8vn7zaLdm4Rbmqy/snapshot-2022-03.json",
      "https://ipfs.kleros.io/ipfs/Qmdcxpb4TDCPPEcgF3eVw7Nz2Ch2LzRNigPPLy9S4W6h2M/snapshot-2022-04.json",
      "https://ipfs.kleros.io/ipfs/Qmc2S1mcMjjHCX5TSrt1xioA9z7hB6seh9BKEfVjD1kwGG/snapshot-2022-05.json",
      "https://ipfs.kleros.io/ipfs/QmenR1R6NMfCPcwN1gyJAj9RbpqUQMAnDHCybpB6s4Tsff/snapshot-2022-06.json",
      "https://ipfs.kleros.io/ipfs/QmUWkVsXgGHsJ26VgphjZwDPzEtdkcPNAo1xogcPHfMCLt/snapshot-2022-07.json",
      "https://ipfs.kleros.io/ipfs/QmUaJ5vxD9zVRqNiU2t7GgUL1vLmWKFHanaCEik9Mkzm3v/snapshot-2022-08.json",
      "https://ipfs.kleros.io/ipfs/QmTDo9Mv2W6mQLqpxwRVpNTHEJzzNProiHQLppu95VVnXa/snapshot-2022-09.json",
      "https://ipfs.kleros.io/ipfs/QmdK6dgxuBCRJ7wTvQBnHrZWJuWGiiFpEDLM6nr38FgYGF/snapshot-2022-10.json",
      "https://ipfs.kleros.io/ipfs/QmbKotXSryjrRMEeeM51ChgBxpq8DFhwViG6rKLsJfu5wq/snapshot-2022-11.json",
      "https://ipfs.kleros.io/ipfs/QmU2XtH8sSC4rGgfpchqnFXKGaXzzj1PTpnUXdfR4NfUYL/snapshot-2022-12.json",
      "https://ipfs.kleros.io/ipfs/QmUrG7TNEjeYcCrvJ1WsCT7SVbBC81R2bJxRUmUVXBK3rx/snapshot-2023-01.json",
      "https://ipfs.kleros.io/ipfs/QmW1BkMv4pRDTjrNkrcp6njLc61HBmD2yD8Jk5nnPn7gmR/snapshot-2023-02.json",
      "https://ipfs.kleros.io/ipfs/QmUfaq5LctG4dZmSEBGnNoDgKqEdyooibYhnivKcp7Xvf2/snapshot-2023-03.json",
      "https://ipfs.kleros.io/ipfs/QmRSkssLsS4A4KMpdKRVW8vS72kXcRbC4aG5i5rGcoi2Gi/snapshot-2023-04.json",
      "https://ipfs.kleros.io/ipfs/QmbBQoSXrmQFj9cUNWbPcoE7B6MKs4sZ5mtt8Vnu3ZMWdE/snapshot-2023-05.json",
      "https://ipfs.kleros.io/ipfs/QmV3gpEkEv4btxAxnPjionT9QxbVo2fKj9fTFnuLjDTQ6N/snapshot-2023-06.json",
      "https://ipfs.kleros.io/ipfs/QmTqXB4i1wd3vvBNknFvixRD7dA36EWxQoBxsEvR3L3bWw/snapshot-2023-07.json",
      "https://ipfs.kleros.io/ipfs/QmfEb61fZ8QV9LX8Y7VU5AcnzCtjxDTFejzMAgAmUajrRH/snapshot-2023-08.json",
      "https://ipfs.kleros.io/ipfs/QmUaApTCER7A3cfJUMvakoP4BWGMHsSjqhChcr1pn5rJKL/snapshot-2023-09.json",
      "https://ipfs.kleros.io/ipfs/QmXSrwywMP5vipMbryJAezUP3zFAPTKAaCRkRLc4NZcRR7/snapshot-2023-10.json",
    ],
    blockExplorerBaseUrl: "https://etherscan.io",
    klerosboard: "https://api.thegraph.com/subgraphs/name/salgozino/klerosboard",
  },
  100: {
    contractAddress: "0xf1A9589880DbF393F32A5b2d5a0054Fa10385074",
    snapshots: [
      "https://ipfs.kleros.io/ipfs/QmRJQn5K3zaKH5TaSb3xEq8WBpJZhEaEKURj2kFssqEkeb/xdai-snapshot-2021-07.json",
      "https://ipfs.kleros.io/ipfs/QmUWvWmW53xZYqQEx1i1w4eCGg7nowpHZ6WY5caJdPDDZK/xdai-snapshot-2021-08.json",
      "https://ipfs.kleros.io/ipfs/QmeqtF2wFoUd5uNDuXwPTwCyaF5ZjgKFLuqSQQQ2uM5qEP/xdai-snapshot-2021-09.json",
      "https://ipfs.kleros.io/ipfs/QmUtVwhcqhX3vm6rtzEKD9K5eCMFR6b7VjotTGKts2Njmm/xdai-snapshot-2021-10.json",
      "https://ipfs.kleros.io/ipfs/QmcotSzkVhxK4AAaEyv4n7hks9oX6z8AjEfCL1QcGH9mB5/xdai-snapshot-2021-11.json",
      "https://ipfs.kleros.io/ipfs/QmSGLSzRNtDJ2Lt59muizuKrcpWs9KS9RdsEiBuDRsx7nR/xdai-snapshot-2021-12.json",
      "https://ipfs.kleros.io/ipfs/QmQ4yZgoUopYbudnz88i7MSXcTY4NDB1P9KuAMUejtawup/xdai-snapshot-2022-01.json",
      "https://ipfs.kleros.io/ipfs/Qmd7EAFoEBDuJkALRsE6pPtqaYjPt543omZQGipupntGWy/xdai-snapshot-2022-02.json",
      "https://ipfs.kleros.io/ipfs/QmUaWM1yjB9CdHohvTdTqaR8wDggLy4q3tDThS7kZV1p1M/xdai-snapshot-2022-03.json",
      "https://ipfs.kleros.io/ipfs/QmThLvjyhgWnK5a26i5ibajGBgnwZwN651TmWLvb9T4uZU/xdai-snapshot-2022-04.json",
      "https://ipfs.kleros.io/ipfs/QmStjhSzMiRUq2T64esc3AdCn5yK6ovArErNrBeJ5GatRU/xdai-snapshot-2022-05.json",
      "https://ipfs.kleros.io/ipfs/QmRtnaynSgVaEPZ9xWAfwmNi4JNnfxqYx8Qvx8V45Cvvmq/xdai-snapshot-2022-06.json",
      "https://ipfs.kleros.io/ipfs/QmaasQi77pSMuLg5gq3Kch7yv5Ek8mkwMeb3oqm6gQne1q/xdai-snapshot-2022-07.json",
      "https://ipfs.kleros.io/ipfs/Qmdy9dXZpRax7zhuPp1cYxz347H5RGcxDAhMSgAQ4Gdiwm/xdai-snapshot-2022-08.json",
      "https://ipfs.kleros.io/ipfs/QmX9ZkppuUfXaGo2u5NnCEvCoriqZp3VkeCYvmQmbnFoPC/xdai-snapshot-2022-09.json",
      "https://ipfs.kleros.io/ipfs/QmZKCAZK3RoFkugFBBJRFA4WQccJByEXuXnSATU6pwCgN1/xdai-snapshot-2022-10.json",
      "https://ipfs.kleros.io/ipfs/QmWS5p6xbqBvJ2GXbM4wDTKzL1hUEvYdzTm6D9syttdVd9/xdai-snapshot-2022-11.json",
      "https://ipfs.kleros.io/ipfs/QmWFMQB8riKYTfBfdz7n8faExwHC6dAZt1fBA5RriCUshv/xdai-snapshot-2022-12.json",
      "https://ipfs.kleros.io/ipfs/QmP2dmqWYLq9TU1ysmynBtn4rKqzKLx4MzeL6nNEkZjBQP/xdai-snapshot-2023-01.json",
      "https://ipfs.kleros.io/ipfs/Qmf1NihFrzywSamyeYLYSCpnY7jG45fWTU2M5rRHLpU8YY/xdai-snapshot-2023-02.json",
      "https://ipfs.kleros.io/ipfs/QmPkZbPygY5MMU6tTG6xG7esePBg1dUBb9rtNu9nSzzekh/xdai-snapshot-2023-03.json",
      "https://ipfs.kleros.io/ipfs/QmNV9qreJH7k7KwqsZUXV69Q9gDqaywenJ1B5EiUuwYa7x/xdai-snapshot-2023-04.json",
      "https://ipfs.kleros.io/ipfs/QmXmGbRFZcuBFuKPjRcuawd55fEYXfsWcM9k2ze48HYzZE/xdai-snapshot-2023-05.json",
      "https://ipfs.kleros.io/ipfs/QmaMvUbMYtyJVJqV6YCafENrjfN9ULybXRmZTZL7UsTcng/xdai-snapshot-2023-06.json",
      "https://ipfs.kleros.io/ipfs/QmNgZFkE1dtgPZbHPbGcaq47wsLffJ89Uwtt5Fgf25V7DY/xdai-snapshot-2023-07.json",
      "https://ipfs.kleros.io/ipfs/QmYCaK3FPJX6S5jkCCLKqNMVDku9vC7RYaSyyC8gPZYvMp/xdai-snapshot-2023-08.json",
      "https://ipfs.kleros.io/ipfs/QmewZj5jxML23gxkwHGJmAhutso83U7js8tRMoYLqcMQJj/xdai-snapshot-2023-09.json",
      "https://ipfs.kleros.io/ipfs/QmZkxygbpHdrpWC39PE8k7wEXgGkC7oJddkkzaiEu5bRMV/xdai-snapshot-2023-10.json",
    ],
    blockExplorerBaseUrl: "https://blockscout.com/poa/xdai/",
    klerosboard: "https://api.thegraph.com/subgraphs/name/salgozino/klerosboard-xdai",
  },
};

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const ClaimModal = ({ visible, onOk, onCancel, displayButton, apyCallback }) => {
  const { drizzle } = useDrizzle();
  const { account } = useDrizzleState((drizzleState) => ({
    account: drizzleState.accounts[0] || VIEW_ONLY_ADDRESS,
  }));
  const chainId = useChainId();

  const [claims, setClaims] = useState(0);
  const [txHash, setTxHash] = useState(null);
  const [claimStatus, setClaimStatus] = useState(0);
  const [modalState, setModalState] = useState(0);
  const [currentClaimValue, setCurrentClaimValue] = useState(0);

  const claimObjects = (claims) => {
    if (claims.length > 0)
      return claims
        .map(
          (claim, index) =>
            claim && {
              week: index,
              balance: claim.value.hex,
              merkleProof: claim.proof,
            }
        )
        .filter((claimObject) => typeof claimObject !== "undefined");
  };

  useEffect(() => {
    var responses = [];
    const airdropParams = chainIdToParams[chainId];

    if (!airdropParams) {
      return;
    }

    const snapshots = airdropParams?.snapshots ?? [];

    for (var month = 0; month < snapshots.length; month++) {
      responses[month] = fetch(snapshots[month]);
    }
    const results = Promise.all(
      responses.map((promise) => promise.then((r) => r.json()).catch((e) => console.error(e)))
    );

    fetch(airdropParams.klerosboard, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
    {
      klerosCounters {
        tokenStaked
      }
    }
        `,
      }),
      method: "POST",
      mode: "cors",
    })
      .then((r) => r.json())
      .then((r) => apyCallback(drizzle.web3.utils.fromWei(r.data.klerosCounters[0].tokenStaked)))
      .catch(() => {
        console.warn("Falling back to last merkle tree for calculating APY");
        results.then((trees) => {
          if (trees.length === 0) {
            console.warn("No snapshot found! Cannot calculate the APY");
            return;
          }

          return apyCallback(drizzle.web3.utils.fromWei(trees.slice(-1)[0].averageTotalStaked.hex));
        });
      });

    setClaims(0);
    results.then((r) =>
      r.forEach(function (item) {
        if (item) {
          apyCallback(item.apy);
          if (item.merkleTree.claims[account]) displayButton();
          setClaims((prevState) => {
            if (prevState) return [...prevState, item.merkleTree.claims[account]];
            else return [item.merkleTree.claims[account]];
          });
        } else
          setClaims((prevState) => {
            if (prevState) return [...prevState, 0];
            else return [0];
          });
      })
    );

    const contract = new drizzle.web3.eth.Contract(MerkleRedeem.abi, airdropParams.contractAddress);
    const claimStatus = contract.methods.claimStatus(account, 0, chainIdToParams[chainId].snapshots.length).call();

    claimStatus.then((r) => setClaimStatus(r));
  }, [account, chainId, drizzle.web3.utils, drizzle.web3.eth.Contract, modalState, apyCallback, displayButton]);

  const handleClaim = () => {
    setModalState(1);

    const tx = claimWeeks(claims);
    tx.on("transactionHash", function (hash) {
      setTxHash(hash);
    });

    tx.then(handleClaimed).catch(() => {
      setModalState(0);
    });
  };

  const handleClaimed = () => {
    setModalState(2);
  };

  const handleCancel = () => {
    setModalState(0);
    onCancel();
  };

  const getTotalClaimable = (claims) => {
    const unclaimedItems = claims
      .filter((claim, index) => Boolean(claimStatus[index]) === false)
      .map((claim) => drizzle.web3.utils.toBN(claim ? claim.value.hex : "0x0"));

    let totalClaimable;

    if (unclaimedItems.length > 0) {
      totalClaimable = unclaimedItems.reduce(function (accumulator, currentValue) {
        return accumulator.add(currentValue);
      });
    } else totalClaimable = "0";
    return totalClaimable;
  };
  const getTotalRewarded = (claims) =>
    claims
      .map((claim) => drizzle.web3.utils.toBN(claim ? claim.value.hex : "0x0"))
      .reduce(function (accumulator, currentValue) {
        return accumulator.add(currentValue);
      });

  const claimWeeks = (claims) => {
    const airdropParams = chainIdToParams[chainId];
    if (!airdropParams) {
      return;
    }

    const contract = new drizzle.web3.eth.Contract(MerkleRedeem.abi, airdropParams.contractAddress);
    const args = claimObjects(claims).filter((_claim) => Boolean(claimStatus[_claim.week]) === false);

    setCurrentClaimValue(
      args
        .map((claim) => drizzle.web3.utils.toBN(claim ? claim.balance : "0x0"))
        .reduce((a, b) => {
          return a.add(b);
        }, drizzle.web3.utils.toBN("0x0"))
    );

    return contract.methods.claimWeeks(account, args).send({ from: account });
  };

  return (
    <Modal
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black",
        padding: "56px",
      }}
      centered
      keyboard
      okText={
        <>
          Claim Your <TokenSymbol token="PNK" /> Tokens
        </>
      }
      onOk={onOk}
      onCancel={handleCancel}
      visible={visible}
      width="800px"
      footer={null}
    >
      {modalState === 1 && <Spin size="large" />}
      {(modalState === 0 || modalState === 2) && <Kleros style={{ maxWidth: "100px", maxHeight: "100px" }} />}
      {modalState >= 1 && (
        <div style={{ fontSize: "24px", marginTop: "24px" }}>{modalState === 1 ? "Claiming" : "🎉 Claimed 🎉"}</div>
      )}
      <div
        style={{
          fontSize: "64px",
          fontWeight: "500",
          color: "#9013FE",
          marginBottom: "24px",
        }}
      >
        {claims.length > 0 &&
          claimStatus.length > 0 &&
          (modalState === 2 ? (
            <ETHAmount amount={currentClaimValue} decimals={0} tokenSymbol="PNK" />
          ) : (
            <ETHAmount amount={getTotalClaimable(claims)} decimals={0} tokenSymbol="PNK" />
          ))}
      </div>
      {modalState === 0 && (
        <>
          <div style={{ fontSize: "24px", fontWeight: "400" }}>
            <span role="img" aria-label="fireworks">
              🎉
            </span>{" "}
            Thanks for being part of the community!{" "}
            <span role="img" aria-label="fireworks">
              🎉
            </span>
          </div>
          <div style={{ fontSize: "24px", fontWeight: "500", marginTop: "8px" }}>
            As a Kleros Juror, you will earn <TokenSymbol token="PNK" /> for staking in Court.
          </div>

          <div
            style={{
              fontSize: "24px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0px 2px 3px  rgba(0, 0, 0, 0.06)",
              borderRadius: "18px",
              padding: "24px 32px",
              width: "100%",
              marginTop: "24px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                Total Rewarded <TokenSymbol token="PNK" />:
              </div>
              <div style={{ fontWeight: "500", textAlign: "right" }}>
                <ETHAmount amount={claims && getTotalRewarded(claims)} decimals={0} tokenSymbol="PNK" />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Unclaimed:</div>
              <div
                style={{
                  color: "#9013FE",
                  fontWeight: "500",
                  textAlign: "right",
                }}
              >
                <ETHAmount amount={claims && getTotalClaimable(claims)} decimals={0} tokenSymbol="PNK" />
              </div>
            </div>
          </div>
        </>
      )}
      {modalState >= 1 && (
        <hr
          style={{
            width: "100%",
            border: "1px solid rgba(0,0,0,0.1",
            marginBottom: "32px",
          }}
        />
      )}
      {modalState === 2 && (
        <div style={{ fontSize: "18px", fontWeight: "400" }}> Thank you for being part of the community! </div>
      )}
      <div style={{ fontSize: "18px", color: "#009AFF" }}>
        {modalState === 0 && (
          <a
            href="https://blog.kleros.io/the-launch-of-the-kleros-juror-incentive-program/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about Justice Farming <RightArrow style={{ marginLeft: "4px", verticalAlign: "middle" }} />
          </a>
        )}

        {modalState === 1 && txHash && (
          <a
            href={`${chainIdToParams[chainId]?.blockExplorerBaseUrl}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Transaction on Etherscan <RightArrow style={{ marginLeft: "4px", verticalAlign: "middle" }} />
          </a>
        )}

        {modalState === 2 && (
          <a
            href="https://blog.kleros.io/the-launch-of-the-kleros-juror-incentive-program/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about the Juror Incentive Program{" "}
            <RightArrow style={{ marginLeft: "4px", verticalAlign: "middle" }} />
          </a>
        )}
      </div>
      {modalState === 0 && claims && (
        <Button
          onClick={handleClaim}
          size="large"
          type="primary"
          style={
            !claims || Number(drizzle.web3.utils.fromWei(getTotalClaimable(claims))).toFixed(0) < 1
              ? {
                  marginTop: "40px",
                  border: "none",
                  color: "#CCC",
                  backgroundColor: "#fafafa",
                }
              : {
                  marginTop: "40px",
                  backgroundColor: "#9013FE",
                  color: "white",
                  border: "none",
                }
          }
          disabled={!claims || Number(drizzle.web3.utils.fromWei(getTotalClaimable(claims))).toFixed(0) < 1}
        >
          <span>
            Claim Your <TokenSymbol token="PNK" /> Tokens
          </span>
        </Button>
      )}
    </Modal>
  );
};

ClaimModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  displayButton: PropTypes.func.isRequired,
  apyCallback: PropTypes.func.isRequired,
};

// StakeModal.propTypes = {
//   ID: PropTypes.string.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

export default ClaimModal;
