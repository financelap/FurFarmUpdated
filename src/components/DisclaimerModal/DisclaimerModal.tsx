import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '..//Modal'
import ModalActions from '..//ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: 25%;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

const DisclaimerModal: React.FC<DisclaimerModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <div>
          <p> With great pleasure we would like to invite you the launch
              of CatCaptain!
          </p>
          <p> Omakase Bar will be the home of our new frontend, and provides
              an interface for all interactions with the SushiSwap protocol.
          </p>
          <p> Development will be on going, and CatsFinance will still
              exist in the interim as we work to get CatCaptain completely
              polished.
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <StyledLink target="_blank" href="https://cats.finance">
            Click here to access CatCaptain.
          </StyledLink>
        </div>
      )
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <Button
          text="Next"
          variant="secondary"
          onClick={() => setStep('uniswap')}
        />
      )
    } else {
      return <Button text="Continue To Classic" onClick={handleConfirm} />
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Announcement`} />
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{button}</ModalActions>
    </Modal>
  )
}

export default DisclaimerModal
