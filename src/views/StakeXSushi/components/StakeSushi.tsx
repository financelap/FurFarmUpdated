import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card3'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import { contractAddresses } from '../../../sushi/lib/constants'
import useEnter from "../../../hooks/useEnter";
import useLeave from "../../../hooks/useLeave";
import useAllowanceStaking from "../../../hooks/useAllowanceStaking";
import useApproveStaking from "../../../hooks/useApproveStaking";
import { CHAIN_ID } from '../../../sushi/lib/constants'

interface StakeProps {
}

const StakeSushi: React.FC<StakeProps> = ({ }) => {
  const tokenName = "SUSHI"
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useAllowanceStaking()
  const { onApprove } = useApproveStaking()

  const tokenBalance = useTokenBalance(contractAddresses.sushi[CHAIN_ID])

  const { onEnter } = useEnter()
  const { onLeave } = useLeave()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onEnter}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>👨🏻‍🍳</CardIcon>
            <Value value={getBalanceNumber(tokenBalance)} />
            <Label text={`SUSHI Tokens Available`} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <button type="button"
                style={{ fontSize: '16px' }}
                className="btn-link"
                disabled={requestedApproval}
                onClick={handleApprove}>Approve SUSHI
              </button>
            ) : (
                <>
                  <button type="button"
                    style={{ fontSize: '16px' }}
                    className="btn-link"
                    disabled={tokenBalance.eq(new BigNumber(0))}
                    onClick={onPresentDeposit}
                  >Convert to xSUSHI
                  </button>
                  <StyledActionSpacer />
                </>
              )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default StakeSushi
